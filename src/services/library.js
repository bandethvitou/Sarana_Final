// src/services/library.js
import api from './api';

export const libraryService = {
  getBooks: () => api.get('/library/books'),
  getAvailableBooks: () => api.get('/library/books/available'),
  getActiveCheckouts: (studentId) => api.get(`/library/checkouts/student/${studentId}/active`),
  getOverdueBooks: () => api.get('/library/checkouts/overdue'),
};

export default libraryService;