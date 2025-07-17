-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gpm_project
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `all_projects`
--

DROP TABLE IF EXISTS `all_projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `all_projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_name` varchar(100) DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT NULL,
  `level` enum('Central','State','District') DEFAULT NULL,
  `description` text DEFAULT NULL,
  `project_url` varchar(255) DEFAULT NULL,
  `implemented_in_dist` enum('Yes','No') DEFAULT NULL,
  `dist_login_avl` enum('Yes','No') DEFAULT NULL,
  `nodal_office` varchar(255) DEFAULT NULL,
  `nodal_contact_no` varchar(20) DEFAULT NULL,
  `dio_id_avl` enum('Yes','No') DEFAULT NULL,
  `dio_id` varchar(100) DEFAULT NULL,
  `manpower_avl` enum('Yes','No') DEFAULT NULL,
  `mp_name` varchar(100) DEFAULT NULL,
  `mp_post` varchar(100) DEFAULT NULL,
  `mp_contact_no` varchar(20) DEFAULT NULL,
  `spc_name` varchar(100) DEFAULT NULL,
  `handling_officer` varchar(100) DEFAULT NULL,
  `contact_no` varchar(20) DEFAULT NULL,
  `district_name` varchar(100) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `all_projects`
--

/*!40000 ALTER TABLE `all_projects` DISABLE KEYS */;
INSERT INTO `all_projects` VALUES (6,'Digital Learning Portal','Active','District','Running smoothly in 30 districts','localhost://school.com','Yes','Yes','District IT Cell','9876543210','Yes','DIO123','Yes','Rajeev Mehta','IT Assistant','9988776655','Sunita Sharma','Amit Verma','9123456789','hyderabad','Running smoothly in 30 districts','2025-05-25 03:28:51','2025-05-25 04:41:58'),(7,'eHealth Card System','Inactive','State','Health card issuance system for tracking medical records.','','Yes','No','Health Dept HQ','9876501234','No','','No','','','','Dr. Pooja Nair','Karan Malhotra','9876543210','Raipur','On hold due to technical updates','2025-05-25 03:28:51','2025-06-15 05:54:32'),(8,'school project','Inactive','Central','this is school management system','localhost://school.com','Yes','Yes','Thakur','961234568','No','','No','','','','NA','NA','961234568','Mungeli','testing','2025-05-25 03:31:56','2025-06-15 05:54:43'),(9,'Digital Learning Portal','Active','Central','this is running project','localhost://school.com','Yes','No','','','Yes','DIO123','No','','','','Dr. Pooja Nair','Karan Malhotra','9876543210','hyderabad','sdgfghfg','2025-05-25 06:39:56','2025-05-25 06:39:56');
/*!40000 ALTER TABLE `all_projects` ENABLE KEYS */;

--
-- Table structure for table `contact_details`
--

DROP TABLE IF EXISTS `contact_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(100) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_details`
--

/*!40000 ALTER TABLE `contact_details` DISABLE KEYS */;
INSERT INTO `contact_details` VALUES (8,'HARISH KUMAR','hk@gmail.com','password','share the new password with me','2025-06-12 04:23:27','2025-06-12 04:23:27'),(10,'Erick_Dare93','Susana93@hotmail.com','testing by sagar','testing 12343','2025-06-15 06:43:52','2025-06-15 06:43:52');
/*!40000 ALTER TABLE `contact_details` ENABLE KEYS */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `district_name` varchar(100) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` enum('active','inactive') DEFAULT 'active',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Test User','test@gmail.com','hyderabad','uploads\\avatars\\avatar-1749966805657-475929732.png','$2a$10$iVPp9FHBxLpng9VEErEEgOf/Lfnhm2.eSY69KzLbYJza.nahKSdDq','user','2025-05-23 11:28:35','2025-07-17 04:15:07','active'),(3,'Admin','admin@gmail.com','Raipur123','uploads\\avatars\\avatar-1748446615954-235424578.jpg','$2a$10$rOWfsNADvdAjR2E4tNxGB.PkJHfKKO255Ujp1upZ0L6a4sMcZpwPy','admin','2025-05-23 11:30:21','2025-06-22 15:25:24','active'),(22,'Bahadur','bahadur@gmail.com','Mungeli',NULL,'$2a$10$f7fh3Zy5djVxZbmFeO9XHOzYBbcvaeZDuyBaVtmbQUTXkuUjLG6gO','user','2025-05-25 09:09:23','2025-05-25 09:09:57','active');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

--
-- Dumping routines for database 'gpm_project'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-17  9:49:56
