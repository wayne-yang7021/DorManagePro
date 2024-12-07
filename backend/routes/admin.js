
const express = require('express');
const router = express.Router();
const { eq, and } = require('drizzle-orm')
const { getDb, db } = require('../models/index')
const { user,  bed, snackOption, admin } = require('../models/schema'); // Schema
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'your_very_secure_and_long_secret_key';


router.post('/login', async (req, res) => {
    const db = getDb();
    const { admin_email, password } = req.body;
  
    if (!admin_email || !password) {
      return res.status(400).json({ message: 'Username and Password are required' });
    }
  
    try {
      // Check if the admin exists in the database and validate the password
      const foundAdmin = await db.select().from(admin).where(eq(admin.email, admin_email)).limit(1);
  
      if (!foundAdmin.length) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      // Assuming the password is hashed in the database
      const isPasswordValid = await bcrypt.compare(password, foundAdmin[0].ssn);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ admin_ssn: foundAdmin[0].ssn }, secretKey, { expiresIn: '1h' });
  
      // Set the token as an HttpOnly cookie
      res.cookie('adminAuthToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000, // 1 hour
      });
  
      res.json({ message: 'Admin login successful' });
    } catch (error) {
      console.error('Admin login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });


  router.get('/fetch', async (req, res) => {
    const db = getDb();
    const token = req.cookies.adminAuthToken;
  
    if (!token) {
      return res.status(401).json({ message: 'No authentication token' });
    }
  
    try {
      const decoded = jwt.verify(token, secretKey);
  
      // Fetch admin details from database using decoded token
      const foundAdmin = await db.select()
        .from(admin)
        .where(eq(admin.ssn, decoded.admin_ssn))
        .limit(1);
  
      if (!foundAdmin.length) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      res.json({
        dorm_id: foundAdmin[0].dorm_id,
        email: foundAdmin[0].email,
        phone: foundAdmin[0].phone, // Optional if the admin has roles
      });
    } catch (error) {
      res.status(401).json({ message: 'Invalid or expired token' });
    }
  });
  
  router.post('/api/admin/logout', (req, res) => {
    try {
      // Clear the admin's authentication cookie
      res.clearCookie('adminAuthToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
  
      res.status(200).json({ message: 'Admin logged out successfully' });
    } catch (error) {
      console.error('Admin logout error:', error);
      res.status(500).json({ message: 'Server error during logout' });
    }
  });

  module.exports = router;
