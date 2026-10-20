// src/services/it.js
import api from './api';

export const itService = {
  getEquipment: () => api.get('/it/equipment'),
  getTickets: () => api.get('/it/tickets'),
  getMaintenance: () => api.get('/it/maintenance'),
  getOpenTickets: () => api.get('/it/tickets/open'),
};

export default itService;