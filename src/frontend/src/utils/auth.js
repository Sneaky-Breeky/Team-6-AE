// Mock users for testing
const mockUsers = [
    { email: 'admin@gmail.com', password: 'password', role: 'admin' },
    { email: 'user@gmail.com', password: 'password', role: 'user' },
  ];
  
export const authenticateUser = (email, password) => {
    const user = mockUsers.find((u) => u.email === email && u.password === password);
    
    if (user) {
      return user;
    }
  
    const emailExists = mockUsers.find((u) => u.email === email);
    return emailExists ? "wrongpassword" : null;
  };

  
  export const isAdmin = () => localStorage.getItem('userRole') === 'admin';

  export const isLoggedIn = () => !!localStorage.getItem('userRole');
  