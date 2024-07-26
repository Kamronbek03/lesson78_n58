import React, { useState, useContext } from "react";
import axios from "axios";
import AppContext from "../AppContext";
import { Form } from "react-bootstrap";

const Filter = () => {
  const { dispatch } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterStudents(query, selectedGroup);
  };

  const handleGroupChange = (e) => {
    const group = e.target.value;
    setSelectedGroup(group);
    filterStudents(searchQuery, group);
  };

  const filterStudents = (query, group) => {
    axios
      .get("http://localhost:3000/students")
      .then((response) => {
        let filteredStudents = response.data;

        if (query) {
          filteredStudents = filteredStudents.filter((student) =>
            (student.firstName + " " + student.lastName)
              .toLowerCase()
              .includes(query.toLowerCase())
          );
        }

        if (group) {
          filteredStudents = filteredStudents.filter(
            (student) => student.group === group
          );
        }

        dispatch({ type: "FETCH_SUCCESS", payload: filteredStudents });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_ERROR", payload: error });
      });
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Search by First Name or Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter search term"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Filter by Group</Form.Label>
        <Form.Select onChange={handleGroupChange} value={selectedGroup}>
          <option value="">All</option>
          <option value="React-11">React-11</option>
          <option value="React-13">React-13</option>
          <option value="React-17">React-17</option>
          <option value="React-58">React-58</option>
        </Form.Select>
      </Form.Group>
    </Form>
  );
};

export default Filter;
