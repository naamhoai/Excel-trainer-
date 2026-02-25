// Mock authentication service for testing without backend

const MOCK_USERS = [
  {
    id: 1,
    username: 'admin@classin.com',
    password: 'admin123',
    full_name: 'Admin User',
    email: 'admin@classin.com',
    role: 'admin'
  },
  {
    id: 2,
    username: 'teacher@classin.com',
    password: 'teacher123',
    full_name: 'Teacher User',
    email: 'teacher@classin.com',
    role: 'teacher'
  },
  {
    id: 3,
    username: 'student@classin.com',
    password: 'student123',
    full_name: 'Student User',
    email: 'student@classin.com',
    role: 'student'
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAuthService = {
  async login(phoneOrEmail, password) {
    await delay(500); // Simulate network delay

    const user = MOCK_USERS.find(
      u => (u.username === phoneOrEmail || u.email === phoneOrEmail) && u.password === password
    );

    if (!user) {
      throw {
        response: {
          data: {
            error: 'Invalid credentials. Try: admin@classin.com / admin123'
          }
        }
      };
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = 'mock-token-' + Date.now();

    return {
      message: 'Login successful',
      token,
      user: userWithoutPassword
    };
  },

  async register(phoneOrEmail, fullName, password, countryCode = '+84') {
    await delay(500);

    // Check if user already exists
    const exists = MOCK_USERS.find(
      u => u.username === phoneOrEmail || u.email === phoneOrEmail
    );

    if (exists) {
      throw {
        response: {
          data: {
            error: 'User already exists'
          }
        }
      };
    }

    // Create new user
    const newUser = {
      id: MOCK_USERS.length + 1,
      username: phoneOrEmail,
      full_name: fullName,
      email: phoneOrEmail,
      role: 'student'
    };

    MOCK_USERS.push({
      ...newUser,
      password
    });

    const token = 'mock-token-' + Date.now();

    return {
      message: 'Registration successful',
      token,
      user: newUser
    };
  },

  async verifyToken() {
    await delay(300);

    const token = localStorage.getItem('token');
    if (!token || !token.startsWith('mock-token-')) {
      throw {
        response: {
          data: {
            error: 'Invalid token'
          }
        }
      };
    }

    const userStr = localStorage.getItem('user');
    if (!userStr) {
      throw {
        response: {
          data: {
            error: 'User not found'
          }
        }
      };
    }

    return {
      user: JSON.parse(userStr)
    };
  },

  async logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Export mock users for reference
export const MOCK_CREDENTIALS = {
  admin: {
    email: 'admin@classin.com',
    password: 'admin123'
  },
  teacher: {
    email: 'teacher@classin.com',
    password: 'teacher123'
  },
  student: {
    email: 'student@classin.com',
    password: 'student123'
  }
};
