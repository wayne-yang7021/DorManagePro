const express = require('express');
const router = express.Router();
const { eq, and } = require('drizzle-orm')
const { getDb, db } = require('../models/index')
const { user,  bed, snackOption, maintenanceRecord } = require('../models/schema'); // Schema

router.post('/maintenance', async (req, res) => {
  const { ssn, description } = req.body;
  const db = getDb();
  // Input validation
  if (!ssn || !description) {
    return res.status(400).json({ message: 'SSN and description are required' });
  }

  try {
    // Insert the maintenance request into the database
    const result =  await db.insert(maintenanceRecord).values({
      ssn: ssn,
      description: description,
      fixedDate: null, // set fixedDate to null
      isFinished: false, // default value
    });

    // Respond with success
    res.status(201).json({
      message: 'Maintenance request submitted successfully',
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to submit maintenance request', error: error.message });
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
    const result = await db
    .select()
    .from(snackOption)
    .where(and(eq(snackOption.dormId, dormId), eq(snackOption.semester, semester)));
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