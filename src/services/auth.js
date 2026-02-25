import api from './api';
import { mockAuthService } from './mockAuth';

// Set to true to use mock data, false to use real API
const USE_MOCK = true;

export const authService = USE_MOCK ? mockAuthService : {
  async login(phoneOrEmail, password, countryCode = '+84') {
    const response = await api.post('/auth/login', {
      phoneOrEmail,
      password,
      countryCode
    });
    return response.data;
  },

  async register(phoneOrEmail, fullName, password, countryCode = '+84') {
    const response = await api.post('/auth/register', {
      phoneOrEmail,
      fullName,
      password,
      countryCode
    });
    return response.data;
  },

  async verifyToken() {
    const response = await api.get('/auth/verify');
    return response.data;
  },

  async logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
