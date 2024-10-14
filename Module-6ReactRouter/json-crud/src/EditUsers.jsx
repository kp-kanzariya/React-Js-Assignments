import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data));
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(() => navigate('/'));

  };

  return (
    <div className="container">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;
