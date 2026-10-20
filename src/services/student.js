// src/services/student.js
import api from './api'

export const studentService = {
  // Dashboard
  getDashboardStats: () => api.get('/student/dashboard/stats'),
  
  // Scores
  getScores: () => api.get('/student/scores'),
  getScoreBySubject: (subjectId) => api.get(`/student/scores/subject/${subjectId}`),
  getScoreHistory: () => api.get('/student/scores/history'),
  
  // Attendance
  getAttendance: () => api.get('/student/attendance'),
  getAttendanceStats: () => api.get('/student/attendance/stats'),
  getAttendanceCalendar: () => api.get('/student/attendance/calendar'),
  
  // Homework
  getHomework: () => api.get('/student/homework'),
  getHomeworkById: (id) => api.get(`/student/homework/${id}`),
  submitHomework: (id, data) => api.post(`/student/homework/${id}/submit`, data),
  getHomeworkStats: () => api.get('/student/homework/stats'),
  
  // Calendar
  getCalendar: () => api.get('/student/calendar'),
  getEventsByDate: (date) => api.get(`/student/calendar/date/${date}`),
  
  // Gallery
  getAlbums: () => api.get('/student/gallery/albums'),
  getPhotos: (albumId) => api.get(`/student/gallery/albums/${albumId}/photos`),
  
  // Reports
  getReports: () => api.get('/student/reports'),
  createReport: (data) => api.post('/student/reports', data),
  
  // Notifications
  getNotifications: () => api.get('/student/notifications'),
  markNotificationRead: (id) => api.put(`/student/notifications/${id}/read`, {}),
  markAllRead: () => api.put('/student/notifications/read-all', {}),
  
  // Profile
  getProfile: () => api.get('/student/profile'),
  updateProfile: (data) => api.put('/student/profile', data),
}

export default studentService