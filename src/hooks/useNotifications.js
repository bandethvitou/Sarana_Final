// src/hooks/useNotifications.js
import { useState, useEffect } from 'react'
import { api } from '../services'

export function useNotifications() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const response = await api.get('/notifications')
      const data = response.data.data || response.data
      setNotifications(data)
      setUnreadCount(data.filter(n => !n.read).length)
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`)
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      )
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  const markAllRead = async () => {
    try {
      await api.put('/notifications/read-all')
      setNotifications(prev => 
        prev.map(n => ({ ...n, read: true }))
      )
      setUnreadCount(0)
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
    }
  }

  const clearAll = async () => {
    try {
      await api.delete('/notifications')
      setNotifications([])
      setUnreadCount(0)
    } catch (error) {
      console.error('Error clearing notifications:', error)
    }
  }

  return {
    notifications,
    loading,
    unreadCount,
    markAsRead,
    markAllRead,
    clearAll,
    refresh: fetchNotifications
  }
}