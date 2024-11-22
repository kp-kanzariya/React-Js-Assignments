import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Container, Typography } from "@mui/material";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const addUser = async () => {
    await axios.post("http://localhost:3003/users", { name, email });
    navigate("/");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add User
      </Typography>
      <TextField
        fullWidth
        label="Name"
        variant="outlined"
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={addUser}
        style={{ marginTop: "1rem" }}
      >
        Add User
      </Button>
    </Container>
  );
};

export default AddUser;
