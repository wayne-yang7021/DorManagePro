const express = require('express');
const router = express.Router();
const { eq, and } = require('drizzle-orm')
const { getDb, db } = require('../models/index')
const { user,  bed, snackOption } = require('../models/schema'); // Schema

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // 查詢用戶
    const user = await db
      .select({
        ssn: user.ssn,
        username: user.studentId,
        password: user.ssn,
      })
      .from(user)
      .where(user.studentId.eq(username))
      .limit(1);

    console.log(user)
    if (user.length === 0 || user[0].password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    console.log(user.ssn)

    // 生成會話令牌
    const token = `session-${Date.now()}-${Math.random()}`;
    await db.update(user)
      .set({ sessionToken: token })
      .where(user.ssn.eq(user[0].ssn));

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// 根據 student_id 和 room_id 搜尋學生
router.get('/student_search', async (req, res) => {
  try {
    const db = getDb();
    const { student_id, room_id } = req.query;
    const result = await db
      .select({
        student_id: users.studentId,
        room_id: bed.roomNumber,
        username: users.username,
        email: users.email,
        phone: users.phone,
      })
      .from(users)
      .innerJoin(bed, bed.bId.eq(users.bId))
      .where(users.studentId.eq(student_id).and(bed.roomNumber.eq(room_id)))
      .limit(1);

    if (result.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/snack_options', async (req, res) => {
  try {
    const db = getDb();
    const { dormId, semester } = req.query;
    console.log(dormId, semester)
    const result = await db
    .select()
    .from(snackOption)
    .where(and(eq(snackOption.dormId, dormId), eq(snackOption.semester, semester)));
    console.log(result)
    if (result.length === 0) {
      return res.status(404).json({ error: 'Dorm change request not found' });
    }
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
});
// Dorm Change Request - 宿舍變更請求
 
router.get('/dorm_change_request', async (req, res) => {
  try {
    const db = getDb();
    const { username, student_id } = req.query;
    const result = await db
      .select({
        username: users.username,
        student_id: users.studentId,
        original_dorm: users.dormId,
        b_id: users.bId,
      })
      .from(users)
      .where(users.username.eq(username).and(users.studentId.eq(student_id)))
      .limit(1);

    if (result.length === 0) {
      return res.status(404).json({ error: 'Dorm change request not found' });
    }

    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;