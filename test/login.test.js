import { expect, test, vi } from 'vitest'
import Alpine from 'alpinejs'
import login from '../components/login'

// Mock Alpine.js store
const mockStore = {
  auth: {
    login: vi.fn(),
    isAuthenticated: false
  }
}

beforeEach(() => {
  // Reset mock store
  mockStore.auth.login.mockReset()
  mockStore.auth.isAuthenticated = false
  
  // Setup Alpine.js test environment
  window.Alpine = Alpine
  Alpine.store('auth', mockStore.auth)
})

test('login form validation', () => {
  const component = login()
  
  // Test empty fields validation
  component.handleSubmit()
  expect(component.formData.error).toBe('Por favor, preencha todos os campos')
  
  // Test successful login
  component.formData.username = 'test@example.com'
  component.formData.password = 'password123'
  component.handleSubmit()
  expect(mockStore.auth.login).toHaveBeenCalledWith('test@example.com', 'password123')
})

test('registration form validation', () => {
  const component = login()
  component.isRegistering = true
  
  // Test empty fields validation
  component.handleSubmit()
  expect(component.formData.error).toBe('Por favor, preencha todos os campos')
  
  // Test password mismatch
  component.formData.username = 'test@example.com'
  component.formData.password = 'password123'
  component.formData.confirmPassword = 'password456'
  component.formData.firstName = 'John'
  component.formData.lastName = 'Doe'
  component.handleSubmit()
  expect(component.formData.error).toBe('As senhas não coincidem')
  
  // Test successful registration
  component.formData.confirmPassword = 'password123'
  component.handleSubmit()
  expect(mockStore.auth.login).toHaveBeenCalledWith('test@example.com', 'password123')
})

test('form toggle functionality', () => {
  const component = login()
  expect(component.isRegistering).toBe(false)
  
  component.toggleForm()
  expect(component.isRegistering).toBe(true)
  
  // Verify form data is reset
  expect(component.formData.username).toBe('')
  expect(component.formData.password).toBe('')
})