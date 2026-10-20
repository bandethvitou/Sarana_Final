// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }, [key, storedValue])

  const remove = () => {
    try {
      localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.error('Error removing from localStorage:', error)
    }
  }

  return [storedValue, setStoredValue, remove]
}