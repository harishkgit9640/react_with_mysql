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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `all_projects`
--

/*!40000 ALTER TABLE `all_projects` DISABLE KEYS */;
INSERT INTO `all_projects` VALUES (6,'Digital Learning Portal','Active','District','Running smoothly in 30 districts','localhost://school.com','Yes','Yes','District IT Cell','9876543210','Yes','DIO123','Yes','Rajeev Mehta','IT Assistant','9988776655','Sunita Sharma','Amit Verma','9123456789','hyderabad','Running smoothly in 30 districts','2025-05-25 03:28:51','2025-05-28 06:43:01'),(7,'eHealth Card System','Inactive','State','Health card issuance system for tracking medical records.','','Yes','No','Health Dept HQ','9876501234','No','','No','','','','Dr. Pooja Nair','Karan Malhotra','9876543210','Raipur','On hold due to technical updates','2025-05-25 03:28:51','2025-05-28 06:55:11'),(8,'school project','Inactive','Central','this is school management system','localhost://school.com','Yes','Yes','Thakur','961234568','No','','No','','','','NA','NA','961234568','channai','testing','2025-05-25 03:31:56','2025-05-26 04:23:00');
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_details`
--

/*!40000 ALTER TABLE `contact_details` DISABLE KEYS */;
INSERT INTO `contact_details` VALUES (1,'Harish','hk@gmail.com','testing','I am harish. testing....','2025-05-27 04:15:48','2025-05-27 04:15:48');
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Test User','test@gmail.com','Raipur','assets\\uploads\\1748007124198-image-1.jpg','$2a$10$99OzAH7sLL5vfAVleBs4peCe/yxfApUFrV9z5bJDWD8OkluP65F9W','user','2025-05-23 11:28:35','2025-05-28 06:41:04','active'),(3,'Admin','admin@gmail.com','Raipur123','uploads\\avatars\\avatar-1748319469624-982782821.jpg','$2a$10$f9vytIXwZjAhiLO49BtKL.SF7HsqrpSNL1TxLR7cmchrNf.WqcQoa','admin','2025-05-23 11:30:21','2025-05-27 04:17:49','active'),(5,'ram ram','Alexandre_Huels@yahoo.com','Clemmieton',NULL,'$2a$10$H2.OfWBBVBSSubMGSHeye.EHxw0Vzm6MnsCpYcvDLhVsjIpNGqdK.','user','2025-05-23 12:04:33','2025-05-26 04:22:38','inactive'),(6,'Linnea78','Fae.Metz@yahoo.com','East Alexysbury',NULL,'$2a$10$OJnh0yOwgJXaAUTzJMBnz.lYDIPndNhYm2cjuarsMTXpk2TqZOpMu','user','2025-05-23 12:07:09','2025-05-26 04:22:39','inactive'),(7,'Mae65','Will30@yahoo.com','Antelope',NULL,'$2a$10$Q6qTdMlAIBgW.bpW77z4h.aQQYRgjXlp2Y0e9fqGInHXmRDVGzNfW','user','2025-05-23 12:07:51','2025-05-23 12:07:51','active'),(8,'Louvenia64','Fletcher88@hotmail.com','Blue Springs',NULL,'$2a$10$oMVf8O3YWQw3wRAio6xua.720XaqV6Rf69ozb/MZZi8PO1HEg.rYi','user','2025-05-23 12:08:50','2025-05-26 04:22:36','inactive'),(9,'Donnie','Glenda_Johns@gmail.com','Bhilai',NULL,'$2a$10$AzuYzIPGA1jH.hXR7D7KHetAW6rgBXRtVIsjCJ/p0ICbySJ6Y4AlG','user','2025-05-23 12:08:52','2025-05-26 04:22:35','inactive'),(11,'Triston_Wiza','Lamont_Rutherford@hotmail.com','East Brielle',NULL,'$2a$10$s/XLnjXC8D8xKd8oEh.pRuNuTzwn7psLO50vdMWwLuAoXEUVBPfm6','user','2025-05-23 12:32:56','2025-05-23 12:32:56','active'),(12,'Naomi7','Sophie.Hauck@gmail.com','Berkeley',NULL,'$2a$10$/IIWsF9CWYEO76f735bWeufgBN3EhGHtZC5a4HGOWGVEnTqvxkSzC','user','2025-05-23 12:34:02','2025-05-23 12:35:33','inactive'),(14,'Joanne','Mckayla32@gmail.com','Delhi',NULL,'$2a$10$B3s4SU2dA/Ggbfnsuu01Pea.Q0Xw5vYcfHoOQ8XalJ1.rOY6tIkoC','user','2025-05-23 12:53:43','2025-05-25 00:46:50','active'),(17,'Anya.Johnston83','Dustin.Abernathy74@hotmail.com','Matildaside',NULL,'$2a$10$nb302z8g.ka9uoYCGUtaOOAXiTR/eyazdQgE/zhGDlfw3cjufWAXu','user','2025-05-25 02:02:54','2025-05-25 02:02:54','active'),(18,'Harish Kumar','h.sahu@ledflexgroup.com','Hyderabad','uploads\\avatars\\avatar-1748319948223-933428516.jpg','$2a$10$0kOZewoKSoB5/o6NpTM2TuEZd6Vf1ogm0GrQPRXMufQ6EyFnV9T1m','user','2025-05-26 04:23:53','2025-05-27 04:46:40','active');
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

-- Dump completed on 2025-05-28 13:10:08
