import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };

  return (
    <div className="container my-2">
      {/* <h2>User List</h2> */}
      <Link to="/add" className="btn btn-primary mb-3">Add User</Link>
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/view/${user.id}`} className="btn btn-info">View</Link>{' '}
                <Link to={`/edit/${user.id}`} className="btn btn-warning">Edit</Link>{' '}
                <button onClick={() => handleDelete(user.id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
