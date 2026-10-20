// src/services/index.js
import api from './api';
export { api };

import { authService } from './auth';
export { authService };

// Import all services
import { admissionsService } from './admissions';
import { financeService } from './finance';
import { managementService } from './management';
import { hrService } from './hr';
import { itService } from './it';
import { libraryService } from './library';
import { academicService } from './academic';
import { communicationService } from './communication';
import { userService } from './users';

// Export all services
export {
  admissionsService,
  financeService,
  managementService,
  hrService,
  itService,
  libraryService,
  academicService,
  communicationService,
  userService,
};

// Default export
const services = {
  api,
  authService,
  admissionsService,
  financeService,
  managementService,
  hrService,
  itService,
  libraryService,
  academicService,
  communicationService,
  userService,
};

export default services;