-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: makemates
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `users_id` int NOT NULL,
  `posts_id` int NOT NULL,
  `datetime` datetime DEFAULT NULL,
  KEY `fk_comments_users1_idx` (`users_id`),
  KEY `fk_comments_posts1_idx` (`posts_id`),
  CONSTRAINT `fk_comments_posts1` FOREIGN KEY (`posts_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comments_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `posts_id` int NOT NULL,
  `users_id` int NOT NULL,
  `datetime` datetime DEFAULT NULL,
  PRIMARY KEY (`posts_id`,`users_id`),
  KEY `fk_likes_posts1_idx` (`posts_id`),
  KEY `fk_likes_users1_idx` (`users_id`),
  CONSTRAINT `fk_likes_posts1` FOREIGN KEY (`posts_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_likes_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_media`
--

DROP TABLE IF EXISTS `post_media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_media` (
  `post_id` int NOT NULL,
  `media_url` varchar(300) NOT NULL,
  `user_id` int NOT NULL,
  KEY `fk_post_media_posts1_idx` (`post_id`),
  KEY `fk_post_media_users1_idx` (`user_id`),
  CONSTRAINT `fk_post_media_posts1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_post_media_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_media`
--

LOCK TABLES `post_media` WRITE;
/*!40000 ALTER TABLE `post_media` DISABLE KEYS */;
INSERT INTO `post_media` VALUES (21,'https://firebasestorage.googleapis.com/v0/b/makemates-61caf.appspot.com/o/IMG20240102164037.jpg1705146313154.jpeg?alt=media&token=80bae59d-7164-4d18-b39c-6ab7bb397f05',5),(22,'https://firebasestorage.googleapis.com/v0/b/makemates-61caf.appspot.com/o/1704208510674.jpg1705146651835.jpeg?alt=media&token=f3ade84e-663b-4754-8324-5cc8b2e78860',5),(23,'https://firebasestorage.googleapis.com/v0/b/makemates-61caf.appspot.com/o/IMG20240102164143.jpg1705147132046.jpeg?alt=media&token=c515fd3a-d51e-4644-81f0-d075e6dc8ced',5),(24,'https://firebasestorage.googleapis.com/v0/b/makemates-61caf.appspot.com/o/1704207975878.jpg1705148162026.jpeg?alt=media&token=51ff4c68-730d-4ece-8b57-5c0e33736d65',5),(25,'https://firebasestorage.googleapis.com/v0/b/makemates-61caf.appspot.com/o/1704208108532.jpg1705148362606.jpeg?alt=media&token=1bc6a778-d072-4020-9fed-7396be735e25',5),(26,'https://firebasestorage.googleapis.com/v0/b/makemates-61caf.appspot.com/o/IMG20240102164039.jpg1705153018370.jpeg?alt=media&token=fa46999e-5fc7-4442-ab72-8e6c265f97fb',5),(27,'https://firebasestorage.googleapis.com/v0/b/makemates-61caf.appspot.com/o/172097.jpg1705323409581.jpeg?alt=media&token=0fbe33fe-6f65-4284-8f06-4cf28af604c5',6);
/*!40000 ALTER TABLE `post_media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `desc` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `fk_user_id_idx` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (21,5,'2024-01-13 17:15:20','Jai shree hanuman ?️'),(22,5,'2024-01-13 17:20:58','Vibe'),(23,5,'2024-01-13 17:28:59','Jai Saraswati Maa '),(24,5,'2024-01-13 17:46:05','Yeah ! that\'s me'),(25,5,'2024-01-13 17:49:25','hanumant dham'),(26,5,'2024-01-13 19:07:04','Hello'),(27,6,'2024-01-15 18:26:51','duckling');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profileimages`
--

DROP TABLE IF EXISTS `profileimages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profileimages` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `image_url` varchar(45) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `currentImg` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`),
  KEY `fk_user_id_idx` (`user_id`),
  CONSTRAINT `fk_profile_image_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profileimages`
--

LOCK TABLES `profileimages` WRITE;
/*!40000 ALTER TABLE `profileimages` DISABLE KEYS */;
/*!40000 ALTER TABLE `profileimages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relationships`
--

DROP TABLE IF EXISTS `relationships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relationships` (
  `follow_id` int NOT NULL,
  `follower_id` int NOT NULL,
  `date` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`follow_id`,`follower_id`),
  KEY `fk_follower_id_idx` (`follower_id`),
  CONSTRAINT `fk_follow_id` FOREIGN KEY (`follow_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_follower_id` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relationships`
--

LOCK TABLES `relationships` WRITE;
/*!40000 ALTER TABLE `relationships` DISABLE KEYS */;
/*!40000 ALTER TABLE `relationships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(300) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `dob` date NOT NULL,
  `img` int DEFAULT NULL,
  `mobile_number` varchar(20) DEFAULT NULL,
  `country` varchar(20) DEFAULT NULL,
  `state` varchar(20) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `mobile_number_UNIQUE` (`mobile_number`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'Arush Sharma','arush@gmail.com','$2b$10$rPJC5SvrTho79u5tUp4/KOPIncO9dodWeXUr3VIZ4Tl2g2qUi0Pyq','male','2000-04-12',NULL,'+917234979654','India','Uttar Pradesh','Gorakhpur'),(6,'John Doe','john@gmail.com','$2b$10$THqaaEeHH41XL6Gz9o43se9C1uMj3LoFl8p7S1BMB6gWekeyQKGCS','male','2000-04-12',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-16 14:47:03
