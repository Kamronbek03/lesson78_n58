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

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const StudentModal = ({ show, onHide, form, onChange, onSubmit, selected }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: form,
  });

  return (
    <Modal open={show} onClose={onHide}>
      <Box sx={modalStyle}>
        <Typography variant="h5" component="h2" mb={2} textAlign="center">
          {selected === null ? "Adding student" : "Editing student"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="First Name"
            {...register("firstName", { required: "First name is required" })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            margin="normal"
            value={form.firstName}
            onChange={(e) => onChange(e)}
          />
          <TextField
            fullWidth
            label="Last Name"
            {...register("lastName", { required: "Last name is required" })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            margin="normal"
            value={form.lastName}
            onChange={(e) => onChange(e)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Group</InputLabel>
            <Select
              {...register("group", { required: "Group is required" })}
              defaultValue={form.group}
              value={form.group}
              onChange={(e) => {
                onChange(e);
                setValue("group", e.target.value);
              }}
            >
              <MenuItem value="React-11">React-11</MenuItem>
              <MenuItem value="React-13">React-13</MenuItem>
              <MenuItem value="React-17">React-17</MenuItem>
              <MenuItem value="React-58">React-58</MenuItem>
            </Select>
          </FormControl>
          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={onHide}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default StudentModal;
