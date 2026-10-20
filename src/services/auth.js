import api from './api';

export const authService = {
  login: (username, password) => {
    return api.post('/auth/login', { username, password })
      .then(response => response.data)
      .catch(error => {
        console.error('Login error:', error);
        throw error;
      });
  },
  logout: () => {
    localStorage.clear();
  },
  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    if (!token) return Promise.resolve(null);
    return api.get('/users/me')
      .then(response => response.data)
      .catch(() => null);
  }
};

export default authService;