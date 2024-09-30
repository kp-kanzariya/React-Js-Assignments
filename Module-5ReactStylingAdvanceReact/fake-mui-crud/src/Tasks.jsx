import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

function Tasks({ obj, newObj }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedFruit, setUpdatedFruit] = useState(obj.fruit);

  const handleSave = () => {
    newObj({ ...obj, fruit: updatedFruit });
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <>
          <TextField
            value={updatedFruit}
            onChange={(e) => setUpdatedFruit(e.target.value)}
            size="small"
            variant="outlined"
          />
          <Button onClick={handleSave} variant="contained" size="small" sx={{ ml: 1 }}>
            Save
          </Button>
        </>
      ) : (
        <Typography variant="body1">{obj.fruit}</Typography>
      )}
      <Button onClick={() => setIsEditing(!isEditing)} size="small">
        {isEditing ? "Cancel" : "Edit"}
      </Button>
    </>
  );
}

export default Tasks;
