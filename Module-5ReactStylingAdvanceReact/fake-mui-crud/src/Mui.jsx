import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const blogs = [
  { id: 1, name: "React JS", description: "This is simple UI Library" },
  { id: 2, name: "Node JS", description: "It is backend JS Framework" },
  { id: 3, name: "Angular", description: "This is Frontend JS Framework" },
  { id: 4, name: "Vue JS", description: "Another Framework for JS" },
];

const AppMui = () => {
  return (
    <div>
      {/* AppBar Section */}
      <AppBar position="static" style={{ backgroundColor: "#007bff" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            React CRUD & Material UI
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            style={{ backgroundColor: "white", borderRadius: "4px" }}
          />
        </Toolbar>
      </AppBar>

      {/* Add Blog Button */}
      <div style={{ margin: "20px" }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />}>
          ADD BLOG
        </Button>
      </div>

      {/* Blog Table */}
      <TableContainer
        component={Paper}
        style={{ width: "90%", margin: "0 auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Blog Name</strong>
              </TableCell>
              <TableCell>
                <strong>Description</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Edit</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Delete</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>{blog.name}</TableCell>
                <TableCell>{blog.description}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AppMui;
