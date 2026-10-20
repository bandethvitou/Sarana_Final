// src/services/counsellor.js
import api from './api'

export const counsellorService = {
  // Cases
  getCases: () => api.get('/counsellor/cases'),
  getCaseById: (id) => api.get(`/counsellor/cases/${id}`),
  getActiveCases: () => api.get('/counsellor/cases/active'),
  createCase: (data) => api.post('/counsellor/cases', data),
  updateCase: (id, data) => api.put(`/counsellor/cases/${id}`, data),
  closeCase: (id) => api.put(`/counsellor/cases/${id}/close`, {}),
  
  // Sessions
  getSessions: () => api.get('/counsellor/sessions'),
  getSessionsByStudent: (studentId) => api.get(`/counsellor/sessions/student/${studentId}`),
  getTodaySessions: () => api.get('/counsellor/sessions/today'),
  createSession: (data) => api.post('/counsellor/sessions', data),
  
  // At-Risk Students
  getAtRiskStudents: () => api.get('/counsellor/at-risk'),
  getAtRiskByLevel: (level) => api.get(`/counsellor/at-risk/level/${level}`),
  updateRiskLevel: (studentId, data) => api.put(`/counsellor/at-risk/${studentId}`, data),
  
  // Parent Meetings
  getParentMeetings: () => api.get('/counsellor/parent-meetings'),
  createParentMeeting: (data) => api.post('/counsellor/parent-meetings', data),
  
  // Reports
  getReports: () => api.get('/counsellor/reports'),
  getCounsellorStats: () => api.get('/counsellor/stats'),
}

export default counsellorService