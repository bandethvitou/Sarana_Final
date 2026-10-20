// src/services/reception.js
import api from './api'

export const receptionService = {
  // Student Check-In/Out
  getStudents: () => api.get('/reception/students'),
  getStudentsByClass: (classId) => api.get(`/reception/students/class/${classId}`),
  checkIn: (data) => api.post('/reception/check-in', data),
  checkOut: (data) => api.post('/reception/check-out', data),
  getAttendanceStats: () => api.get('/reception/attendance/stats'),
  
  // Visitors
  getVisitors: () => api.get('/reception/visitors'),
  getActiveVisitors: () => api.get('/reception/visitors/active'),
  registerVisitor: (data) => api.post('/reception/visitors', data),
  checkoutVisitor: (id) => api.put(`/reception/visitors/${id}/checkout`, {}),
  getVisitorStats: () => api.get('/reception/visitors/stats'),
  
  // Contacts
  getContacts: () => api.get('/reception/contacts'),
  getContactByDepartment: (department) => api.get(`/reception/contacts/department/${department}`),
  
  // Meetings
  getTodayMeetings: () => api.get('/reception/meetings/today'),
  getUpcomingMeetings: () => api.get('/reception/meetings/upcoming'),
  
  // Reports
  getDailyReport: () => api.get('/reception/reports/daily'),
  submitDailyReport: (data) => api.post('/reception/reports/daily', data),
  getDailyReportStats: () => api.get('/reception/reports/daily/stats'),
  
  // Calls
  logCall: (data) => api.post('/reception/calls', data),
  getCalls: () => api.get('/reception/calls'),
  getCallsByDate: (date) => api.get(`/reception/calls/date/${date}`),
}

export default receptionService