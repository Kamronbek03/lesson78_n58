import React from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, Typography, Box, Modal } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const Log_In = ({ show, onHide }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (data) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/students?firstName=${data.firstName}&lastName=${data.lastName}`
      );

      const matchedStudent = response.data.find(
        (student) =>
          student.firstName === data.firstName &&
          student.lastName === data.lastName
      );

      if (matchedStudent) {
        login(matchedStudent);
        navigate("/Profile");
        onHide();
      } else {
        alert("Student not found");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return (
    <Modal open={show} onClose={onHide}>
      <Box sx={modalStyle}>
        <Typography variant="h5" component="h2" mb={2} textAlign="center">
          Log In
        </Typography>
        <form onSubmit={handleSubmit(handleLogin)}>
          <TextField
            fullWidth
            label="First Name"
            {...register("firstName", { required: "First name is required" })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Last Name"
            {...register("lastName", { required: "Last name is required" })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            margin="normal"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default Log_In;
