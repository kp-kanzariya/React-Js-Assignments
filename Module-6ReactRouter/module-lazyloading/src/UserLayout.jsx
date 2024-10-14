import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div>
      <nav>
        <Link to="/user/dash">Dashboard ||
        </Link>
        <Link to="/user/profile"> Profile</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

export default UserLayout;