import mysql from 'mysql2/promise'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'excel_ai_platform',
  port: process.env.DB_PORT || 3306
}

let connection
let isConnected = false
const USE_DATABASE = process.env.USE_DATABASE !== 'false'

export async function connectDB() {
  if (!USE_DATABASE) {
    console.log('Database disabled')
    isConnected = false
    return null
  }

  try {
    connection = await mysql.createConnection(dbConfig)
    await connection.ping()
    console.log('Connected to MySQL database:', dbConfig.database)
    isConnected = true
    return connection
  } catch (error) {
    console.error('Database connection failed:', error.message)
    isConnected = false
    return null
  }
}

export async function authenticateUser(loginKey, password) {
  if (!isConnected || !connection) {
    console.log('Database not connected')
    return null
  }

  try {
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE (username = ? OR email = ?) AND is_active = 1',
      [loginKey, loginKey]
    )
    
    if (rows.length === 0) return null
    
    const user = rows[0]
    const isValid = password === user.password_hash
    
    if (isValid) {
      return {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        badge: user.badge
      }
    }
    return null
  } catch (error) {
    console.error('Auth error:', error)
    return null
  }
}

export async function createUser(username, email, password, fullName) {
  if (!isConnected || !connection) {
    throw new Error('Database not connected')
  }

  try {
    const [existingUser] = await connection.execute(
      'SELECT id FROM users WHERE username = ?',
      [username]
    )
    
    if (existingUser.length > 0) {
      throw new Error('Tên đăng nhập đã được sử dụng')
    }

    if (email) {
      const [existingEmail] = await connection.execute(
        'SELECT id FROM users WHERE email = ?',
        [email]
      )
      
      if (existingEmail.length > 0) {
        throw new Error('Email đã được sử dụng')
      }
    }

    const [result] = await connection.execute(
      'INSERT INTO users (username, password_hash, full_name, email, role) VALUES (?, ?, ?, ?, ?)',
      [username, password, fullName, email || null, 'user']
    )
    return result
  } catch (error) {
    console.error('Create user error:', error)
    throw error
  }
}

export async function getExercises() {
  if (!isConnected || !connection) {
    return []
  }

  try {
    const [rows] = await connection.execute('SELECT * FROM tasks')
    return rows
  } catch (error) {
    console.error('Get exercises error:', error)
    return []
  }
}

export async function findOrCreateGoogleUser(googleUser) {
  if (!isConnected || !connection) {
    return null
  }

  try {
    const [existing] = await connection.execute(
      'SELECT * FROM users WHERE google_id = ? OR email = ?',
      [googleUser.id, googleUser.email]
    )

    if (existing.length > 0) {
      return existing[0]
    }

    const baseUsername = googleUser.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '')
    let username = baseUsername
    let counter = 1
    
    while (true) {
      const [existingUsername] = await connection.execute(
        'SELECT id FROM users WHERE username = ?',
        [username]
      )
      if (existingUsername.length === 0) break
      username = baseUsername + counter
      counter++
    }

    const [result] = await connection.execute(
      'INSERT INTO users (username, email, full_name, google_id, avatar_url) VALUES (?, ?, ?, ?, ?)',
      [username, googleUser.email, googleUser.name, googleUser.id, googleUser.picture]
    )

    const [newUser] = await connection.execute(
      'SELECT * FROM users WHERE id = ?',
      [result.insertId]
    )

    return newUser[0]
  } catch (error) {
    console.error('Google auth error:', error)
    return null
  }
}

export async function saveUserProgress(userId, exerciseId, score, completed) {
  if (!isConnected || !connection) {
    return { insertId: 1 }
  }

  try {
    const [result] = await connection.execute(
      'INSERT INTO user_progress (user_id, program_id, completion_percent) VALUES (?, ?, ?)',
      [userId, exerciseId, score]
    )
    return result
  } catch (error) {
    console.error('Save progress error:', error)
    throw error
  }
}
