// Quick test script to check backend
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

async function testBackend() {
  try {
    console.log('Testing backend connection...');
    
    // Test health endpoint
    const health = await axios.get(`${API_URL}/health`);
    console.log('✅ Health check:', health.data);
    
    // Test register
    const registerData = {
      phoneOrEmail: 'test@example.com',
      fullName: 'Test User',
      password: 'test123',
      countryCode: '+84'
    };
    
    console.log('\nTesting registration...');
    const register = await axios.post(`${API_URL}/auth/register`, registerData);
    console.log('✅ Registration successful:', register.data);
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n⚠️  Backend server is not running!');
      console.log('Please run: npm run server');
    }
  }
}

testBackend();
