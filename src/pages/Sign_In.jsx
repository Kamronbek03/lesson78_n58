import React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  TextField,
  Typography,
  Box,
  Modal,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
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

const Sign_In = ({ show, onHide }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const { signin } = useAuth();

  const handleSignIn = async (data) => {
    try {
      const response = await axios.get("http://localhost:3000/students");
      const students = response.data;
      const newId = students.length ? students.length + 1 : 1;

      const createResponse = await axios.post(
        "http://localhost:3000/students",
        {
          id: newId,
          firstName: data.firstName,
          lastName: data.lastName,
          group: data.group,
        }
      );

      if (createResponse.status === 201) {
        signin(createResponse.data);
        navigate("/Profile");
        onHide();
      } else {
        alert("Error signing up");
      }
    } catch (error) {
      console.error("Error adding data", error);
    }
  };

  return (
    <Modal open={show} onClose={onHide}>
      <Box sx={modalStyle}>
        <Typography variant="h5" component="h2" mb={2} textAlign="center">
          Sign In
        </Typography>
        <form onSubmit={handleSubmit(handleSignIn)}>
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
          <FormControl fullWidth margin="normal">
            <InputLabel>Group</InputLabel>
            <Select
              {...register("group", { required: "Group is required" })}
              defaultValue="React-11"
              onChange={(e) => setValue("group", e.target.value)}
            >
              <MenuItem value="React-11">React-11</MenuItem>
              <MenuItem value="React-13">React-13</MenuItem>
              <MenuItem value="React-17">React-17</MenuItem>
              <MenuItem value="React-58">React-58</MenuItem>
            </Select>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Confirm!
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default Sign_In;
