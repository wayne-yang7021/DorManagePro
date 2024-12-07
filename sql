-- ADMIN 表
COPY admin (ssn, username, password, dorm_id, email, phone)
FROM '/Users/chenyurui/Desktop/台大資管/三上課程/資料庫管理/gen_data/admin.csv' DELIMITER ',' CSV HEADER;

-- USER 表
COPY "user" (ssn, student_id, b_id, phone, email, dorm_id, due_date, sessiontoken)
FROM '/Users/chenyurui/Desktop/台大資管/三上課程/資料庫管理/gen_data/users.csv' DELIMITER ',' CSV HEADER;

-- BED 表
COPY bed (b_id, dorm_id, ssn, room_number)
FROM '/Users/chenyurui/Desktop/台大資管/三上課程/資料庫管理/gen_data/bed.csv' DELIMITER ',' CSV HEADER;

-- MOVE_RECORD 表
COPY move_record (ssn, b_id, move_in_date, move_out_date)
FROM '/Users/chenyurui/Desktop/台大資管/三上課程/資料庫管理/gen_data/move_records.csv' DELIMITER ',' CSV HEADER;

-- MOVE_APPLICATION 表
COPY move_application (ssn, apply_id, semester, dorm_id, apply_time, status)
FROM '/Users/chenyurui/Desktop/台大資管/三上課程/資料庫管理/gen_data/move_applications.csv' DELIMITER ',' CSV HEADER;

-- SNACK_RECORD 表
COPY snack_record (ssn, semester, dorm_id)
FROM '/Users/chenyurui/Desktop/台大資管/三上課程/資料庫管理/gen_data/snack_records.csv' DELIMITER ',' CSV HEADER;

-- SNACK_OPTION 表
COPY snack_option (ssn, semester, dorm_id, s_name)
FROM '/Users/chenyurui/Desktop/台大資管/三上課程/資料庫管理/gen_data/snack_options.csv' DELIMITER ',' CSV HEADER;

-- FACILITY 表
COPY facility (f_id, f_name, dorm_id, for_rent, under_maintenance)
FROM '/Users/chenyurui/Desktop/台大資管/三上課程/資料庫管理/gen_data/facilities.csv' DELIMITER ',' CSV HEADER;

-- BOOK_RECORD 表
COPY book_record (ssn, f_id, is_cancelled, book_time)
FROM '/Users/chenyurui/Desktop/台大資管/三上課程/資料庫管理/gen_data/book_records.csv' DELIMITER ',' CSV HEADER;

-- MAINTENANCE_RECORD 表
COPY maintenance_record (ssn, description, fixed_date, is_finished)
FROM '/Users/chenyurui/Desktop/台大資管/三上課程/資料庫管理/gen_data/maintenance_records.csv' DELIMITER ',' CSV HEADER;


-- ADMIN 表
CREATE TABLE admin (
  ssn VARCHAR(100) PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  dorm_id VARCHAR(50) NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(20)
);

-- USER 表
CREATE TABLE "user" (
  ssn VARCHAR(100) PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL,
  b_id VARCHAR(50),
  phone VARCHAR(20),
  email VARCHAR(100),
  dorm_id VARCHAR(50) NOT NULL,
  due_date DATE,
  sessiontoken TEXT
);

-- BED 表
CREATE TABLE bed (
  b_id VARCHAR(50) PRIMARY KEY,
  dorm_id VARCHAR(50) NOT NULL,
  ssn VARCHAR(50),
  room_number VARCHAR(50) NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY (ssn) REFERENCES "user" (ssn)
);

-- MOVE_RECORD 表
CREATE TABLE move_record (
  ssn VARCHAR(100) NOT NULL,
  b_id VARCHAR(50) NOT NULL,
  move_in_date DATE NOT NULL,
  move_out_date DATE,
  CONSTRAINT fk_move_user FOREIGN KEY (ssn) REFERENCES "user" (ssn),
  CONSTRAINT fk_move_bed FOREIGN KEY (b_id) REFERENCES bed (b_id)
);

-- MOVE_APPLICATION 表
CREATE TABLE move_application (
  ssn VARCHAR(100) NOT NULL,
  apply_id SERIAL PRIMARY KEY,
  semester VARCHAR(20) NOT NULL,
  dorm_id VARCHAR(50) NOT NULL,
  apply_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) NOT NULL,
  CONSTRAINT fk_application_user FOREIGN KEY (ssn) REFERENCES "user" (ssn)
);

-- SNACK_RECORD 表
CREATE TABLE snack_record (
  ssn VARCHAR(100) NOT NULL,
  semester VARCHAR(20) NOT NULL,
  dorm_id VARCHAR(50) NOT NULL,
  CONSTRAINT fk_snack_user FOREIGN KEY (ssn) REFERENCES "user" (ssn)
);

-- SNACK_OPTION 表
CREATE TABLE snack_option (
  ssn VARCHAR(100) NOT NULL,
  semester VARCHAR(20) NOT NULL,
  dorm_id VARCHAR(50) NOT NULL,
  s_name VARCHAR(100) NOT NULL,
  CONSTRAINT fk_option_user FOREIGN KEY (ssn) REFERENCES "user" (ssn)
);

-- FACILITY 表
CREATE TABLE facility (
  f_id SERIAL PRIMARY KEY,
  f_name VARCHAR(100) NOT NULL,
  dorm_id VARCHAR(50) NOT NULL,
  for_rent BOOLEAN NOT NULL,
  under_maintenance BOOLEAN NOT NULL
);

-- BOOK_RECORD 表
CREATE TABLE book_record (
  ssn VARCHAR(100) NOT NULL,
  f_id INTEGER NOT NULL,
  is_cancelled BOOLEAN DEFAULT FALSE,
  book_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_book_user FOREIGN KEY (ssn) REFERENCES "user" (ssn),
  CONSTRAINT fk_book_facility FOREIGN KEY (f_id) REFERENCES facility (f_id)
);

-- MAINTENANCE_RECORD 表
CREATE TABLE maintenance_record (
  ssn VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  fixed_date DATE,
  is_finished BOOLEAN DEFAULT FALSE,
  CONSTRAINT fk_maintenance_user FOREIGN KEY (ssn) REFERENCES "user" (ssn)
);
