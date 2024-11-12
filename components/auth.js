export default {
  isAuthenticated: false,
  user: null,
  
  init() {
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
    this.user = JSON.parse(localStorage.getItem('user'))
    this.checkAuth()
  },

  async login(username, password) {
    // Sample Django backend request
    /*
    try {
      const response = await fetch('/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include', // Required for Django CSRF
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Login failed')
      }

      const data = await response.json()
      this.isAuthenticated = true
      this.user = data.user
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('user', JSON.stringify(data.user))
      return data
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
    */

    // Demo version without backend
    if (username && password) {
      this.isAuthenticated = true
      this.user = { username }
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('user', JSON.stringify(this.user))
      window.location.reload()
    }
  },

  async logout() {
    // Sample Django backend request
    /*
    try {
      const response = await fetch('/api/auth/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
    */

    this.isAuthenticated = false
    this.user = null
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
    window.location.reload()
  },

  async checkAuth() {
    // Sample Django backend request
    /*
    try {
      const response = await fetch('/api/auth/verify/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Authentication check failed')
      }

      const data = await response.json()
      this.isAuthenticated = true
      this.user = data.user
      return true
    } catch (error) {
      console.error('Auth check error:', error)
      this.isAuthenticated = false
      this.user = null
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('user')
      return false
    }
    */

    return this.isAuthenticated
  }
}