-- Run this once against your MySQL database (cPanel > phpMyAdmin, or `mysql -u ... -p dbname < sql/schema.sql`).
-- Safe to re-run: every statement is IF NOT EXISTS.

CREATE TABLE IF NOT EXISTS appointments (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(190) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  service VARCHAR(190) NULL,
  preferred_date VARCHAR(40) NULL,
  type ENUM('appointment', 'test') NOT NULL DEFAULT 'appointment',
  source_path VARCHAR(190) NULL,
  crm_synced_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_created_at (created_at),
  INDEX idx_type (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- If you already created the appointments table before the `type` column
-- existed, run this once instead (it is safe to run even if the column is
-- already there — MySQL/MariaDB will just report an error you can ignore):
--   ALTER TABLE appointments ADD COLUMN type ENUM('appointment', 'test') NOT NULL DEFAULT 'appointment' AFTER preferred_date;
--   ALTER TABLE appointments ADD INDEX idx_type (type);

CREATE TABLE IF NOT EXISTS admin_users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(60) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('administrator', 'admin', 'staff') NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS doctors (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(190) NOT NULL,
  category VARCHAR(190) NOT NULL,
  details TEXT NULL,
  photo_url VARCHAR(255) NULL,
  created_by INT UNSIGNED NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  CONSTRAINT fk_doctors_created_by FOREIGN KEY (created_by)
    REFERENCES admin_users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- There is no default admin login. Create the first one from the server
-- Terminal after deploying (see CPANEL-DEPLOY.txt):
--   node scripts/create-admin-user.mjs <username> <password> administrator
