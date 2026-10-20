// src/services/parent.js
import api from './api'

export const parentService = {
  // Children
  getChildren: () => api.get('/parent/children'),
  getChildById: (id) => api.get(`/parent/children/${id}`),
  getChildDetails: (id) => api.get(`/parent/children/${id}/details`),
  
  // Dashboard
  getDashboardStats: () => api.get('/parent/dashboard/stats'),
  
  // Scores
  getScores: (childId) => api.get(`/parent/scores/${childId}`),
  getScoreBySubject: (childId, subjectId) => api.get(`/parent/scores/${childId}/subject/${subjectId}`),
  
  // Attendance
  getAttendance: (childId) => api.get(`/parent/attendance/${childId}`),
  getAttendanceStats: (childId) => api.get(`/parent/attendance/${childId}/stats`),
  
  // Homework
  getHomework: (childId) => api.get(`/parent/homework/${childId}`),
  getHomeworkStats: (childId) => api.get(`/parent/homework/${childId}/stats`),
  
  // Fees
  getFees: (childId) => api.get(`/parent/fees/${childId}`),
  getFeeSummary: (childId) => api.get(`/parent/fees/${childId}/summary`),
  payFee: (data) => api.post('/parent/fees/pay', data),
  getPaymentHistory: (childId) => api.get(`/parent/fees/${childId}/history`),
  
  // Messages
  getMessages: () => api.get('/parent/messages'),
  getConversations: () => api.get('/parent/messages/conversations'),
  sendMessage: (data) => api.post('/parent/messages', data),
  getUnreadMessages: () => api.get('/parent/messages/unread'),
  
  // Reports
  getReports: () => api.get('/parent/reports'),
  createReport: (data) => api.post('/parent/reports', data),
  
  // Events
  getEvents: () => api.get('/parent/events'),
  
  // Notifications
  getNotifications: () => api.get('/parent/notifications'),
  markNotificationRead: (id) => api.put(`/parent/notifications/${id}/read`, {}),
}

export default parentService