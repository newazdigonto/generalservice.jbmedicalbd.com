-- Run this once against your MySQL database (cPanel > phpMyAdmin, or `mysql -u ... -p dbname < sql/schema.sql`).

CREATE TABLE IF NOT EXISTS appointments (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(190) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  service VARCHAR(190) NULL,
  preferred_date VARCHAR(40) NULL,
  source_path VARCHAR(190) NULL,
  crm_synced_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
