import React from 'react';
import { Box, List, ListItem, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tasks from './Tasks';

function TaskList({ x, obID, newObj }) {
  return (
    <Box sx={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <List>
        {x.map((item) => (
          <ListItem style={{width:'56vw'}}
            key={item.id}
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" onClick={() => newObj(item)}>
                  {/* <EditIcon /> */}
                </IconButton>
                <IconButton edge="end" aria-label="delete" style={{color:"red"}} onClick={() => obID(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <Tasks obj={item} newObj={newObj} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default TaskList;
