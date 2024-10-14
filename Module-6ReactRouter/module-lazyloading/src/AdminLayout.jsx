import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div>
      <nav>
        <Link to="/admin/dash">Dashboard || </Link>
        <Link to="/admin/settings">Settings</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

export default AdminLayout;