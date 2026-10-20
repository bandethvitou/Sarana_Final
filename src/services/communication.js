// src/services/communication.js
import api from './api';

export const communicationService = {
  getReceivedMessages: () => api.get('/communication/messages/received'),
  getUnreadMessages: () => api.get('/communication/messages/unread'),
  getUserNotifications: (userId) => api.get(`/communication/notifications/user/${userId}`),
  getMeetings: () => api.get('/communication/meetings'),
  getCorrespondence: () => api.get('/communication/correspondence'),
};

export default communicationService;