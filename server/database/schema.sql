CREATE DATABASE IF NOT EXISTS react_mysql_db;
USE react_mysql_db;

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create an admin user (password: admin123)
INSERT INTO users (name, email, password, role)
VALUES (
  'Admin User',
  'admin@example.com',
  '$2a$10$X7UrH5YxX5YxX5YxX5YxX.5YxX5YxX5YxX5YxX5YxX5YxX5YxX5Yx',
  'admin'
) ON DUPLICATE KEY UPDATE id=id; 