import React, { useState } from "react";
import TaskList from "./TaskList";
import AddItem from "./AddItem";
import { Box, Button, AppBar, Toolbar, IconButton, InputBase } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

let index = 4;
const dummyData = [
  { id: 1, fruit: "React JS" },
  { id: 2, fruit: "Node JS" },
  { id: 3, fruit: "Angular" },
  { id: 4, fruit: "Vue JS" },
];

function MainApp() {
  const [todo, setTodo] = useState(dummyData);
  const [searchQuery, setSearchQuery] = useState("");  // Add search query state

  const handleDelete = (id) => {
    setTodo(todo.filter((item) => item.id !== id));
  };

  const handleEdit = (updatedItem) => {
    setTodo(todo.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
  };

  const handleAdd = (newItem) => {
    setTodo([...todo, { id: index++, fruit: newItem }]);
  };

  // Filter items based on search query
  const filteredTodo = todo.filter((item) =>
    item.fruit.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          
          <InputBase
            sx={{ ml: 1, flex: 1, backgroundColor: "white", padding: "2px 10px", borderRadius: "5px" }}
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}  // Update search query on input change
          />
        </Toolbar>
      </AppBar>

      <AddItem f={handleAdd} />
      <TaskList x={filteredTodo} obID={handleDelete} newObj={handleEdit} />  {/* Pass filtered items */}
    </Box>
  );
}

export default MainApp;
