import React from "react";
import { Table } from "@mui/material";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const StudentTable = ({ students, onEdit, onDelete }) => (
  <Table>
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
            <IconButton onClick={() => onEdit(student)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(student.id)}>
              <DeleteIcon />
            </IconButton>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default StudentTable;
