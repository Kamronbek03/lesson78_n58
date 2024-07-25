import React from "react";
import styled from "styled-components";
import { Table } from "react-bootstrap";

const StyledTable = styled(Table)`
  th,
  td {
    text-align: left;
  }

  th.text-end,
  td.text-end {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
  }
`;

const EditButton = styled.button`
  width: 55px;
  height: 55px;
  border-radius: 20px;
  border: none;
  background-color: rgb(93, 93, 116);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.123);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;

  &::before {
    content: "";
    width: 200%;
    height: 200%;
    background-color: rgb(102, 102, 141);
    position: absolute;
    z-index: 1;
    transform: scale(0);
    transition: all 0.3s;
    border-radius: 50%;
    filter: blur(10px);
  }

  &:hover::before {
    transform: scale(1);
  }

  &:hover {
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.336);
  }

  svg {
    height: 17px;
    fill: white;
    z-index: 3;
    transition: all 0.2s;
    transform-origin: bottom;
  }

  &:hover svg {
    transform: rotate(-15deg) translateX(5px);
  }

  &::after {
    content: "";
    width: 25px;
    height: 1.5px;
    position: absolute;
    bottom: 19px;
    left: -5px;
    background-color: white;
    border-radius: 2px;
    z-index: 2;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease-out;
  }

  &:hover::after {
    transform: scaleX(1);
    left: 0px;
    transform-origin: right;
  }
`;

const BinButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 55px;
  border-radius: 15px;
  background-color: rgb(255, 95, 95);
  cursor: pointer;
  border: 3px solid rgb(255, 201, 201);
  transition-duration: 0.3s;

  .bin-bottom {
    width: 15px;
  }

  .bin-top {
    width: 17px;
    transform-origin: right;
    transition-duration: 0.3s;
  }

  &:hover .bin-top {
    transform: rotate(45deg);
  }

  &:hover {
    background-color: rgb(255, 0, 0);
  }

  &:active {
    transform: scale(0.9);
  }
`;

const StudentTable = ({ students, onEdit, onDelete }) => (
  <StyledTable striped hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Group</th>
        <th className="text-end">Action</th>
      </tr>
    </thead>
    <tbody>
      {students.map((student, index) => (
        <tr key={student.id}>
          <td>{index + 1}</td>
          <td>{student.firstName}</td>
          <td>{student.lastName}</td>
          <td>{student.group}</td>
          <td className="text-end">
            <EditButton onClick={() => onEdit(student)}>
              <svg height="1em" viewBox="0 0 512 512">
                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
              </svg>
            </EditButton>
            <BinButton onClick={() => onDelete(student.id)}>
              <svg
                className="bin-top"
                viewBox="0 0 39 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  y1="5"
                  x2="39"
                  y2="5"
                  stroke="white"
                  strokeWidth="4"
                ></line>
                <line
                  x1="12"
                  y1="1.5"
                  x2="26.0357"
                  y2="1.5"
                  stroke="white"
                  strokeWidth="3"
                ></line>
              </svg>
              <svg
                className="bin-bottom"
                viewBox="0 0 33 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask id="path-1-inside-1_8_19" fill="white">
                  <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                </mask>
                <path
                  d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                  fill="white"
                  mask="url(#path-1-inside-1_8_19)"
                ></path>
                <path d="M12 6L12 29" stroke="white" strokeWidth="4"></path>
                <path d="M21 6V29" stroke="white" strokeWidth="4"></path>
              </svg>
            </BinButton>
          </td>
        </tr>
      ))}
    </tbody>
  </StyledTable>
);

export default StudentTable;
