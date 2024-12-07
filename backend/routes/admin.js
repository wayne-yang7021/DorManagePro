const express = require('express');
const router = express.Router();
const { eq, and } = require('drizzle-orm')
const { getDb, db } = require('../models/index')
const { user,  bed , snackOption, moveRecord, moveApplication, admin} = require('../models/schema'); // Schema
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

// 根據 student_id 搜尋學生
router.get('/student_search', async (req, res) => {
    const { student_id } = req.query;
  
    if (!student_id) {
      return res.status(400).json({ error: 'Student ID is required' });
    }
  
    try {
        const db = getDb();
        const result = await db
        .select({
        student_id: user.studentId,
        email: user.email,
        phone: user.phone,
        })
        .from(user)
        .where(eq(user.studentId, student_id))
        .limit(1);
  
        if (result.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
    
        res.json(result[0]);
        } catch (err) {
        res.status(500).json({ error: err.message });
        }
  });
  
  // 根據 room_number 搜尋學生
  router.get('/room_search', async (req, res) => {
    const { room_number } = req.query;
  
    if (!room_number) {
      return res.status(400).json({ error: 'Room number is required' });
    }
  
    try {
        const db = getDb();
      const result = await db
      .select({
        student_id: user.studentId,
        email: user.email,
        phone: user.phone,
        room_number: bed.roomNumber, // 从 bed 表中获取房间号
        dorm_id: bed.dormId,         // 从 bed 表中获取宿舍 ID
      })
      .from(user)
      .leftJoin(bed, eq(user.bId, bed.bId)) // LEFT JOIN 条件
      .where(eq(bed.roomNumber, room_number)) // 条件：room_number
      .limit(1);
  
  
      if (result.length === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      res.json(result[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

//Snack Announcement - 發佈零食公告
router.post('/snack_announcement', async (req, res) => {
    const { ssn, semester, dorm_id, snack_name } = req.body;
    console.log(ssn, semester,dorm_id,snack_name)
    try {
        const db = getDb();
      // 新增零食選項
      await db.insert(snackOption).values({
        ssn: ssn,
        semester: semester,
        dormId: dorm_id,
        sName: snack_name,
      });
  
      res.status(201).json({ message: 'Snack announcement created successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

// Dorm Transfer Request Search - 查詢宿舍變更請求
router.get('/dorm_transfer_request_search', async (req, res) => {
    const {origin_dorm_id} = req.query;
    console.log(origin_dorm_id)
    try {
        const db = getDb();
        const result = await db
        .select({
            student_id: user.studentId,
            origin_dorm: user.dormId,
            applying_dorm: moveApplication.dormId
        })
        .from(moveApplication)
        .leftJoin(user, eq(moveApplication.ssn, user.ssn))
        .where(eq(user.dormId, origin_dorm_id));

      if (result.length === 0) {
        return res.status(404).json({ error: 'Dorm change request not found' });
      }
  
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

  module.exports = router;
