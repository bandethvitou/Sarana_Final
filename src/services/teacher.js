// src/services/teacher.js
import api from './api'

export const teacherService = {
  // Lesson Plans
  getLessonPlans: () => api.get('/teacher/lesson-plans'),
  getLessonPlanById: (id) => api.get(`/teacher/lesson-plans/${id}`),
  getDailyPlans: () => api.get('/teacher/lesson-plans/daily'),
  getWeeklyPlans: () => api.get('/teacher/lesson-plans/weekly'),
  getMonthlyPlans: () => api.get('/teacher/lesson-plans/monthly'),
  createLessonPlan: (data) => api.post('/teacher/lesson-plans', data),
  updateLessonPlan: (id, data) => api.put(`/teacher/lesson-plans/${id}`, data),
  submitLessonPlan: (id) => api.put(`/teacher/lesson-plans/${id}/submit`, {}),
  copyLessonPlan: (data) => api.post('/teacher/lesson-plans/copy', data),
  deleteLessonPlan: (id) => api.delete(`/teacher/lesson-plans/${id}`),
  
  // Attendance
  getAttendance: (classSubjectId) => api.get(`/teacher/attendance/${classSubjectId}`),
  getTodayAttendance: () => api.get('/teacher/attendance/today'),
  markAttendance: (data) => api.post('/teacher/attendance', data),
  updateAttendance: (id, data) => api.put(`/teacher/attendance/${id}`, data),
  getAttendanceStats: () => api.get('/teacher/attendance/stats'),
  
  // Scores
  getScoreSheets: () => api.get('/teacher/scores'),
  getScoreSheetById: (id) => api.get(`/teacher/scores/${id}`),
  createScoreSheet: (data) => api.post('/teacher/scores', data),
  updateScore: (data) => api.put('/teacher/scores', data),
  submitScores: (id) => api.put(`/teacher/scores/${id}/submit`, {}),
  getScoreStats: () => api.get('/teacher/scores/stats'),
  
  // Homework
  getHomework: (classSubjectId) => api.get(`/teacher/homework/${classSubjectId}`),
  createHomework: (data) => api.post('/teacher/homework', data),
  updateHomework: (id, data) => api.put(`/teacher/homework/${id}`, data),
  deleteHomework: (id) => api.delete(`/teacher/homework/${id}`),
  getHomeworkStats: () => api.get('/teacher/homework/stats'),
  
  // Schedule
  getSchedule: () => api.get('/teacher/schedule'),
  getTodaySchedule: () => api.get('/teacher/schedule/today'),
  
  // Messages
  getMessages: () => api.get('/teacher/messages'),
  sendMessage: (data) => api.post('/teacher/messages', data),
  getUnreadMessages: () => api.get('/teacher/messages/unread'),
  
  // Notifications
  getNotifications: () => api.get('/teacher/notifications'),
  markNotificationRead: (id) => api.put(`/teacher/notifications/${id}/read`, {}),
  
  // Reports
  getReports: () => api.get('/teacher/reports'),
  createReport: (data) => api.post('/teacher/reports', data),
  
  // Stats
  getTeacherStats: () => api.get('/teacher/stats'),
}

export default teacherService