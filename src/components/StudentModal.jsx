import React from "react";
import Modal from "react-modal";
import { Form } from "react-bootstrap";
import styled from "styled-components";

Modal.setAppElement("#root");

const Button = styled.button`
  font-family: monospace;
  background-color: ${(props) => props.bgColor || "#f3f7fe"};
  color: ${(props) => props.color || "#3b82f6"};
  border: none;
  border-radius: 8px;
  width: 100px;
  height: 45px;
  transition: 0.3s;

  &:hover {
    background-color: ${(props) => props.hoverBgColor || "#3b82f6"};
    box-shadow: 0 0 0 5px ${(props) => props.hoverShadow || "#3b83f65f"};
    color: #fff;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const StudentModal = ({ show, onHide, form, onChange, onSubmit, selected }) => (
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
        width: "400px",
      },
    }}
  >
    <h2>{selected === null ? "Adding student" : "Editing student"}</h2>{" "}
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>First name</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={onChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please fill this field!
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Last name</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={onChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please fill this field!
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Group</Form.Label>
        <Form.Select
          name="group"
          value={form.group}
          onChange={onChange}
          required
        >
          <option value="React-11">React-11</option>
          <option value="React-13">React-13</option>
          <option value="React-17">React-17</option>
          <option value="React-58">React-58</option>
        </Form.Select>
      </Form.Group>
      <ButtonsContainer>
        <Button
          bgColor="#f3f7fe"
          color="#3b82f6"
          hoverBgColor="#23c817"
          hoverShadow="#7edf685f"
          type="submit"
        >
          Save
        </Button>
        <Button
          bgColor="#f3f7fe"
          color="#3b82f6"
          hoverBgColor="#cd4632"
          hoverShadow="#eb85855f"
          onClick={onHide}
        >
          Cancel
        </Button>
      </ButtonsContainer>
    </Form>
  </Modal>
);

export default StudentModal;
