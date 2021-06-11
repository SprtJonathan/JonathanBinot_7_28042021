-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `commentId` int NOT NULL AUTO_INCREMENT,
  `postId` int unsigned DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `comment` text NOT NULL,
  `writtenOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastUpdated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`commentId`),
  UNIQUE KEY `commentId_UNIQUE` (`commentId`),
  KEY `fk_commnents_userId_idx` (`userId`),
  KEY `fk_comments_postId_idx` (`postId`),
  CONSTRAINT `fk_comments_postId` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE CASCADE,
  CONSTRAINT `fk_comments_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (21,26,97,'<p>Comment ├ºa ├ºa c\'est vrai?</p>','2021-06-02 18:24:11','2021-06-03 12:40:53'),(22,30,97,'<p>Je te tiens <em>inform├®</em> quand ce sera fait !</p>','2021-06-03 15:49:37','2021-06-04 11:57:03'),(23,31,97,'<p>non</p>','2021-06-04 11:59:44','2021-06-04 11:59:44'),(24,31,97,'<p>oui</p>','2021-06-04 11:59:49','2021-06-04 11:59:49'),(26,30,97,'<p>C\'est fait !</p>','2021-06-04 13:07:39','2021-06-04 13:07:39'),(32,32,211,'<p>sqdqsd</p>','2021-06-11 14:42:04','2021-06-11 14:42:04'),(33,32,211,'<p>https://www.reddit.com/r/starcitizen/comments/nwzcnr/what_i_think_when_i_saw_the_xian_scratch_wall_in/?utm_source=share&amp;utm_medium=web2x&amp;context=3</p>','2021-06-11 14:42:51','2021-06-11 14:42:51'),(34,73,97,'<iframe class=\"ql-video\" frameborder=\"0\" allowfullscreen=\"true\" src=\"https://www.redditmedia.com/r/france/comments/nx80iw/le_sentier_des_ocres_roussillon/?ref_source=embed&amp;ref=share&amp;embed=true\" height=\"359\" width=\"640\"></iframe><p><br></p>','2021-06-11 15:25:34','2021-06-11 15:25:34');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `postId` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `content` text,
  `creationDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modificationDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`postId`),
  UNIQUE KEY `postid_UNIQUE` (`postId`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `FK_posts_users` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (26,97,'Premer post !','<p>Bonjour ! Voici le premier post du site !</p>','2021-06-02 10:58:14','2021-06-03 12:33:16'),(29,179,'test','<blockquote><strong><em>helloiw</em></strong></blockquote>','2021-06-03 15:16:05','2021-06-03 15:16:05'),(30,179,'Pense-b├¬te','<h1>Penser ├á bien plaquer les <em>nanoleaf </em>contre le mur <strong>SURTOUT </strong>du c├┤t├® du Valve Index</h1>','2021-06-03 15:48:47','2021-06-04 11:57:58'),(31,97,'Update','<p>Alors aujourd\'hui, j\'ai mis ├á jour le syst├¿me des commentaires et des posts pour que ce soit plus joli ├á regarder et ├á naviguer sur mobile. Aimez-vous cela?</p>','2021-06-04 11:59:25','2021-06-10 12:14:20'),(32,97,'Titre de poste','<iframe class=\"ql-video\" allowfullscreen=\"true\" src=\"https://www.redditmedia.com/r/vuejs/comments/nthcqm/finished_my_first_deployed_fullstack_vue_3_app/?ref_source=embed&amp;ref=share&amp;embed=true\" width=\"640\" height=\"317\" frameborder=\"0\"></iframe><p><a href=\"https://www.reddit.com/\" rel=\"noopener noreferrer\" target=\"_blank\"><strong><em>Voici le post super int├®ressant</em></strong></a></p>','2021-06-06 23:23:42','2021-06-10 12:14:13'),(65,211,'test','<p>test</p>','2021-06-11 12:13:27','2021-06-11 12:13:27'),(66,211,'test','<p>tes</p>','2021-06-11 14:05:03','2021-06-11 14:05:03'),(68,211,'test','<p>test</p>','2021-06-11 14:29:51','2021-06-11 14:29:51'),(69,211,'test','<p>&lt;iframe id=\"reddit-embed\" src=\"https://www.redditmedia.com/r/vuejs/comments/nx9hdo/wanted_to_show_off_my_companys_vue_django_base/?ref_source=embed&amp;amp;ref=share&amp;amp;embed=true\" sandbox=\"allow-scripts allow-same-origin allow-popups\" style=\"border: none;\" scrolling=\"no\" width=\"640\" height=\"144\"&gt;&lt;/iframe&gt;</p>','2021-06-11 14:51:09','2021-06-11 14:51:09'),(70,97,'test','<iframe class=\"ql-video\" frameborder=\"0\" allowfullscreen=\"true\" src=\"https://www.redditmedia.com/r/vuejs/comments/nx9hdo/wanted_to_show_off_my_companys_vue_django_base/?ref_source=embed&amp;ref=share&amp;embed=true\" height=\"144\" width=\"640\"></iframe><p><br></p>','2021-06-11 14:53:23','2021-06-11 14:53:23'),(71,97,'Reddit post','<iframe class=\"ql-video\" frameborder=\"0\" allowfullscreen=\"true\" src=\"https://www.redditmedia.com/r/vuejs/comments/nx9hdo/wanted_to_show_off_my_companys_vue_django_base/?ref_source=embed&amp;ref=share&amp;embed=true&amp;theme=dark\" height=\"144\" width=\"640\"></iframe><p><br></p>','2021-06-11 14:53:57','2021-06-11 14:53:57'),(72,211,'test','<p>&lt;h1 class=\"watch-title-container\"&gt;&lt;span id=\"eow-title\" class=\"watch-title\" dir=\"ltr\" title=\"Brian Beckman: Don\'t fear the Monad\"&gt;Brian Beckman: Don\'t fear the Monad&lt;/span&gt;&lt;/h1&gt;</p>','2021-06-11 15:02:28','2021-06-11 15:02:28'),(73,211,'test','<p><img src=\"https://preview.redd.it/jt44nayilk471.jpg?width=640&amp;height=272&amp;crop=smart&amp;auto=webp&amp;s=a1570629f0b2acc3cac703858de246b3d2cbf0ad\" alt=\"Image de la publication\"></p>','2021-06-11 15:20:30','2021-06-11 15:20:30');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profilePictureUrl` varchar(255) NOT NULL,
  `roleId` int NOT NULL DEFAULT '0',
  `createdOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastUpdated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `userId_UNIQUE` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=212 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table contenant les informations des utilisateurs';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (97,'SprtJonathan','Jonathan','Binot','jonathan.binot@gmail.com','$2b$10$JCsSJbb1dnE6JSIV016qN.T1IcrImzebbLIFIVv7crzc3dFbrj5di','http://localhost:3000/images/userProfilePictures/uploads/Discord_PP_3.png1623405804345.png',1,'2021-06-01 16:47:14','2021-06-11 12:03:24'),(175,'capablecat312','Capable','Cat','capablecat@groupomania.com','$2b$10$NyKiFe.4MaXB01ZWGPRJ9O0aagGEFJmkXdhe2YE.4P1HWK5NIzCii','http://localhost:3000/images/userProfilePictures/default.png',0,'2021-06-02 17:16:04','2021-06-04 14:21:46'),(177,'blackfox964','Black','Fox','blackfox@groupomania.com','$2b$10$HZXIzSDVflkVUskw7Cth1.uo99iWL/hmK6wppJsmZ64D29sSKLA.6','http://localhost:3000/images/userProfilePictures/uploads/Illuminati_triangle_eye.png1623406510355.png',0,'2021-06-02 17:16:42','2021-06-11 12:15:10'),(178,'YellowCow','Yellow','Cow','yellowcow@groupomania.com','$2b$10$jvcTtajPAoSb4pmN3Pxvg.lmi8vAPdkWBfq/txaaZrcEh1b8OnnIC','http://localhost:3000/images/userProfilePictures/default.png',0,'2021-06-02 18:45:41','2021-06-09 13:54:31'),(179,'gratifiedsheep460','Gratified','Sheep','gratifiedsheep@groupomania.com','$2b$10$Fs4C7hDmhhNsLxqAQW8wsOpRL1uOyzWBNwju2yX9QPI1ZQT2FoJU2','http://localhost:3000/images/userProfilePictures/uploads/Uganda_knuckkles.png1623406492668.png',0,'2021-06-03 15:03:09','2021-06-11 12:14:52'),(181,'dsf','sdf','sdf','sdf@sdf.sdf','$2b$10$3IwZKaP0yXql1lBP8TMMzeerXOalWHTzKEOsoofJWpV5ZoutwWUM6','http://localhost:3000/images/userProfilePictures/default.png',0,'2021-06-10 11:53:02','2021-06-10 11:53:02'),(211,'test','test','test','test@test.test','$2b$10$D9zVIOhij.sjFKUYqBxKE.YbSNQ0NufxQ8Gqvj3kHHC4kKMQcB8rW','http://localhost:3000/images/userProfilePictures/uploads/Discord_logo1600.png1623414059568.png',0,'2021-06-11 12:13:16','2021-06-11 14:20:59');
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

-- Dump completed on 2021-06-11 17:12:37
