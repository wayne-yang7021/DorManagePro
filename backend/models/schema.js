const { PrimaryKey } = require('drizzle-orm/mysql-core');
const { pgTable, varchar, text, boolean, timestamp, date } = require('drizzle-orm/pg-core');

// ADMIN 表
const admin = pgTable('admin', {
  ssn: varchar('ssn', 100).primaryKey(),
  dormId: varchar('dormId', 50).notNull(),
  email: varchar('email', 100),
  phone: varchar('phone', 20),
});

// USER 表
const user = pgTable('user', {
  ssn: varchar('ssn', 100).primaryKey(),
  studentId: varchar('studentId', 50).notNull(),
  bId: varchar('bId', 50).references(() => bed.bId), // 外鍵指向 BED
  department: varchar('department', 100).notNull(),
  phone: varchar('phone', 20).notNull(),
  email: varchar('email', 100).notNull(),
  dormId: varchar('dormId', 50).notNull(),
  dueDate: date('dueDate'),
  sessionToken: text('sessionToken'), // 用於存儲會話令牌
});

// BED 表
const bed = pgTable('bed', {
  bId: varchar('bId', 50).notNull(),
  dormId: varchar('dormId', 50).notNull(),
  ssn: varchar('ssn', 50), // 外鍵指向 USER
  roomNumber: varchar('roomNumber', 50).notNull(),
}, (table) =>{
  return{
    bed_pk: primaryKey({ columns: [table.bId, table.dormId] }),
  };
});

// MOVE_RECORD 表
const moveApplication = pgTable('move_application', {
  mId: uuid().defaultRandom().primaryKey(),
  ssn: varchar('ssn', 100).notNull().references(() => user.ssn), // 外鍵指向 USER
  orignialBed: varchar('originalBed', 50).notNull().references(() => bed.bId),
  moveInBed: varchar('originalBed', 50).notNull().references(() => bed.bId),
  dormId: varchar('dormId', 50).notNull().references(() => bed.dormId),
  status: varchar('status', 50).notNull(),
  applyTime: timestamp('applyTime', 50).defaultNow()
});

// SNACK_RECORD 表
const snackRecord = pgTable('snack_record', {
  ssn: varchar('ssn', 100).notNull().references(() => user.ssn), // 外鍵指向 USER
  semester: varchar('semester', 20).notNull().references(() => semester.semester), // 外鍵指向 SEMESTER
  dormId: varchar('dormId', 50).notNull(),
  sName: varchar('sName', 100).notNull(),
});

// SNACK_OPTION 表
const snackOption = pgTable('snack_option', {
  ssn: varchar('ssn', 100).notNull().references(() => admin.ssn), // 外鍵指向 USER
  semester: varchar('semester', 20).notNull().references(() => semester.semester), // 外鍵指向 SEMESTER
  dormId: varchar('dormId', 50).notNull(),
  sName: varchar('sName', 100).notNull(),
});

// FACILITY 表
const facility = pgTable('facility', {
  fId: uuid().defaultRandom().primaryKey(),
  fName: varchar('fName', 100).notNull(),
  dormId: varchar('dormId', 50).notNull(),
  forRent: boolean('forRent').notNull(),
  underMaintenance: boolean('underMaintenance').notNull(),
});

// BOOK_RECORD 表
const bookRecord = pgTable('book_record', {
  ssn: varchar('ssn', 100).notNull().references(() => user.ssn), // 外鍵指向 USER
  fId: uuid().defaultRandom().notNull().references(() => facility.fId), // 外鍵指向 FACILITY
  isCancelled: boolean('isCancelled').default(false),
  bookTime: timestamp('book_time').defaultNow(),
}, (table) => {
  return{
    bookRecord_pk: PrimaryKey([table.ssn, table.fId])
  }
});

// MAINTENANCE_RECORD 表
const maintenanceRecord = pgTable('maintenance_record', {
  mrId: uuid().defaultRandom().primaryKey(),
  ssn: varchar('ssn', 100).notNull().references(() => user.ssn), // 外鍵指向 USER
  dormId: varchar('dormId', 50).notNull(),
  description: text('description').notNull(),
  fixedDate: date('fixedDate'),
  isFinished: boolean('isFinished').default(false),
  applyTime: timestamp('applyTime', 50).defaultNow(),
});

const semester = pgTable('semester', {  // 學期表 
  semester: varchar('semester', 20).primaryKey(), // 紀錄「年度-學期」 ex: 113-1
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
  semester
};