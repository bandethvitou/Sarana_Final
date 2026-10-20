// src/services/hr.js
import api from './api';

export const hrService = {
  getLeaveRequests: () => api.get('/hr/leaves'),
  getHiringRequests: () => api.get('/hr/hiring'),
  getLeaveBalance: (staffId) => api.get(`/hr/leaves/staff/${staffId}/balance`),
};

export default hrService;