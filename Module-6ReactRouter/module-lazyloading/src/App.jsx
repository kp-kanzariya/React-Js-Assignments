import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Lazy loading modules
const AdminLayout = lazy(() => import('./AdminLayout'));
const UserLayout = lazy(() => import('./UserLayout'));
const AdminDashboard = lazy(() => import('./AdminDash'));
const AdminSettings = lazy(() => import('./Adminsetting'));
const UserDashboard = lazy(() => import('./UserDash'));
const UserProfile = lazy(() => import('./Userprofile'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path='dash' element={<AdminDashboard />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          <Route path="/user" element={<UserLayout />}>
            <Route path='dash' element={<UserDashboard />} />
            {/* <Route index element={<UserDashboard />} /> */}
            <Route path="profile" element={<UserProfile />} />
          </Route>

          <Route path="*" element={<div>404 Not Found,... Open ADMIN layout with  <Link to={'/admin'}>/admin</Link> Open User Layout with <Link to={'/user'}>/user</Link></div>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;