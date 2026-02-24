DROP DATABASE IF EXISTS excel_ai_platform;
CREATE DATABASE excel_ai_platform
DEFAULT CHARACTER SET utf8mb4
DEFAULT COLLATE utf8mb4_unicode_ci;

USE excel_ai_platform;

-- =========================
-- USERS
-- =========================
CREATE TABLE users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  role ENUM('admin','user') NOT NULL DEFAULT 'user',
  avatar VARCHAR(10) DEFAULT 'U',
  badge VARCHAR(100),
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO users (username,password_hash,full_name,email,role) VALUES
('admin','admin123','System Admin','admin@excel.ai','admin'),
('user1','user123','Nguyen Van A','a@student.ai','user'),
('user2','user123','Tran Thi B','b@student.ai','user');

-- =========================
-- PROGRAM
-- =========================
CREATE TABLE programs (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  created_by INT UNSIGNED,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO programs (name,description,created_by)
VALUES ('Excel Cơ Bản','Chương trình dành cho người mới',1);

-- =========================
-- CONTEXT
-- =========================
CREATE TABLE contexts (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  program_id INT UNSIGNED NOT NULL,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO contexts (program_id,name,description)
VALUES (1,'Báo Cáo Doanh Thu','Thực hành theo bối cảnh kinh doanh');

-- =========================
-- TASK
-- =========================
CREATE TABLE tasks (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  context_id INT UNSIGNED NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  instructions TEXT,
  expected_answer TEXT,
  difficulty ENUM('easy','medium','hard') DEFAULT 'easy',
  exam_mode TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (context_id) REFERENCES contexts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO tasks (context_id,title,description,instructions,expected_answer,difficulty)
VALUES 
(1,'Tính Tổng Doanh Thu','Dùng SUM','Tính tổng A1:A10','=SUM(A1:A10)','easy');

-- =========================
-- ASSIGNMENT
-- =========================
CREATE TABLE assignments (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  task_id INT UNSIGNED NOT NULL,
  assigned_by INT UNSIGNED,
  start_time DATETIME,
  end_time DATETIME,
  is_exam TINYINT(1) DEFAULT 0,
  FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
  FOREIGN KEY (assigned_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO assignments (task_id,assigned_by,start_time,end_time,is_exam)
VALUES (1,1,NOW(),DATE_ADD(NOW(),INTERVAL 7 DAY),0);

-- assign user
CREATE TABLE assignment_users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  assignment_id INT UNSIGNED,
  user_id INT UNSIGNED,
  UNIQUE KEY unique_assign (assignment_id,user_id),
  FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO assignment_users (assignment_id,user_id)
VALUES (1,2),(1,3);

-- =========================
-- SESSION & SUBMISSION
-- =========================
CREATE TABLE task_sessions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED,
  task_id INT UNSIGNED,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE submissions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  session_id INT UNSIGNED,
  answer TEXT,
  score INT DEFAULT 0,
  is_correct TINYINT(1) DEFAULT 0,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES task_sessions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================
-- ERROR SYSTEM
-- =========================
CREATE TABLE error_types (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50),
  description TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO error_types (code,description) VALUES
('WRONG_CELL','Sai ô tham chiếu'),
('WRONG_FUNCTION','Sai hàm'),
('WRONG_FORMULA','Sai công thức');

CREATE TABLE submission_errors (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  submission_id INT UNSIGNED,
  error_type_id INT UNSIGNED,
  detail TEXT,
  FOREIGN KEY (submission_id) REFERENCES submissions(id) ON DELETE CASCADE,
  FOREIGN KEY (error_type_id) REFERENCES error_types(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================
-- PROGRESS
-- =========================
CREATE TABLE user_progress (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED,
  program_id INT UNSIGNED,
  completion_percent INT DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;