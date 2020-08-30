-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: movie_guru
-- ------------------------------------------------------
-- Server version	8.0.18

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
-- Table structure for table `actors`
--

DROP TABLE IF EXISTS `actors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actors` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `actor_name` char(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=30030 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actors`
--

LOCK TABLES `actors` WRITE;
/*!40000 ALTER TABLE `actors` DISABLE KEYS */;
INSERT INTO `actors` VALUES (30000,'Leonardo DiCaprio'),(30001,'Jonah Hill'),(30002,'Margot Robbie'),(30003,'Robert De Niro'),(30004,'Jodie Foster'),(30005,'Cybill Shepherd'),(30006,'Ray Liotta'),(30007,'Joe Pesci'),(30008,'Kevin Costner'),(30009,'Sean Connery'),(30010,'Christopher Walken'),(30011,'John Cazale'),(30012,'Cathy Moriarty'),(30013,'Ralph Fiennes'),(30014,'Uma Thurman'),(30015,'Harrison Ford'),(30016,'Alison Doody'),(30017,'Tommy Lee Jones'),(30018,'Javier Bardem'),(30019,'Josh Brolin'),(30020,'Al Pacino'),(30021,'Michelle Pfeiffer'),(30022,'Steven Bauer'),(30023,'Mickey Rourke'),(30024,'John Lone'),(30025,'Ariane'),(30026,'Marisa Tomei'),(30027,'Ralph Macchio'),(30028,'Jason Stratham'),(30029,'Andre Benjamin');
/*!40000 ALTER TABLE `actors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorizes`
--

DROP TABLE IF EXISTS `categorizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorizes` (
  `genreID` int(11) NOT NULL,
  `movieID` int(11) NOT NULL,
  PRIMARY KEY (`genreID`,`movieID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorizes`
--

LOCK TABLES `categorizes` WRITE;
/*!40000 ALTER TABLE `categorizes` DISABLE KEYS */;
INSERT INTO `categorizes` VALUES (50000,20000),(50000,20002),(50000,20005),(50001,20000),(50001,20001),(50001,20002),(50001,20003),(50002,20000),(50002,20001),(50002,20002),(50002,20003),(50002,20004),(50002,20005),(50003,20003),(50004,20004),(50005,20005),(50006,20006),(50006,20007),(50007,20006),(50007,20007),(50008,20006);
/*!40000 ALTER TABLE `categorizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `directors`
--

DROP TABLE IF EXISTS `directors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `directors` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `director_name` char(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=40009 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `directors`
--

LOCK TABLES `directors` WRITE;
/*!40000 ALTER TABLE `directors` DISABLE KEYS */;
INSERT INTO `directors` VALUES (40000,'Martin Scorsese'),(40001,'Brian De Palma'),(40002,'Michael Cimino'),(40003,'Jeremiah S. Chechik'),(40004,'Steven Spielberg'),(40005,'Ethan Coen'),(40006,'Joel Coen'),(40007,'Jonathan Lynn'),(40008,'Guy Ritchie');
/*!40000 ALTER TABLE `directors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `directs`
--

DROP TABLE IF EXISTS `directs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `directs` (
  `directorID` int(11) NOT NULL,
  `movieID` int(11) NOT NULL,
  PRIMARY KEY (`directorID`,`movieID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `directs`
--

LOCK TABLES `directs` WRITE;
/*!40000 ALTER TABLE `directs` DISABLE KEYS */;
INSERT INTO `directs` VALUES (40000,20000),(40000,20001),(40000,20002),(40000,20005),(40001,20003),(40001,20009),(40002,20004),(40002,20010),(40003,20006),(40004,20007),(40005,20008),(40006,20008),(40007,20011),(40008,20012);
/*!40000 ALTER TABLE `directs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `genre_name` char(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=50009 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (50000,'Biography'),(50001,'Crime'),(50002,'Drama'),(50003,'Thriller'),(50004,'War'),(50005,'Sport'),(50006,'Action'),(50007,'Adventure'),(50008,'Sci-Fi');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` int(11) NOT NULL,
  `length` int(11) NOT NULL,
  `certificate` char(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avg_rating` decimal(2,1) DEFAULT NULL,
  `ratings_count` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=20013 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (20000,'The Wolf of Wall Street',2014,180,'18',4.0,2),(20001,'Taxi Driver',1976,114,'18',NULL,NULL),(20002,'Goodfellas',1990,146,'18',5.0,1),(20003,'The Untouchables',1987,119,'15',4.0,1),(20004,'The Deer Hunter',1979,183,'18',4.0,1),(20005,'Raging Bull',1981,129,'18',5.0,1),(20006,'The Avengers',1998,89,'12',NULL,NULL),(20007,'Indiana Jones and the Last Crusade',1989,127,'PG',3.0,1),(20008,'No Country for Old Men',2008,122,'15',3.0,1),(20009,'Scarface',1984,170,'18',5.0,1),(20010,'Year of the Dragon',1985,134,'18',5.0,1),(20011,'My Cousin Vinny',1992,120,'15',5.0,1),(20012,'Revolver',2005,111,'15',5.0,1);
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rates`
--

DROP TABLE IF EXISTS `rates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rates` (
  `viewerID` int(11) NOT NULL,
  `movieID` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`viewerID`,`movieID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rates`
--

LOCK TABLES `rates` WRITE;
/*!40000 ALTER TABLE `rates` DISABLE KEYS */;
INSERT INTO `rates` VALUES (10000,20000,4,'2020-08-10'),(10000,20002,5,'2020-08-22'),(10000,20003,4,'2020-08-21'),(10000,20004,4,'2020-07-22'),(10000,20005,5,'2020-07-29'),(10000,20007,3,'2020-07-25'),(10000,20008,3,'2020-08-26'),(10001,20003,4,'2020-08-28'),(10003,20000,4,'2020-07-24'),(10003,20009,5,'2020-08-22'),(10003,20010,5,'2020-07-20'),(10003,20011,5,'2020-07-14'),(10003,20012,5,'2020-06-26');
/*!40000 ALTER TABLE `rates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stars_in`
--

DROP TABLE IF EXISTS `stars_in`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stars_in` (
  `actorID` int(11) NOT NULL,
  `movieID` int(11) NOT NULL,
  PRIMARY KEY (`actorID`,`movieID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stars_in`
--

LOCK TABLES `stars_in` WRITE;
/*!40000 ALTER TABLE `stars_in` DISABLE KEYS */;
INSERT INTO `stars_in` VALUES (30000,20000),(30001,20000),(30002,20000),(30003,20001),(30003,20002),(30003,20004),(30003,20005),(30004,20001),(30005,20001),(30006,20002),(30006,20012),(30007,20002),(30007,20005),(30007,20011),(30008,20003),(30009,20003),(30009,20006),(30009,20007),(30010,20004),(30011,20004),(30012,20005),(30013,20006),(30014,20006),(30015,20007),(30016,20007),(30017,20008),(30018,20008),(30019,20008),(30020,20009),(30021,20009),(30022,20009),(30023,20010),(30024,20010),(30025,20010),(30026,20011),(30027,20011),(30028,20012),(30029,20012);
/*!40000 ALTER TABLE `stars_in` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `under_15_movies`
--

DROP TABLE IF EXISTS `under_15_movies`;
/*!50001 DROP VIEW IF EXISTS `under_15_movies`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `under_15_movies` AS SELECT 
 1 AS `ID`,
 1 AS `title`,
 1 AS `year`,
 1 AS `length`,
 1 AS `certificate`,
 1 AS `avg_rating`,
 1 AS `ratings_count`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `under_18_movies`
--

DROP TABLE IF EXISTS `under_18_movies`;
/*!50001 DROP VIEW IF EXISTS `under_18_movies`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `under_18_movies` AS SELECT 
 1 AS `ID`,
 1 AS `title`,
 1 AS `year`,
 1 AS `length`,
 1 AS `certificate`,
 1 AS `avg_rating`,
 1 AS `ratings_count`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `viewers`
--

DROP TABLE IF EXISTS `viewers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viewers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` char(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` char(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birth_date` date NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=10004 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viewers`
--

LOCK TABLES `viewers` WRITE;
/*!40000 ALTER TABLE `viewers` DISABLE KEYS */;
INSERT INTO `viewers` VALUES (10000,'user 1','testP1','1981-12-31'),(10001,'user 2','testP2','2004-12-31'),(10002,'user 3','testP3','2009-12-31'),(10003,'user 4','testP4','1991-12-31');
/*!40000 ALTER TABLE `viewers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `under_15_movies`
--

/*!50001 DROP VIEW IF EXISTS `under_15_movies`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `under_15_movies` AS select `movies`.`ID` AS `ID`,`movies`.`title` AS `title`,`movies`.`year` AS `year`,`movies`.`length` AS `length`,`movies`.`certificate` AS `certificate`,`movies`.`avg_rating` AS `avg_rating`,`movies`.`ratings_count` AS `ratings_count` from `movies` where (`movies`.`certificate` not in ('18','15')) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `under_18_movies`
--

/*!50001 DROP VIEW IF EXISTS `under_18_movies`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `under_18_movies` AS select `movies`.`ID` AS `ID`,`movies`.`title` AS `title`,`movies`.`year` AS `year`,`movies`.`length` AS `length`,`movies`.`certificate` AS `certificate`,`movies`.`avg_rating` AS `avg_rating`,`movies`.`ratings_count` AS `ratings_count` from `movies` where (`movies`.`certificate` <> 18) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-30  2:20:56
