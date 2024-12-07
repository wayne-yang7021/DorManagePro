const express = require('express');
const router = express.Router();

const { getDb } = require('../models/index'); // 正確導入 getDb 函數
const { user,  bed , snackOption, moveRecord, moveApplication} = require('../models/schema'); // Schema
const { eq, } = require('drizzle-orm');

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