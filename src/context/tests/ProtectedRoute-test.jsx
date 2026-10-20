// src/components/__tests__/ProtectedRoute.test.jsx
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../../context/AuthContext'
import ProtectedRoute from '../ProtectedRoute'

const TestComponent = () => <div>Protected Content</div>
const LoginComponent = () => <div>Login Page</div>

describe('ProtectedRoute', () => {
  test('should redirect to login when not authenticated', () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/protected" element={
              <ProtectedRoute>
                <TestComponent />
              </ProtectedRoute>
            } />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    )
    
    expect(screen.getByText('Login Page')).toBeInTheDocument()
  })

  test('should render children when authenticated', async () => {
    // Mock authenticated user
    localStorage.setItem('user', JSON.stringify({ 
      name: 'Director', 
      role: 'director' 
    }))
    
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/protected" element={
              <ProtectedRoute>
                <TestComponent />
              </ProtectedRoute>
            } />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeInTheDocument()
    })
    
    localStorage.removeItem('user')
  })
})