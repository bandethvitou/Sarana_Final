// src/context/NotificationContext.jsx
import React, { createContext, useContext } from 'react'
import { useNotifications } from '../hooks/useNotifications'

const NotificationContext = createContext()

export function NotificationProvider({ children }) {
  const notifications = useNotifications()

  return (
    <NotificationContext.Provider value={notifications}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationContext = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotificationContext must be used within NotificationProvider')
  }
  return context
}