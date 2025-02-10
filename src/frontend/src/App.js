import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/UserDashboard';
import { isAdmin, isLoggedIn } from './utils/auth';
<<<<<<< HEAD
import SideMenu from './components/SideMenu'; 
import AppNavbar from './components/AppNavbar'; 
import Box from '@mui/material/Box';
=======
import ActivityLog from './pages/ActivityLog';
>>>>>>> 296c5a0 (general activity log page made with customized date to string, side menu to be added)

function App() {
  return (
    <Router>
<<<<<<< HEAD
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
            </Routes>
          </Box>
        </Box>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
=======
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/ActivityLog" element={<ActivityLog />} />

        {isLoggedIn() && isAdmin() && (
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        )}
        {isLoggedIn() && !isAdmin() && (
          <Route path="/user/dashboard" element={<UserDashboard />} />
        )}

        <Route
          path="/"
          element={
            isLoggedIn()
              ? <Navigate to={isAdmin() ? '/admin/dashboard' : '/user/dashboard'} />
              : <Navigate to="/login" />
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
>>>>>>> 296c5a0 (general activity log page made with customized date to string, side menu to be added)
    </Router>
  );
}

export default App;
