import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(() => navigate('/'));

  };

  return (
    <div className="container">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit} className='form-container'>
        <div className="mb-3">
          <label>First Name</label>
          <input type="text" name="firstname" className="form-control" value={formData.firstname} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input type="text" name="lastname" className="form-control" value={formData.lastname} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
