import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/UserDashboard';
import { isAdmin, isLoggedIn } from './utils/auth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

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
    </Router>
  );
}

export default App;