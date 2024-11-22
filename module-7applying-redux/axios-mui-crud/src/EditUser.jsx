import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField, Container, Typography } from "@mui/material";

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`http://localhost:3003/users/${id}`);
      setName(response.data.name);
      setEmail(response.data.email);
    };
    fetchUser();
  }, [id]);

  const updateUser = async () => {
    await axios.put(`http://localhost:3003/users/${id}`, { name, email });
    navigate("/");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit User
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
        onClick={updateUser}
        style={{ marginTop: "1rem" }}
      >
        Update User
      </Button>
    </Container>
  );
};

export default EditUser;
