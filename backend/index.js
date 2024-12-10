const express = require('express');
const { drizzle } = require('drizzle-orm/node-postgres');
const { eq } = require('drizzle-orm');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { getDb } = require('./models/index')
const { user, bed, admin } = require('./models/schema'); // Import your user schema
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const app = express();
const secretKey = process.env.JWT_SECRET || 'your_very_secure_and_long_secret_key';


// app.use(cors({
//   origin: 'http://localhost:3000',  // Frontend's URL
//   credentials: true
// }));
app.use(cors({
  origin: true, // 允許所有來源
  credentials: true // 允許傳遞 cookie
}));

app.use(express.json());
app.use(cookieParser());


// Routes
const userRoutes = require('./routes/user'); // 包含 auth, register
const dormRoutes = require('./routes/dorm'); // 包含 dorm_facility, facility_schedule, snack
const adminRoutes = require('./routes/admin'); // 包含 student_search, snack_announcement

// User-related routes (auth, register, student_search)
app.use('/api/user', userRoutes);

// Dorm-related routes (facilities, facility_schedule, snacks)
app.use('/api/dorm', dormRoutes);

app.use('/api/admin', adminRoutes);


app.post('/api/login', async (req, res) => {
  const db = getDb()
  const { student_id, ssn } = req.body;

  console.log(ssn)
  if (!student_id || !ssn) {
      return res.status(400).json({ message: 'Student ID and SSN are required' });
  }

  try {
      // Check if the user exists in the database and compare SSN
      const foundUser = await db.select().from(user).where(eq(user.studentId, student_id)).limit(1);
      // console.log(foundUser)
      if (!foundUser) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Assuming the SSN is encrypted in the database, decrypt it here (use a suitable decryption method)
      // const isSSNValid = await bcrypt.compare(ssn, foundUser[0].ssn); // Assuming SSN is hashed/encrypted using bcrypt
      const isSSNValid = ssn === foundUser[0].ssn; // Assuming SSN is hashed/encrypted using bcrypt
      if (!isSSNValid) {
          return res.status(401).json({ message: 'Invalid SSN' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: foundUser[0].ssn }, secretKey, { expiresIn: '1h' });

      // Set the token as an HttpOnly cookie
      res.cookie('authToken', token, {
          httpOnly: true,  // Important for security, prevents JS access to the cookie
          secure: process.env.NODE_ENV === 'production', // Ensure the cookie is sent over HTTPS in production
          maxAge: 3600000,  // Set cookie expiry time (1 hour here)
      });

      // Send success response
      res.json({ message: 'Login successful' });

  } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
  }
});


// User info endpoint with token verification
app.get('/api/user', async (req, res) => {
  const db = getDb()
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
      .limit(1);

    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // console.log(foundUser)

    res.json({
      ssn: foundUser[0].ssn,
      studentId: foundUser[0].studentId,
      dormId: foundUser[0].dormId,
      email: foundUser[0].email,
      phone: foundUser[0].phone,
      bId: foundUser[0].bId,

    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
});

app.post('/api/logout', (req, res) => {
  try {
    // Clear the user's authentication cookie
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error('User logout error:', error);
    res.status(500).json({ message: 'Server error during logout' });
  }
});

app.listen(8888, () => {
  console.log('Server running on http://localhost:8888');
});