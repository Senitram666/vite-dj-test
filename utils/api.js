import { Alpine } from 'alpinejs';

export async function apiRequest(endpoint, options = {}) {
  const auth = Alpine.store('auth');
  
  try {
    // Ensure authentication is valid before making request
    await auth.checkAuth();
    
    // Merge default headers with any provided headers
    const headers = {
      ...auth.getAuthHeaders(),
      ...options.headers
    };

  try {
    const response = await fetch(`/api/${endpoint}`, {
      ...options,
      headers
    });

    // Handle 401 by attempting token refresh
    if (response.status === 401) {
      await auth.refreshAccessToken();
      
      // Retry the request with new token
      const retryResponse = await fetch(`/api/${endpoint}`, {
        ...options,
        headers: {
          ...auth.getAuthHeaders(),
          ...options.headers
        }
      });

      if (!retryResponse.ok) {
        const error = await retryResponse.json();
        throw new Error(error.detail || 'Request failed after token refresh');
      }

      return retryResponse.json();
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Request failed');
    }

    return response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}