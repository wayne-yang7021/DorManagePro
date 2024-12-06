const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { db } = require('./routes/index')
const { user } = require('./models/schema'); // Import your user schema
const cookieParser = require('cookie-parser');

const app = express();
const secretKey = process.env.JWT_SECRET || 'your_very_secure_and_long_secret_key';

app.use(cors({
  origin: 'http://localhost:8888',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Login endpoint with database verification
app.post('/api/login', async (req, res) => {
  const { student_id, ssn } = req.body;

  try {
    // Verify user credentials against the database
    const foundUser = await db.select()
      .from(user)
      .where(
        and(
          eq(user.studentId, student_id),
          eq(user.ssn, ssn)
        )
      )
      .get();

    if (!foundUser) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token with user information
    const payload = { 
      userId: foundUser.ssn, 
      studentId: foundUser.studentId 
    };
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    // Set secure, HTTP-only cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000 // 1 hour
    });

    res.json({ 
      message: 'Login successful', 
      user: { 
        studentId: foundUser.studentId, 
        email: foundUser.email 
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// User info endpoint with token verification
app.get('/api/user', async (req, res) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: 'No authentication token' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    
    // Fetch user from database using decoded token
    const foundUser = await db.select()
      .from(user)
      .where(eq(user.ssn, decoded.userId))
      .get();

    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      studentId: foundUser.studentId,
      email: foundUser.email,
      phone: foundUser.phone
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
});