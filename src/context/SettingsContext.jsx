// src/context/SettingsContext.jsx
import React, { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const SettingsContext = createContext()

const DEFAULT_SETTINGS = {
  dateFormat: 'DD/MM/YYYY',
  itemsPerPage: 25,
  notificationsEnabled: true,
  language: 'en',
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useLocalStorage('settings', DEFAULT_SETTINGS)

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS)
  }

  const value = {
    settings,
    updateSettings,
    resetSettings,
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider')
  }
  return context
}