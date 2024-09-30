import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

function AddItem({ f }) {
  const [fruitName, setFruitName] = useState("");

  return (
    <Box sx={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <TextField
        style={{width:'50vw'}}
        label="Add New Item"
        value={fruitName}
        onChange={(e) => setFruitName(e.target.value)}
        variant="outlined"
        size="small"
      />
      <Button
        onClick={() => {
          f(fruitName);
          setFruitName("");
        }}
        variant="contained"
        color="primary"
        sx={{ marginLeft: "10px" }}
      >
        Add
      </Button>
    </Box>
  );
}

export default AddItem;
