// src/services/admissions.js
import api from './api';

export const admissionsService = {
  // Admissions Home
  getAdmissionsKPIs: () => api.get('/admissions/kpis'),
  getRecentRegistrations: () => api.get('/admissions/recent-registrations'),
  getPendingApplications: () => api.get('/admissions/pending-applications'),
  
  // Applications
  getApplications: () => api.get('/admissions/applications'),
  createApplication: (data) => api.post('/admissions/applications', data),
  getPendingReviews: () => api.get('/admissions/applications/pending-review'),
  reviewApplication: (data) => api.post('/admissions/applications/review', data),
  
  // Tours
  getTours: () => api.get('/admissions/tours'),
  createTour: (data) => api.post('/admissions/tours', data),
  getUpcomingTours: () => api.get('/admissions/tours/upcoming'),
  
  // Visitors
  getVisitors: () => api.get('/admissions/visitors'),
  registerVisitor: (data) => api.post('/admissions/visitors', data),
  checkoutVisitor: (data) => api.post('/admissions/visitors/checkout', data),
  getActiveVisitors: () => api.get('/admissions/visitors/active'),
  
  // Registration
  createRegistration: (data) => api.post('/admissions/registrations', data),
};

// Individual exports for convenience
export const createRegistration = admissionsService.createRegistration;
export const getAdmissionsKPIs = admissionsService.getAdmissionsKPIs;
export const getRecentRegistrations = admissionsService.getRecentRegistrations;
export const getPendingApplications = admissionsService.getPendingApplications;

export default admissionsService;