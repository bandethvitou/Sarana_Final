// src/services/management.js
import api from './api';

export const managementService = {
  // Goals
  getGoals: () => api.get('/goals'),
  createGoal: (data) => api.post('/goals', data),
  getGoalsByManager: (managerId) => api.get(`/goals/manager/${managerId}`),
  
  // Tasks
  getTasks: () => api.get('/tasks'),
  createTask: (data) => api.post('/tasks', data),
  completeTask: (id) => api.post(`/tasks/${id}/complete`, {}),
  
  // Reports
  getReports: () => api.get('/reports'),
  createReport: (data) => api.post('/reports', data),
  submitReport: (id) => api.post(`/reports/${id}/submit`, {}),
  getReportStats: () => api.get('/reports/stats'),
  
  // Proposals
  getProposals: () => api.get('/proposals'),
  createProposal: (data) => api.post('/proposals', data),
  
  // Activity Logs
  getActivityLogs: () => api.get('/activity-logs'),
};

export default managementService;