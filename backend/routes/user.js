const express = require('express');
const router = express.Router();

const { getDb } = require('../models/index'); // 正確導入 getDb 函數
const { user,  bed } = require('../models/schema'); // Schema
const { eq } = require('drizzle-orm');

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


// Dorm Change Request - 宿舍變更請求
router.get('/dorm_change_request', async (req, res) => {
  try {
    const { username, student_id } = req.query;
    const result = await db
      .select({
        username: user.username,
        student_id: user.studentId,
        original_dorm: user.dormId,
        b_id: user.bId,
      })
      .from(user)
      .where(user.username.eq(username).and(users.studentId.eq(student_id)))
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