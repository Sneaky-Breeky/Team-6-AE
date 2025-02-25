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
                <Route path="/Team-6-AE/admin/dashboard" element={<AdminDashboard />} />
              ) : (
                <Route path="/Team-6-AE/user/dashboard" element={<UserDashboard />} />
              )}
              <Route path="/" element={<Navigate to={isAdmin() ? '/Team-6-AE/admin/dashboard' : '/Team-6-AE/user/dashboard'} />} />
              <Route path="*" element={<Navigate to={isAdmin() ? '/Team-6-AE/admin/dashboard' : '/Team-6-AE/user/dashboard'} />} />

              {/* user */}
              <Route path="/Team-6-AE/user/projectDirectory" element={<ProjectDirectory />} />
              <Route path="*" element={<Navigate to="/Team-6-AE/user/projectDirectory" />} />

              <Route path="/Team-6-AE/projectDirectory/projectOverview/:id" element={<ProjectOverview />} />

              <Route path="/Team-6-AE/user/uploadFiles" element={<UserUpload />} />
              <Route path="*" element={<Navigate to="/Team-6-AE/user/uploadFiles" />} />

              <Route path="/Team-6-AE/user/activityLog" element={<ActivityLog />} />
              <Route path="*" element={<Navigate to="/Team-6-AE/user/activityLog" />} />


              {/* admin */}
              <Route path="/Team-6-AE/admin/projectCreation" element={<ProjectCreation />} />
              <Route path="*" element={<Navigate to="/Team-6-AE/admin/projectCreation" />} />

              <Route path="/Team-6-AE/admin/userManagement" element={<AdminUserManage />} />
              <Route path="*" element={<Navigate to="/Team-6-AE/admin/userManagement" />} />

              <Route path="/Team-6-AE/admin/metadataManagement" element={<AdminMetadataManage />} />
              <Route path="*" element={<Navigate to="/Team-6-AE/admin/metadataManagement" />} />

              <Route path="/Team-6-AE/admin/projectSecurity" element={<AdminProjectSecurity />} />
              <Route path="*" element={<Navigate to="/Team-6-AE/admin/projectSecurity" />} />
            </Routes>
          </Box>
        </Box>
      ) : (
        <Routes>
          <Route path="/Team-6-AE/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/Team-6-AE/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
