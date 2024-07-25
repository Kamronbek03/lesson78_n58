import React, { useReducer, useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import AppContext from "../AppContext";
import StudentModal from "../components/StudentModal";
import StudentTable from "../components/StudentTable";
import Filter from "../components/Filter";
import styled from "styled-components";

const Button = styled.button`
  font-family: monospace;
  background-color: #f3f7fe;
  color: #3b82f6;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  transition: 0.3s;

  &:hover {
    background-color: #3b82f6;
    box-shadow: 0 0 0 5px #3b83f65f;
    color: #fff;
  }
`;

const initialState = {
  students: [],
  filteredStudents: [],
  loading: true,
  error: null,
};

const actionTypes = {
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",
  ADD_STUDENT: "ADD_STUDENT",
  DELETE_STUDENT: "DELETE_STUDENT",
  UPDATE_STUDENT: "UPDATE_STUDENT",
  SET_FILTERED_STUDENTS: "SET_FILTERED_STUDENTS",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SUCCESS:
      return {
        ...state,
        students: action.payload,
        filteredStudents: action.payload,
        loading: false,
      };
    case actionTypes.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.ADD_STUDENT:
      return {
        ...state,
        students: [...state.students, action.payload],
        filteredStudents: [...state.filteredStudents, action.payload],
      };
    case actionTypes.DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter(
          (student) => student.id !== action.payload
        ),
        filteredStudents: state.filteredStudents.filter(
          (student) => student.id !== action.payload
        ),
      };
    case actionTypes.UPDATE_STUDENT:
      return {
        ...state,
        students: state.students.map((student) =>
          student.id === action.payload.id ? action.payload : student
        ),
        filteredStudents: state.filteredStudents.map((student) =>
          student.id === action.payload.id ? action.payload : student
        ),
      };
    case actionTypes.SET_FILTERED_STUDENTS:
      return {
        ...state,
        filteredStudents: action.payload,
      };
    default:
      return state;
  }
};

const StudentsTable = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    group: "React-11",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/students")
      .then((response) => {
        dispatch({ type: actionTypes.FETCH_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.FETCH_ERROR, payload: error });
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selected === null) {
      axios
        .post("http://localhost:3000/students", form)
        .then((response) => {
          dispatch({ type: actionTypes.ADD_STUDENT, payload: response.data });
        })
        .catch((error) => {
          console.error("Error adding student:", error);
        });
    } else {
      axios
        .put(`http://localhost:3000/students/${selected}`, form)
        .then((response) => {
          dispatch({
            type: actionTypes.UPDATE_STUDENT,
            payload: response.data,
          });
        })
        .catch((error) => {
          console.error("Error updating student:", error);
        });
    }

    setForm({
      firstName: "",
      lastName: "",
      group: "React-11",
    });
    setSelected(null);
    setShowModal(false);
  };

  const handleEdit = (student) => {
    setForm(student);
    setSelected(student.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you really want to delete this student?")) {
      axios
        .delete(`http://localhost:3000/students/${id}`)
        .then(() => {
          dispatch({ type: actionTypes.DELETE_STUDENT, payload: id });
        })
        .catch((error) => {
          console.error("Error deleting student:", error);
        });
    }
  };

  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = state.students.filter(
      (student) =>
        student.firstName.toLowerCase().includes(lowercasedQuery) ||
        student.lastName.toLowerCase().includes(lowercasedQuery)
    );
    dispatch({ type: actionTypes.SET_FILTERED_STUDENTS, payload: filtered });
  };

  if (state.loading) {
    return <Spinner animation="border" />;
  }

  if (state.error) {
    return <div>Error: {state.error.message}</div>;
  }

  return (
    <AppContext.Provider value={{ state, dispatch, handleEdit, handleDelete }}>
      <Container className="mt-5">
        <Row className="mb-3">
          <Col>
            <h1>Student Management</h1>
            <Button className="button" onClick={() => setShowModal(true)}>
              Add Contact
            </Button>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Filter onSearch={handleSearch} />
          </Col>
        </Row>
        <Row>
          <Col>
            <StudentTable
              students={state.filteredStudents}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Col>
        </Row>
        <StudentModal
          show={showModal}
          onHide={() => setShowModal(false)}
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          selected={selected}
        />
      </Container>
    </AppContext.Provider>
  );
};

export default StudentsTable;
