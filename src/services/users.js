// src/services/users.js
import api from './api';

export const userService = {
  getUsers: () => api.get('/users'),
  getUserById: (id) => api.get(`/users/${id}`),
  getRoles: () => api.get('/roles'),
  getSettings: () => api.get('/settings'),
};

export default userService;