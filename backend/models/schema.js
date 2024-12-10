// 

const { PrimaryKey, } = require('drizzle-orm/mysql-core');
const { pgTable, varchar, text, boolean, timestamp, date, uuid, primaryKey } = require('drizzle-orm/pg-core');

// ADMIN 表
const admin = pgTable('admin', {
  ssn: varchar('ssn', 100).primaryKey(),
  dormId: varchar('dormid', 50).notNull(),
  email: varchar('email', 100),
  phone: varchar('phone', 20),
});

// USER 表
const user = pgTable('user', {
  ssn: varchar('ssn', 100).primaryKey(),
  studentId: varchar('studentid', 50).notNull(),
  bId: varchar('bid', 50).references(() => bed.bId), // 外鍵指向 BED
  department: varchar('department', 100).notNull(),
  phone: varchar('phone', 20).notNull(),
  email: varchar('email', 100).notNull(),
  dormId: varchar('dormid', 50).notNull(),
  dueDate: date('duedate'),
});

// BED 表
const bed = pgTable('bed', {
  bId: varchar('bid', 50).notNull(),
  dormId: varchar('dormid', 50).notNull(),
  ssn: varchar('ssn', 50), // 外鍵指向 USER
  roomNumber: varchar('roomnumber', 50).notNull(),
}, (table) =>{
  return{
    bed_pk: primaryKey({ columns: [table.bid, table.dormid] }),
  };
});

// MOVE_RECORD 表
const moveApplication = pgTable('move_application', {
  mid: uuid().defaultRandom().primaryKey(),
  ssn: varchar('ssn', 100).notNull().references(() => user.ssn), // 外鍵指向 USER
  originalBed: varchar('orignialbed', 50).notNull().references(() => bed.bId),
  moveInBed: varchar('moveinbed', 50).notNull().references(() => bed.bId),
  dormId: varchar('dormid', 50).notNull().references(() => bed.dormId),
  status: varchar('status', 50).notNull(),
  applyTime: timestamp('applytime', 50).defaultNow()
});

// SNACK_RECORD 表
const snackRecord = pgTable('snack_record', {
  ssn: varchar('ssn', 100).notNull().references(() => user.ssn), // 外鍵指向 USER
  semester: varchar('semester', 20).notNull().references(() => semester.semester), // 外鍵指向 SEMESTER
  dormId: varchar('dormid', 50).notNull(),
  sName: varchar('sname', 100).notNull(),
});

// SNACK_OPTION 表
const snackOption = pgTable('snack_option', {
  ssn: varchar('ssn', 100).notNull().references(() => admin.ssn), // 外鍵指向 USER
  semester: varchar('semester', 20).notNull().references(() => semester.semester), // 外鍵指向 SEMESTER
  dormId: varchar('dormid', 50).notNull(),
  sName: varchar('sname', 100).notNull(),
});

// FACILITY 表
const facility = pgTable('facility', {
  fid: uuid().defaultRandom().primaryKey(),
  fName: varchar('fname', 100).notNull(),
  dormId: varchar('dormid', 50).notNull(),
  forRent: boolean('forrent').notNull(),
  underMaintenance: boolean('undermaintenance').notNull(),
});

// BOOK_RECORD 表
const bookRecord = pgTable('book_record', {
  ssn: varchar('ssn', 100).notNull().references(() => user.ssn), // 外鍵指向 USER
  fid: uuid().defaultRandom().notNull().references(() => facility.fid), // 外鍵指向 FACILITY
  isCancelled: boolean('iscancelled').default(false),
  bookTime: timestamp('booktime').defaultNow(),
}, (table) => [primaryKey([table.fid, table.bookTime])]);

const discussionBoard = pgTable('discussion_board', {
  mesid: uuid().defaultRandom().primaryKey(),
  ssn: varchar('ssn', 100).notNull().references(() => user.ssn),
  messages: varchar('messages', 500).notNull(),
  dormId: varchar('dormid', 50).notNull(),
  sentTime: timestamp('senttime').defaultNow(),
})

// MAINTENANCE_RECORD 表
const maintenanceRecord = pgTable('maintenance_record', {
  mrId: uuid().defaultRandom().primaryKey(),
  ssn: varchar('ssn', 100).notNull().references(() => user.ssn), // 外鍵指向 USER
  dormId: varchar('dormid', 50).notNull(),
  description: text('description').notNull(),
  fixedDate: date('fixeddate'),
  isFinished: boolean('isfinished').default(false),
  applyTime: timestamp('applytime', 50).defaultNow(),
});

const semester = pgTable('semester', {  // 學期表 
  semester: varchar('semester', 20).primaryKey(), // 紀錄「年度-學期」 ex: 113-1
});

module.exports = {
  admin,
  user,
  bed,
  moveApplication,
  snackRecord,
  snackOption,
  facility,
  bookRecord,
  discussionBoard,
  maintenanceRecord,
  semester
};