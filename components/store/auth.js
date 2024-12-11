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

      // Set initial site based on role
      window.Alpine.store('site').setSiteFromRole(decoded.role);
      
      window.location.reload();
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Credenciais inválidas');
    }
  },

  async logout() {
    this.isAuthenticated = false;
    this.user = null;
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({}, '', url.toString());
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

      // Validate site access after token refresh
      const siteStore = window.Alpine.store('site');
      if (!siteStore.validateSiteAccess(decoded.role)) {
        this.logout();
        throw new Error('Invalid site access');
      }
      
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