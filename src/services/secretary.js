// src/services/secretary.js
import api from './api'

export const secretaryService = {
  // Calendar
  getEvents: () => api.get('/secretary/calendar'),
  getEventsByDate: (date) => api.get(`/secretary/calendar/date/${date}`),
  getEventsByMonth: (month, year) => api.get(`/secretary/calendar/month/${month}/${year}`),
  createEvent: (data) => api.post('/secretary/calendar', data),
  updateEvent: (id, data) => api.put(`/secretary/calendar/${id}`, data),
  deleteEvent: (id) => api.delete(`/secretary/calendar/${id}`),
  getDirectorsCalendar: () => api.get('/secretary/calendar/director'),
  
  // Correspondence
  getCorrespondence: () => api.get('/secretary/correspondence'),
  getCorrespondenceByType: (type) => api.get(`/secretary/correspondence/type/${type}`),
  getPendingCorrespondence: () => api.get('/secretary/correspondence/pending'),
  createCorrespondence: (data) => api.post('/secretary/correspondence', data),
  replyCorrespondence: (id, data) => api.post(`/secretary/correspondence/${id}/reply`, data),
  
  // Meeting Minutes
  getMinutes: () => api.get('/secretary/minutes'),
  getMinutesById: (id) => api.get(`/secretary/minutes/${id}`),
  createMinutes: (data) => api.post('/secretary/minutes', data),
  updateMinutes: (id, data) => api.put(`/secretary/minutes/${id}`, data),
  publishMinutes: (id) => api.put(`/secretary/minutes/${id}/publish`, {}),
  deleteMinutes: (id) => api.delete(`/secretary/minutes/${id}`),
  
  // Task Tracking
  getTasks: () => api.get('/secretary/tasks'),
  createTask: (data) => api.post('/secretary/tasks', data),
  updateTask: (id, data) => api.put(`/secretary/tasks/${id}`, data),
  completeTask: (id) => api.put(`/secretary/tasks/${id}/complete`, {}),
  deleteTask: (id) => api.delete(`/secretary/tasks/${id}`),
  
  // Stats
  getStats: () => api.get('/secretary/stats'),
}

export default secretaryService