// src/services/academic.js
import api from './api';

export const academicService = {
  getLevels: () => api.get('/academic/levels'),
  getClasses: () => api.get('/academic/classes'),
  getSubjects: () => api.get('/academic/subjects'),
  getStudentScores: (studentId) => api.get(`/academic/scores/student/${studentId}`),
  getAttendance: (classSubjectId) => api.get(`/academic/attendance/class-subject/${classSubjectId}`),
  getHomework: (classSubjectId) => api.get(`/academic/homework/class-subject/${classSubjectId}`),
  getLessonPlans: (classSubjectId) => api.get(`/academic/lesson-plans/class-subject/${classSubjectId}`),
};

export default academicService;