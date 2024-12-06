const express = require('express');
const app = express();
const port = 3000;

// Middleware: parse JSON
app.use(express.json());

// Routes
const userRoutes = require('./routes/user'); // 包含 auth, register, student_search
const dormRoutes = require('./routes/dorm'); // 包含 dorm_facility, facility_schedule, snack

// User-related routes (auth, register, student_search)
app.use('/api/user', userRoutes);

// Dorm-related routes (facilities, facility_schedule, snacks)
app.use('/api/dorm', dormRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
