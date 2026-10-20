// src/hooks/usePermissions.js
import { useAuth } from '../context/AuthContext'

const ROLE_PERMISSIONS = {
  director: ['*'],
  'top-manager': ['view_reports', 'manage_managers', 'view_all_data'],
  manager: ['view_reports', 'manage_team'],
  staff: ['view_tasks', 'submit_reports'],
  hr: ['manage_staff', 'view_leave', 'manage_roles'],
  finance: ['manage_bills', 'view_finance'],
  teacher: ['manage_scores', 'manage_attendance'],
  student: ['view_scores', 'view_attendance'],
  parent: ['view_children', 'view_fees'],
  it: ['manage_tickets', 'manage_equipment'],
  admissions: ['manage_applications', 'manage_tours'],
  reception: ['manage_visitors', 'manage_checkin'],
  library: ['manage_books', 'manage_checkout'],
  counsellor: ['manage_cases', 'manage_sessions'],
  secretary: ['manage_calendar', 'manage_correspondence'],
}

export function usePermissions() {
  const { user } = useAuth()

  const hasPermission = (permission) => {
    const userPerms = ROLE_PERMISSIONS[user?.role] || []
    return userPerms.includes('*') || userPerms.includes(permission)
  }

  const hasRole = (role) => {
    return user?.role === role
  }

  const hasAnyRole = (roles) => {
    return roles.includes(user?.role)
  }

  const getPermissions = () => {
    return ROLE_PERMISSIONS[user?.role] || []
  }

  return { 
    hasPermission, 
    hasRole, 
    hasAnyRole, 
    getPermissions,
    permissions: ROLE_PERMISSIONS 
  }
}