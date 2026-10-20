// src/pages/__tests__/Login.test.jsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../../context/AuthContext'
import Login from '../Login'

describe('Login', () => {
  test('should render login form', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthProvider>
    )
    
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument()
  })

  test('should show error with invalid credentials', async () => {
    const user = userEvent.setup()
    
    render(
      <AuthProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthProvider>
    )
    
    await user.type(screen.getByLabelText(/Email/i), 'wrong@email.com')
    await user.type(screen.getByLabelText(/Password/i), 'wrongpass')
    await user.click(screen.getByRole('button', { name: /Sign In/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument()
    })
  })
})