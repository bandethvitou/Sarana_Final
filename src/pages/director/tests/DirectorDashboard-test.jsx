// src/pages/director/__tests__/DirectorDashboard.test.jsx
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../../../context/AuthContext'
import DirectorDashboard from '../DirectorDashboard'

describe('DirectorDashboard', () => {
  test('should render KPI cards', () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <DirectorDashboard />
        </BrowserRouter>
      </AuthProvider>
    )
    
    expect(screen.getByText(/Total Students/i)).toBeInTheDocument()
    expect(screen.getByText(/Attendance Today/i)).toBeInTheDocument()
    expect(screen.getByText(/Fee Collection/i)).toBeInTheDocument()
  })

  test('should show quick action buttons', () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <DirectorDashboard />
        </BrowserRouter>
      </AuthProvider>
    )
    
    expect(screen.getByText(/Promote User/i)).toBeInTheDocument()
    expect(screen.getByText(/Create Meeting/i)).toBeInTheDocument()
    expect(screen.getByText(/Add Goal/i)).toBeInTheDocument()
  })
})