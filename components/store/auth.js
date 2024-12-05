import { jwtDecode } from 'jwt-decode';

export default {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  refreshToken: null,
  
  init() {
    this.accessToken = localStorage.getItem('access_token');
    this.refreshToken = localStorage.getItem('refresh_token');
    
    if (this.accessToken) {
      try {
        const decoded = jwtDecode(this.accessToken);
        this.user = decoded;
        this.isAuthenticated = true;
      } catch (error) {
        this.logout();
      }
    }
    
    this.checkAuth();
  },

  async login(username, password) {
    try {
      /*
      // For demo purposes, simulate a successful login
      // Remove this block when connecting to a real backend
      const demoToken = {
        access: 'demo_access_token',
        refresh: 'demo_refresh_token',
        user: {
          name: username.split('@')[0],
          email: username,
          type: 'Lojista'
        }
      };
      
      // Store tokens
      this.accessToken = demoToken.access;
      this.refreshToken = demoToken.refresh;
      localStorage.setItem('access_token', demoToken.access);
      localStorage.setItem('refresh_token', demoToken.refresh);
      
      // Store user info
      this.user = demoToken.user;
      this.isAuthenticated = true;
      
      window.location.reload();
      return;
      */

      // Real API implementation (commented out for now)
      // /*
      const response = await fetch('/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Credenciais inválidas');
      }

      const { access, refresh } = await response.json();
      
      // Store tokens
      this.accessToken = access;
      this.refreshToken = refresh;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      
      // Decode and store user info
      const decoded = jwtDecode(access);
      this.user = decoded;
      this.isAuthenticated = true;
      
      window.location.reload();
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Credenciais inválidas');
    }
  },

  async logout() {
    // Clean up tokens and state
    this.isAuthenticated = false;
    this.user = null;
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.reload();
  },

  async refreshAccessToken() {
    try {
      const response = await fetch('/api/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh: this.refreshToken
        }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const { access } = await response.json();
      this.accessToken = access;
      localStorage.setItem('access_token', access);
      
      const decoded = jwtDecode(access);
      this.user = decoded;
      
      return access;
    } catch (error) {
      this.logout();
      throw error;
    }
  },

  async checkAuth() {
    if (!this.accessToken) {
      return false;
    }

    try {
      const decoded = jwtDecode(this.accessToken);
      const currentTime = Date.now() / 1000;
      
      if (decoded.exp < currentTime + 30) {
        await this.refreshAccessToken();
      }
      
      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  },

  getAuthHeaders() {
    return {
      'Authorization': `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    };
  }
};