import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUserManage from './pages/admin/AdminUserManage';
import AdminMetadataManage from './pages/admin/AdminMetadataManage';
import UserDashboard from './pages/user/UserDashboard';
import UserUpload from './pages/user/UserUpload';
import ProjectDirectory from './pages/user/UserProjectDir';
import ProjectOverview from './pages/user/UserProjectOverview';
import ProjectCreation from './pages/admin/AdminProjectCreation';
import AdminProjectSecurity from './pages/admin/AdminProjectSecurity';
import ActivityLog from './pages/user/UserActivityLog';
import SideMenu from './components/SideMenu';
import AppNavbar from './components/AppNavbar';
import Box from '@mui/material/Box';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        {loggedIn && <SideMenu />}
        <Box sx={{ flexGrow: 1 }}>
          <AppNavbar />
          <Routes>
            <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
            <Route path="*" element={<Navigate to="/login" />} />

            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />


            {/* user */}
            <Route path="/user/projectDirectory" element={<ProjectDirectory />} />

            <Route path="/projectDirectory/projectOverview/:id" element={<ProjectOverview />} />

            <Route path="/user/uploadFiles" element={<UserUpload />} />

            <Route path="/user/activityLog" element={<ActivityLog />} />


            {/* admin */}
            <Route path="/admin/projectCreation" element={<ProjectCreation />} />

            <Route path="/admin/userManagement" element={<AdminUserManage />} />

            <Route path="/admin/metadataManagement" element={<AdminMetadataManage />} />

            <Route path="/admin/projectSecurity" element={<AdminProjectSecurity />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}
export default App;
