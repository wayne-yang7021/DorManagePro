const express = require('express');
const router = express.Router();
const { eq, and, isNull, isNotNull, ne,desc} = require('drizzle-orm')
const { getDb, db } = require('../models/index')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'your_very_secure_and_long_secret_key';
const { user,  bed , snackOption, semester, snackRecord, moveApplication, admin, maintenanceRecord, moveRecord, discussionBoard} = require('../models/schema'); // Schema

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
      // const isPasswordValid = await bcrypt.compare(password, foundAdmin[0].ssn);
      const isPasswordValid = password === foundAdmin[0].ssn
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
        ssn: foundAdmin[0].ssn,
        dormId: foundAdmin[0].dormId,
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
  
// 搜尋所有正在住的人
router.get('/all_living_student_search', async (req, res) => {
    const { dorm_id} = req.query;  
    // console.log("test", dorm_id)
    try {
        const db = getDb();
        const result = await db
        .select()
        .from(user)
        .where(eq(user.dormId, dorm_id)) // 住在此宿舍中並且還沒搬出去
        .orderBy(user.studentId);
  
        if (result.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(result);
        } catch (err) {
        res.status(500).json({ error: err.message });
        }
  });
// 根據 student_id 搜尋學生
router.get('/student_search', async (req, res) => {
    const { student_id ,dorm_id} = req.query;
  
    if (!student_id) {
      return res.status(400).json({ error: 'Student ID is required' });
    }
  
    try {
        const db = getDb();
        const result = await db
        .select()
        .from(user)
        .where(and(eq(user.studentId, student_id), eq(user.dormId, dorm_id))) 
  
        if (result.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(result);
        } catch (err) {
        res.status(500).json({ error: err.message });
        }
  });
  
  // 根據 room_number 搜尋學生
  router.get('/room_search', async (req, res) => {
    const { room_number , dorm_id} = req.query;
    if (!room_number) {
      return res.status(400).json({ error: 'Room number is required' });
    }
  
    try {
        const db = getDb();
        const result = await db
        .select({
          studentId: user.studentId,
          email: user.email,
          phone: user.phone,
          bId: user.bId,
          dueDate: user.dueDate,
          dormId: user.dormId
        })
        .from(user)
        .leftJoin(bed, eq(user.bId, bed.bId)) // LEFT JOIN 条件
        .where(and(eq(bed.roomNumber, room_number), eq(user.dormId, dorm_id),eq(bed.dormId, dorm_id)))
  
  
      if (result.length === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      res.json(result);
      console.log(result)
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
// Snack Announcement - 發佈零食公告
router.post('/snack_announcement', async (req, res) => {
    const { ssn, semester, dorm_id, snack_name } = req.body;
    try {
        const db = getDb();
        // 新增零食選項
        const result = await db
        .insert(snackOption).values({
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

// Snack Announcement Search - 查詢發布的零食公告
router.get('/snack_announcement_search', async (req, res) => {
    const {semester, dorm_id} = req.query;
    try {
        const db = getDb();
        
        const result = await db
        .select({
            semester: snackRecord.semester,
            snack: snackRecord.sName,
            dormId: snackRecord.dormId
        })
        .from(snackRecord)
        .where(and(eq(snackRecord.semester, semester), eq(snackRecord.dormId, dorm_id))) 
      
      if (result.length === 0) {
        return res.status(404).json({ error: 'Snack anouncement not found' });
      }
  
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

router.get('/getSemester', async(_, res) =>{
    try{
      const db = getDb();
      const result = await db
      .select()
      .from(semester)

      if (result.length === 0) {
        return res.status(404).json({ error: 'Semesters not found' });
      }
      res.json(result);
    }catch (err) {
      res.status(500).json({ error: err.message });
    }
})


// Maintenance Status Search - 查詢報修狀態
router.get('/maintenance_status', async (req, res) => {
    const {dorm_id} = req.query;
    try {
        const db = getDb();
        const result = await db
        .select({
            ssn: maintenanceRecord.ssn,
            dorm_id: user.dormId,
            description: maintenanceRecord.description,
            isCompleted: maintenanceRecord.isFinished,
            completedDate: maintenanceRecord.fixedDate
        })
        .from(maintenanceRecord)
        .leftJoin(user, eq(maintenanceRecord.ssn, user.ssn))
        .where(eq(user.dormId, dorm_id))
        .orderBy(desc(maintenanceRecord.fixedDate));

      if (result.length === 0) {
        return res.status(404).json({ error: 'Dorm change request not found' });
      }
  
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

// Update maintenance - 更新報修狀態
router.put('/update_maintenance', async (req, res) => {
    const { ssn, dorm_id, completedDate } = req.body; 
    if (!ssn || !dorm_id || !completedDate) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    try {
        const db = getDb();
        console.log('Attempting database update with ssn:', ssn, 'dorm_id:', dorm_id, 'completedDate:', completedDate);

        const updateResult = await db
            .update(maintenanceRecord)
            .set({
                isFinished: true,
                fixedDate: completedDate,
            })
            .where(eq(maintenanceRecord.ssn, ssn));

        console.log('Update result:', updateResult);

        if (!updateResult) {
            return res.status(500).json({ error: 'Database did not return expected results' });
        }

        if (updateResult.rowCount === 0) {
            return res.status(404).json({ error: 'No matching records found to update' });
        }

        return res.status(200).json({ message: 'Maintenance status updated successfully' });
    } catch (err) {
        console.error('Error during database operation:', err);
        return res.status(500).json({ error: err.message });
    }
});

router.put('/delete_post', async(req, res) => {
  const { mesid } = req.body;
  // console.log("mesid: ", mesid);
  try {
    const db = getDb();
    const deleteResult = await db
    .delete(discussionBoard)
    .where(eq(discussionBoard.mesid , mesid))

    if(!deleteResult){
      return res.status(400).json({ error: 'Failed to delete the post' });
    }
    
    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error while deleting the post:', err);
    return res.status(500).json({ error: err.message });
  }
})

// search move record  - 搜尋內轉紀錄
router.get('/move_record_search', async (req, res) => {
  try {
    const db = getDb();
    const { dorm_id } = req.query;
    const result = await db
    .select()
    .from(moveRecord)
    .where(eq(moveRecord.dormId, dorm_id));

    if (result.length === 0) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.json(result);
    console.log(result)
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
});

// bed Transfer Request Search - 查詢內轉請求
router.get('/bed_transfer_request_search', async (req, res) => {
  const {dorm_id} = req.query;
  try {
      const db = getDb();
      const result = await db
      .select({
        originalBed: moveApplication.originalBed,
        moveInBed: moveApplication.moveInBed,
        status : moveApplication.status,
        studentId: user.studentId,
        ssn: moveApplication.ssn,
        mid: moveApplication.mid,
        dormId: moveApplication.dormId
      })
      .from(moveApplication)
      .leftJoin(user, eq(user.ssn, moveApplication.ssn))
      .where(eq(moveApplication.dormId, dorm_id))
      .orderBy(moveApplication.applyTime);

    if (result.length === 0) {
      return res.status(404).json({ error: 'Dorm transfer request not found' });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Bed Transfer Request - 宿舍內轉更新
router.put('/bed_transfer_update', async (req, res) => {
  const { m_id, original_bed, move_in_bed, ssn, dorm_id} = req.body;
  try {
    const db = getDb();

    // Validate the input
    if (!m_id || !move_in_bed) {
      return res.status(400).json({ error: 'Invalid request: m_id and move_in_bed are required' });
    }

    // Start transaction
    await db.transaction(async (trx) => {
      // Update user's bed assignment
      const updateUser = await trx
        .update(user)
        .set({ bId: move_in_bed })
        .where(eq(user.ssn, ssn));

      if (!updateUser) {
        throw new Error('Failed to update user bed assignment');
      }
      const updateMoveInBed = await trx
        .update(bed)
        .set({ ssn: ssn})
        .where(and(eq(bed.bId, move_in_bed), eq(bed.dormId, dorm_id)));

      if (!updateMoveInBed) {
        throw new Error('Failed to update user bed assignment');
      }

      const updateOriginalBed = await trx
        .update(bed)
        .set({ ssn: null})
        .where(and(eq(bed.bId, original_bed), eq(bed.dormId, dorm_id)));

      if (!updateOriginalBed) {
        throw new Error('Failed to update user bed assignment');
      }

      // Update move application to "approved"
      const approveApplication = await trx
        .update(moveApplication)
        .set({ status: 'approved' })
        .where(eq(moveApplication.mid, m_id));

      if (!approveApplication) {
        throw new Error('Failed to update move application to approved');
      }

      // Update other move applications to "denied"
      const denyOtherApplications = await trx
        .update(moveApplication)
        .set({ status: 'denied' })
        .where(ne(moveApplication.mid, m_id));

      if (!denyOtherApplications) {
        throw new Error('Failed to update other move applications to denied');
      }
    });

    res.status(200).json({ message: 'Bed transfer updated successfully' });
  } catch (error) {
    console.error('Error during bed transfer update:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
