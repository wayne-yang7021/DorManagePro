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

// Routes
const userRoutes = require('./routes/user'); // 包含 auth, register, student_search
const dormRoutes = require('./routes/dorm'); // 包含 dorm_facility, facility_schedule, snack

// User-related routes (auth, register, student_search)
app.use('/api/user', userRoutes);

// Dorm-related routes (facilities, facility_schedule, snacks)
app.use('/api/dorm', dormRoutes);

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