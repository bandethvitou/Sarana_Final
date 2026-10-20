// src/context/__tests__/AuthContext.test.jsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthProvider, useAuth } from '../AuthContext'

const TestComponent = () => {
  const { user, login, logout, loading, isAuthenticated } = useAuth()
  
  if (loading) return <div>Loading...</div>
  
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <span>Welcome {user?.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => login('director@nis.edu', 'director123', 'director')}>
          Login
        </button>
      )}
    </div>
  )
}

describe('AuthContext', () => {
  test('should show loading state initially', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('should login user successfully', async () => {
    const user = userEvent.setup()
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Login')).toBeInTheDocument()
    })
    
    await user.click(screen.getByText('Login'))
    
    await waitFor(() => {
      expect(screen.getByText('Welcome Director')).toBeInTheDocument()
    })
  })

  test('should logout user', async () => {
    const user = userEvent.setup()
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Login')).toBeInTheDocument()
    })
    
    await user.click(screen.getByText('Login'))
    
    await waitFor(() => {
      expect(screen.getByText('Welcome Director')).toBeInTheDocument()
    })
    
    await user.click(screen.getByText('Logout'))
    
    await waitFor(() => {
      expect(screen.getByText('Login')).toBeInTheDocument()
    })
  })
})