CREATE DATABASE IF NOT EXISTS gpm_project;
USE gpm_project;

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  district_name VARCHAR(100),
  profile_picture VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS all_projects (
    id INT AUTO_INCREMENT PRIMARY KEY,                 -- Sr. No.
    name VARCHAR(255),                                 -- Project
    status ENUM('Active', 'Inactive'),                 -- Status (Active / Inactive)
    level ENUM('Central', 'State', 'District'),        -- Project Level
    description TEXT,                                  -- Project Desc
    url VARCHAR(512),                                  -- URL
    implemented_in_dist ENUM('Yes', 'No'),             -- Implemented In District

    dist_login_avl ENUM('Yes', 'No'),                  -- District Login Available (Yes/No)
    nodal_office VARCHAR(255),                         -- Nodal Office
    nodal_contact_no VARCHAR(20),                      -- Contact No. of Nodal Office

    dio_id_avl ENUM('Yes', 'No'),                      -- DIO ID AVL
    dio_id VARCHAR(100),                               -- DIO ID

    manpower_avl ENUM('Yes', 'No'),                    -- Manpower AVL in District
    mp_name VARCHAR(100),                              -- Manpower Name
    mp_post VARCHAR(100),                              -- Manpower Post
    mp_contact_no VARCHAR(20),                         -- Manpower Contact No.

    spc_name VARCHAR(100),                             -- State Project Coordinator
    handling_officer VARCHAR(100),                     -- Handling Officer
    contact_no VARCHAR(20),                            -- General Contact No
    district_name VARCHAR(100),                        -- District Name
    remarks TEXT                                       -- Remarks
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Create an admin user (password: admin123)
INSERT INTO users (name, email, password, role, district_name)
VALUES (
  'Admin User',
  'admin@gmail.com',
  '$2a$10$X7UrH5YxX5YxX5YxX5YxX.5YxX5YxX5YxX5YxX5YxX5YxX5YxX5Yx',
  'admin',
  'Hyderabad'
) ON DUPLICATE KEY UPDATE id=id; 

INSERT INTO all_projects (
    name, status, level, description, url, implemented_in_dist,
    dist_login_avl, nodal_office, nodal_contact_no, dio_id_avl,
    dio_id, manpower_avl, mp_name, mp_post, mp_contact_no,
    spc_name, handling_officer, contact_no, district_name, remarks
) VALUES
(
    'Digital Learning Portal', 'Active', 'Central', 'A portal to provide free online courses to students.',
    'https://learning.gov.in', 'Yes', 'Yes', 'District IT Cell', '9876543210', 'Yes',
    'DIO123', 'Yes', 'Rajeev Mehta', 'IT Assistant', '9988776655',
    'Sunita Sharma', 'Amit Verma', '9123456789', 'hyderabad', 'Running smoothly in 30 districts'
),
(
    'eHealth Card System', 'Inactive', 'State', 'Health card issuance system for tracking medical records.',
    'https://healthcard.in', 'No', 'No', 'Health Dept HQ', '9876501234', 'No',
    NULL, 'No', NULL, NULL, NULL,
    'Dr. Pooja Nair', 'Karan Malhotra', '9876543210', 'raipur', 'On hold due to technical updates'
);