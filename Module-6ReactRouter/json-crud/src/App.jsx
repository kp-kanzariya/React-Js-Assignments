import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './Users';
import AddUser from './AddUser';
import EditUser from './EditUsers';
import ViewUser from './ViewUsers';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
        <Route path="/view/:id" element={<ViewUser />} />
      </Routes>
    </Router>
  );
};

export default App;
