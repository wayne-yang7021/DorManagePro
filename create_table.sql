
CREATE TABLE semester (
    semester VARCHAR(20) PRIMARY KEY
);

CREATE TABLE admin (
    ssn VARCHAR(100) PRIMARY KEY,
    dormId VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20)
);

CREATE TABLE bed (
    bId VARCHAR(50) NOT NULL,
    dormId VARCHAR(50) NOT NULL,
    ssn VARCHAR(50),
    roomNumber VARCHAR(50) NOT NULL,
    PRIMARY KEY (bId, dormId)
);

CREATE TABLE "user" (
    ssn VARCHAR(100) PRIMARY KEY,
    studentId VARCHAR(50) NOT NULL,
    bId VARCHAR(50),
    department VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    dormId VARCHAR(50) NOT NULL,
    dueDate DATE,
    CONSTRAINT fk_bed FOREIGN KEY (bId, dormId) REFERENCES bed (bId, dormId)
);

CREATE TABLE move_application (
    mId UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ssn VARCHAR(100) NOT NULL,
    originalBed VARCHAR(50) NOT NULL,
    moveInBed VARCHAR(50) NOT NULL,
    dormId VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    applyTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (ssn) REFERENCES "user" (ssn),
    CONSTRAINT fk_original_bed FOREIGN KEY (orignialBed, dormId) REFERENCES bed (bId, dormId),
    CONSTRAINT fk_move_in_bed FOREIGN KEY (moveInBed, dormId) REFERENCES bed (bId, dormId)
);

CREATE TABLE snack_record (
    ssn VARCHAR(100) NOT NULL,
    semester VARCHAR(20) NOT NULL,
    dormId VARCHAR(50) NOT NULL,
    sName VARCHAR(100) NOT NULL,
    CONSTRAINT fk_user_snack FOREIGN KEY (ssn) REFERENCES "user" (ssn),
    CONSTRAINT fk_semester FOREIGN KEY (semester) REFERENCES semester (semester)
);


CREATE TABLE snack_option (
    ssn VARCHAR(100) NOT NULL,
    dormId VARCHAR(50) NOT NULL,
	semester VARCHAR(20) NOT NULL,
    sName VARCHAR(100) NOT NULL,
    CONSTRAINT fk_admin_snack FOREIGN KEY (ssn) REFERENCES admin (ssn),
    CONSTRAINT fk_semester_snack FOREIGN KEY (semester) REFERENCES semester(semester)
);

CREATE TABLE facility (
    fId UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    fName VARCHAR(100) NOT NULL,
    dormId VARCHAR(50) NOT NULL,
    forRent BOOLEAN NOT NULL,
    underMaintenance BOOLEAN NOT NULL
);

CREATE TABLE book_record (
    ssn VARCHAR(100) NOT NULL,
    fId UUID NOT NULL,
    isCancelled BOOLEAN DEFAULT FALSE,
    bookTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (fId, bookTime),
    CONSTRAINT fk_user_book FOREIGN KEY (ssn) REFERENCES "user" (ssn),
    CONSTRAINT fk_facility FOREIGN KEY (fId) REFERENCES facility (fId)
);

CREATE TABLE maintenance_record (
    mrId UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ssn VARCHAR(100) NOT NULL,
    dormId VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    fixedDate DATE,
    isFinished BOOLEAN DEFAULT FALSE,
    applyTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_maintenance FOREIGN KEY (ssn) REFERENCES "user" (ssn)
);

CREATE TABLE discussion_board(
	mesId UUID DEFAULT gen_random_uuid() PRIMARY KEY,
	messages VARCHAR(500) NOT NULL,
	ssn VARCHAR(100) NOT NULL,
	dormId VARCHAR(50) NOT NULL,
	sentTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_user_discussion FOREIGN KEY (ssn) REFERENCES "user" (ssn)
)

