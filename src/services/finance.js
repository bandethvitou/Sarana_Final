// src/services/finance.js
import api from './api';

export const financeService = {
  getFeeSummary: () => api.get('/finance/fees/summary'),
  getStudentFees: (studentId) => api.get(`/finance/fees/student/${studentId}`),
  getOverdueFees: () => api.get('/finance/fees/overdue'),
  getBills: () => api.get('/finance/bills'),
  getExpenses: () => api.get('/finance/expenses'),
  createFee: (data) => api.post('/finance/fees', data),
  createPayment: (data) => api.post('/finance/payments', data),
  approveBill: (id) => api.put(`/finance/bills/${id}/approve`, {}),
};

export default financeService;