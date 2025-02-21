import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import { isAdmin, isLoggedIn } from './utils/auth';
import SideMenu from './components/SideMenu';
import AppNavbar from './components/AppNavbar';
import Box from '@mui/material/Box';

function App() {
  return (
    <Router>
      {isLoggedIn() ? (
        <Box sx={{ display: 'flex' }}>
          <SideMenu />
          <Box sx={{ flexGrow: 1 }}>
            <AppNavbar />
            <Routes>
              {isAdmin() ? (
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              ) : (
                <Route path="/user/dashboard" element={<UserDashboard />} />
              )}
              <Route path="/" element={<Navigate to={isAdmin() ? '/admin/dashboard' : '/user/dashboard'} />} />
              <Route path="*" element={<Navigate to={isAdmin() ? '/admin/dashboard' : '/user/dashboard'} />} />

              {/* user */}
              <Route path="/user/projectDirectory" element={<ProjectDirectory />} />
              <Route path="*" element={<Navigate to="/user/projectDirectory" />} />

              <Route path="/project-overview/:id" element={<ProjectOverview />} />

              <Route path="/user/uploadFiles" element={<UserUpload />} />
              <Route path="*" element={<Navigate to="/user/uploadFiles" />} />

              <Route path="/user/activityLog" element={<ActivityLog />} />
              <Route path="*" element={<Navigate to="/user/activityLog" />} />

                
              {/* admin */}
              <Route path="/admin/projectCreation" element={<ProjectCreation />} />
              <Route path="*" element={<Navigate to="/admin/projectCreation" />} />

              <Route path="/admin/userManagement" element={<AdminUserManage />} />
              <Route path="*" element={<Navigate to="/admin/userManagement" />} />

              <Route path="/admin/metadataManagement" element={<AdminMetadataManage />} />
              <Route path="*" element={<Navigate to="/admin/metadataManagement" />} />

              <Route path="/admin/projectSecurity" element={<AdminProjectSecurity />} />
              <Route path="*" element={<Navigate to="/admin/projectSecurity" />} />
            </Routes>
          </Box>
        </Box>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
