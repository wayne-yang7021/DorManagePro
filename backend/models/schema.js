const { pgTable, serial, varchar, text, integer, boolean, timestamp, date } = require('drizzle-orm/pg-core');

// ADMIN 表
const admin = pgTable('admin', {
  ssn: varchar('ssn', 50).primaryKey(),
  username: varchar('username', 100).notNull(),
  password: varchar('password', 100).notNull(),
  dormId: varchar('dorm_id', 50).notNull(),
  email: varchar('email', 100),
  phone: varchar('phone', 20),
});

// USER 表
const user = pgTable('user', {
  ssn: varchar('ssn', 20).primaryKey(),
  username: varchar('username', 100).notNull(),
  password: varchar('password', 100).notNull(),
  studentId: varchar('student_id', 50).notNull(),
  bId: varchar('b_id', 50), // 外鍵指向 BED
  phone: varchar('phone', 20),
  email: varchar('email', 100),
  dormId: varchar('dorm_id', 50).notNull(),
  dueDate: date('due_date'),
});

// BED 表
const bed = pgTable('bed', {
  bId: varchar('b_id', 50).primaryKey(),
  dormId: varchar('dorm_id', 50).notNull(),
  ssn: varchar('ssn', 50), // 外鍵指向 USER
  password: varchar('password', 100),
  roomNumber: varchar('room_number', 50).notNull(),
});

// MOVE_RECORD 表
const moveRecord = pgTable('move_record', {
  ssn: varchar('ssn', 50).notNull().references(() => user.ssn), // 外鍵指向 USER
  bId: varchar('b_id', 50).notNull().references(() => bed.bId), // 外鍵指向 BED
  moveInDate: date('move_in_date').notNull(),
  moveOutDate: date('move_out_date'),
});

// MOVE_APPLICATION 表
const moveApplication = pgTable('move_application', {
  ssn: varchar('ssn', 50).notNull().references(() => user.ssn), // 外鍵指向 USER
  applyId: serial('apply_id').primaryKey(),
  semester: varchar('semester', 20).notNull(),
  dormId: varchar('dorm_id', 50).notNull(),
  applyTime: timestamp('apply_time').defaultNow(),
  status: varchar('status', 20).notNull(),
});

// SNACK_RECORD 表
const snackRecord = pgTable('snack_record', {
  ssn: varchar('ssn', 50).notNull().references(() => user.ssn), // 外鍵指向 USER
  semester: varchar('semester', 20).notNull(),
  dormId: varchar('dorm_id', 50).notNull(),
});

// SNACK_OPTION 表
const snackOption = pgTable('snack_option', {
  ssn: varchar('ssn', 50).notNull().references(() => user.ssn), // 外鍵指向 USER
  semester: varchar('semester', 20).notNull(),
  dormId: varchar('dorm_id', 50).notNull(),
  sName: varchar('s_name', 100).notNull(),
});

// FACILITY 表
const facility = pgTable('facility', {
  fId: serial('f_id').primaryKey(),
  fName: varchar('f_name', 100).notNull(),
  dormId: varchar('dorm_id', 50).notNull(),
  forRent: boolean('for_rent').notNull(),
  underMaintenance: boolean('under_maintenance').notNull(),
});

// BOOK_RECORD 表
const bookRecord = pgTable('book_record', {
  ssn: varchar('ssn', 50).notNull().references(() => user.ssn), // 外鍵指向 USER
  fId: integer('f_id').notNull().references(() => facility.fId), // 外鍵指向 FACILITY
  isCancelled: boolean('is_cancelled').default(false),
  bookTime: timestamp('book_time').defaultNow(),
});

// MAINTENANCE_RECORD 表
const maintenanceRecord = pgTable('maintenance_record', {
  ssn: varchar('ssn', 50).notNull().references(() => user.ssn), // 外鍵指向 USER
  description: text('description').notNull(),
  fixedDate: date('fixed_date'),
  isFinished: boolean('is_finished').default(false),
});

module.exports = {
  admin,
  user,
  bed,
  moveRecord,
  moveApplication,
  snackRecord,
  snackOption,
  facility,
  bookRecord,
  maintenanceRecord,
};
