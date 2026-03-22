-- Ambience Studio MySQL Setup
CREATE DATABASE IF NOT EXISTS ambience_studio CHARACTER SET utf8mb4;
USE ambience_studio;

CREATE TABLE IF NOT EXISTS employees (
  id VARCHAR(36) NOT NULL DEFAULT (UUID()),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(30),
  password_hash VARCHAR(255) NOT NULL,
  role ENUM("Photographer","Editor","Assistant","admin") NOT NULL DEFAULT "Photographer",
  bio TEXT,
  specialties JSON,
  cover_url VARCHAR(500),
  avatar_url VARCHAR(500),
  visible_public TINYINT(1) NOT NULL DEFAULT 0,
  status ENUM("active","inactive") NOT NULL DEFAULT "active",
  join_date DATE NOT NULL,
  last_login_at DATETIME,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id), INDEX idx_visible (visible_public), INDEX idx_role (role)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS portfolio_items (
  id VARCHAR(36) NOT NULL DEFAULT (UUID()),
  employee_id VARCHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  media_url VARCHAR(500) NOT NULL,
  visibility ENUM("public","private") NOT NULL DEFAULT "public",
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id), FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS salaries (
  id VARCHAR(36) NOT NULL DEFAULT (UUID()),
  employee_id VARCHAR(36) NOT NULL,
  base_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  allowances DECIMAL(10,2) NOT NULL DEFAULT 0,
  deductions DECIMAL(10,2) NOT NULL DEFAULT 0,
  cycle ENUM("weekly","bi-weekly","monthly") NOT NULL DEFAULT "monthly",
  effective_from DATE NOT NULL,
  effective_to DATE,
  created_by VARCHAR(36) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id), FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS payslips (
  id VARCHAR(36) NOT NULL DEFAULT (UUID()),
  employee_id VARCHAR(36) NOT NULL,
  period_from DATE NOT NULL, period_to DATE NOT NULL,
  pdf_url VARCHAR(500) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id), FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS tasks (
  id VARCHAR(36) NOT NULL DEFAULT (UUID()),
  assignee_id VARCHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  target_type ENUM("booking","event","ops") NOT NULL,
  target_id VARCHAR(36),
  start_at DATETIME NOT NULL, end_at DATETIME,
  priority ENUM("normal","high") NOT NULL DEFAULT "normal",
  status ENUM("pending","confirmed","in-progress","done","cancelled") NOT NULL DEFAULT "pending",
  note TEXT, created_by VARCHAR(36) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id), FOREIGN KEY (assignee_id) REFERENCES employees(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Default admin: password = admin123
INSERT IGNORE INTO employees (id,first_name,last_name,email,password_hash,role,visible_public,status,join_date)
VALUES ("admin-001","Studio","Admin","admin@ambience.studio",
  "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
  "admin",0,"active",CURDATE());

SELECT "Ambience Studio DB ready!" AS status;
