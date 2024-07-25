import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth"; // Ensure the path is correct

Modal.setAppElement("#root");

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
`;

const Card = styled.div`
  background: lightgrey;
  border-radius: 5px;
  border: 2px solid #323232;
  box-shadow: 4px 4px #323232;
  padding: 20px;
  width: 300px;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 900;
  color: #323232;
  margin-bottom: 20px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 2px solid #323232;
  padding: 5px 10px;
  font-size: 15px;
  outline: none;
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 2px solid #323232;
  background-color: #fff;
  box-shadow: 4px 4px #323232;
  font-size: 17px;
  font-weight: 600;
  color: #323232;
  cursor: pointer;
`;

const Log_In = ({ show, onHide }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Use login from AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3000/students?firstName=${firstName}&lastName=${lastName}`
      );

      const matchedStudent = response.data.find(
        (student) =>
          student.firstName === firstName && student.lastName === lastName
      );

      if (matchedStudent) {
        login(matchedStudent); // Set user in context
        navigate("/Profile");
        onHide(); // Close the modal
      } else {
        alert("Student not found");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={onHide}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "300px",
        },
      }}
    >
      <Wrapper>
        <Card>
          <Title>Log In</Title>
          <form onSubmit={handleLogin}>
            <Input
              type="text"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Card>
      </Wrapper>
    </Modal>
  );
};

export default Log_In;
