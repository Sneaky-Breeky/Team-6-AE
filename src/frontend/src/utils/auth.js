// Mock users for testing
const mockUsers = [
  { email: 'admin@gmail.com', password: 'password', role: 'admin' },
  { email: 'user@gmail.com', password: 'password', role: 'user' },
];

export const authenticateUser = (email, password) => {
  const user = mockUsers.find((u) => u.email === email && u.password === password);
  if (user) {
    sessionStorage.setItem('userRole', user.role);
    sessionStorage.setItem('menu', 0);
    return user;
  }
  const emailExists = mockUsers.find((u) => u.email === email);
    return emailExists ? "wrongpassword" : null;
};

export const isAdmin = () => sessionStorage.getItem('userRole') === 'admin';

export const isLoggedIn = () => !!sessionStorage.getItem('userRole');

export const logout = () => {
  sessionStorage.removeItem('userRole');
};
