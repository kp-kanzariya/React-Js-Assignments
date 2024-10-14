import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ViewUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>User Details</h2>
      <ul className="list-group">
        <li className="list-group-item">First Name: {user.firstname}</li>
        <li className="list-group-item">Last Name: {user.lastname}</li>
        <li className="list-group-item">Email: {user.email}</li>
      </ul>
    </div>
  );
};

export default ViewUser;
