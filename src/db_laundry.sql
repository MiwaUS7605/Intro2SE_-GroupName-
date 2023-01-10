-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: db_laundry
-- ------------------------------------------------------
-- Server version	5.7.24

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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `idaccount` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `phonenumber` varchar(12) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `address` varchar(256) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `email` varchar(256) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL DEFAULT '1234567890',
  `role` int(11) DEFAULT '1',
  PRIMARY KEY (`idaccount`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `FK_ROLE_idx` (`role`),
  CONSTRAINT `FK_ROLE` FOREIGN KEY (`role`) REFERENCES `role` (`idrole`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'Lê Hoàng Khanh Nguyên ','123478909','ABC','ikdskajjfjjj@gmail.com','1234567890',1),(2,'Lăng Thảo Thảo','823973242','ABC','ksjkjalfwij@gmail.com','1234567890',1),(3,'Nguyễn Minh Quang','712731994','ABC','jhsdausjd@gmail.com','1234567890',1),(4,'Lê Hoài Phương','828399493','ABC','jkdi8yedj@gmail.com','1234567890',1),(5,'Bành Hảo Toàn','839828239','ABC','9ieifesieh@gmail.com','1234567890',1),(10,'SUN Company','123456789','KHTN TPHCM','suncompany@gmail.com','suncompany4p',2);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `idcart` int(11) NOT NULL AUTO_INCREMENT,
  `idcustomer` int(11) DEFAULT NULL,
  `idservice` int(11) DEFAULT NULL,
  `number` int(11) DEFAULT '1',
  PRIMARY KEY (`idcart`),
  KEY `FK_CA_CU_idx` (`idcustomer`),
  KEY `FK_CA_SE_idx` (`idservice`),
  CONSTRAINT `FK_CA_CU` FOREIGN KEY (`idcustomer`) REFERENCES `account` (`idaccount`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_CA_SE` FOREIGN KEY (`idservice`) REFERENCES `service` (`idservice`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `idorder` int(11) NOT NULL AUTO_INCREMENT,
  `idcustomer` int(11) NOT NULL,
  `totalprice` int(11) DEFAULT '0',
  `shipfee` varchar(45) COLLATE utf8mb4_vietnamese_ci DEFAULT '10000',
  `address` varchar(256) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `phonenumber` varchar(12) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `time` date DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  `idshop` int(11) NOT NULL,
  `iddeliverer` int(11) DEFAULT NULL,
  PRIMARY KEY (`idorder`),
  KEY `FK_ORDER_CUSTOMER_idx` (`idcustomer`),
  KEY `FK_ORDER_STATUS_idx` (`status`),
  CONSTRAINT `FK_ORDER_CUSTOMER` FOREIGN KEY (`idcustomer`) REFERENCES `account` (`idaccount`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_ORDER_STATUS` FOREIGN KEY (`status`) REFERENCES `orderstatus` (`idstatus`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,1,0,'10000',NULL,NULL,NULL,0,0,NULL),(2,1,0,'10000',NULL,NULL,NULL,0,0,NULL),(3,2,0,'10000',NULL,NULL,NULL,0,0,NULL),(4,3,0,'10000',NULL,NULL,NULL,0,0,NULL),(5,4,0,'10000',NULL,NULL,NULL,0,0,NULL);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetail`
--

DROP TABLE IF EXISTS `orderdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdetail` (
  `idorder` int(11) NOT NULL,
  `idservice` int(11) NOT NULL,
  `number` int(11) DEFAULT '1',
  PRIMARY KEY (`idorder`,`idservice`),
  KEY `FK_DETAIL_SERVICE_idx` (`idservice`),
  CONSTRAINT `FK_DETAIL_ORDER` FOREIGN KEY (`idorder`) REFERENCES `order` (`idorder`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_DETAIL_SERVICE` FOREIGN KEY (`idservice`) REFERENCES `service` (`idservice`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetail`
--

LOCK TABLES `orderdetail` WRITE;
/*!40000 ALTER TABLE `orderdetail` DISABLE KEYS */;
INSERT INTO `orderdetail` VALUES (1,1,1),(1,2,1),(1,3,1),(1,4,1),(1,5,1);
/*!40000 ALTER TABLE `orderdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderstatus`
--

DROP TABLE IF EXISTS `orderstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderstatus` (
  `idstatus` int(11) NOT NULL,
  `statusname` varchar(45) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`idstatus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderstatus`
--

LOCK TABLES `orderstatus` WRITE;
/*!40000 ALTER TABLE `orderstatus` DISABLE KEYS */;
INSERT INTO `orderstatus` VALUES (0,'Collecting'),(1,'Processing'),(2,'Delivering'),(3,'Completed');
/*!40000 ALTER TABLE `orderstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating` (
  `idshop` int(11) NOT NULL,
  `idcustomer` int(11) NOT NULL,
  `rate` int(11) DEFAULT '0',
  `message` varchar(45) COLLATE utf8mb4_vietnamese_ci DEFAULT '"No information"',
  PRIMARY KEY (`idshop`,`idcustomer`),
  CONSTRAINT `FK_RATING_SHOP` FOREIGN KEY (`idshop`) REFERENCES `shop` (`idshop`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `idrole` int(11) NOT NULL AUTO_INCREMENT,
  `rolename` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`idrole`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Customer'),(2,'Shop owner'),(3,'Deliverer');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service` (
  `idservice` int(11) NOT NULL AUTO_INCREMENT,
  `servicename` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `description` varchar(45) COLLATE utf8mb4_vietnamese_ci DEFAULT '"No information"',
  `price` int(11) DEFAULT '0',
  `idtype` int(11) NOT NULL,
  `rating` double DEFAULT '0',
  `image` varchar(256) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `availability` int(11) DEFAULT '1',
  `totalpurchase` int(11) DEFAULT '0',
  `idshop` int(11) NOT NULL DEFAULT '10',
  PRIMARY KEY (`idservice`),
  KEY `FK_SERVICE_TYPE_idx` (`idtype`),
  KEY `FK_SERVICE_AVAIL_idx` (`availability`),
  KEY `FK_SERVICE_SHOP_idx` (`idshop`),
  CONSTRAINT `FK_SERVICE_AVAIL` FOREIGN KEY (`availability`) REFERENCES `serviceavail` (`availability`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_SERVICE_SHOP` FOREIGN KEY (`idshop`) REFERENCES `shop` (`idshop`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_SERVICE_TYPE` FOREIGN KEY (`idtype`) REFERENCES `type` (`idtype`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (1,'Inspection and Sorting','\"No information\"',10000,1,0,'/image/cleanings/dry/dry_sort.jpg',1,0,10),(2,'Stain removal','\"No information\"',20000,1,0,'/image/cleanings/dry/dry_remove.jpg',1,0,10),(3,'Dry cleaning','\"No information\"',50000,1,0,'/image/cleanings/dry/dry_clean.jpg',1,0,10),(4,'Normal temperature Drying','\"No information\"',10000,1,0,'/image/cleanings/dry/dry_dry.jpg',1,0,10),(5,'Pressing and Finishing','\"No information\"',10000,1,0,'/image/cleanings/dry/dry_press.jpg',1,0,10),(6,'Packaging','\"No information\"',10000,1,0,'/image/cleanings/dry/dry_package.jpg',1,0,10),(7,'Inspection and Sorting','\"No information\"',10000,2,0,'/image/cleanings/laundry/laundry_sort.jpg',1,0,10),(8,'Stain removal','\"No information\"',20000,2,0,'/image/cleanings/laundry/laundry_remove.jpg',1,0,10),(9,'Washing','\"No information\"',30000,2,0,'/image/cleanings/laundry/laundry_wash.jpg',1,0,10),(10,'Hot air Drying','\"No information\"',20000,2,0,'/image/cleanings/laundry/laundry_dry.jpg',1,0,10),(11,'Ironing and Finishing','\"No information\"',10000,2,0,'/image/cleanings/laundry/laundry_iron.jpg',1,0,10),(12,'Packaging','\"No information\"',10000,2,0,'/image/cleanings/laundry/laundry_package.jpg',1,0,10),(13,'Inspection and Sorting','\"No information\"',10000,3,0,'/image/cleanings/shoes/shoes_inspect.jpg',1,0,10),(14,'Stain removal','\"No information\"',20000,3,0,'/image/cleanings/shoes/shoes_remove.jpg',1,0,10),(15,'Soft cleaning','\"No information\"',50000,3,0,'/image/cleanings/shoes/shoes_clean.webp',1,0,10),(16,'Normal temperature Drying','\"No information\"',10000,3,0,'/image/cleanings/shoes/shoes_dry.jpg',1,0,10),(17,'Pressing and Finishing','\"No information\"',10000,3,0,'/image/cleanings/shoes/shoes_press.jpg',1,0,10),(18,'Packaging','\"No information\"',10000,3,0,'/image/cleanings/shoes/shoes_package.jpg',1,0,10),(19,'Inspection and Sorting','\"No information\"',10000,5,0,'/image/cleanings/stuffed/stuffed_sort.jpg',1,0,10),(20,'Stain removal','\"No information\"',20000,5,0,'/image/cleanings/stuffed/stuffed_remove.jpg',1,0,10),(21,'Soft cleaning','\"No information\"',50000,5,0,'/image/cleanings/stuffed/stuffed_wash.jpg',1,0,10),(22,'Normal temperature Drying','\"No information\"',10000,5,0,'/image/cleanings/stuffed/stuffed_dry.jpg',1,0,10),(23,'Pressing and Finishing','\"No information\"',10000,5,0,'/image/cleanings/stuffed/stuffed_press.jpg',1,0,10),(24,'Packaging','\"No information\"',10000,5,0,'/image/cleanings/stuffed/stuffed_package.jpg',1,0,10),(25,'Inspection and Preparing tools','\"No information\"',50000,4,0,'/image/cleanings/furniture/furniture_tools.jpg',1,0,10),(26,'Stain removal','\"No information\"',20000,4,0,'/image/cleanings/furniture/furniture_remove.jpg',1,0,10),(27,'Surface cleaning','\"No information\"',50000,4,0,'/image/cleanings/furniture/furniture_clean.jpg',1,0,10),(28,'New coating','\"No information\"',30000,4,0,'/image/cleanings/furniture/furniture_coat.jpg',1,0,10),(29,'Sanitization','\"No information\"',20000,4,0,'/image/cleanings/furniture/furniture_sanitize.jpg',1,0,10),(30,'Hot air Drying','\"No information\"',20000,4,0,'/image/cleanings/furniture/furniture_dry.jpg',1,0,10);
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `serviceavail`
--

DROP TABLE IF EXISTS `serviceavail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `serviceavail` (
  `availability` int(11) NOT NULL,
  `name` varchar(45) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`availability`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `serviceavail`
--

LOCK TABLES `serviceavail` WRITE;
/*!40000 ALTER TABLE `serviceavail` DISABLE KEYS */;
INSERT INTO `serviceavail` VALUES (0,'Available'),(1,'Unavailable');
/*!40000 ALTER TABLE `serviceavail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop`
--

DROP TABLE IF EXISTS `shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shop` (
  `idshop` int(11) NOT NULL,
  `shopimage` varchar(256) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `shopname` varchar(45) COLLATE utf8mb4_vietnamese_ci DEFAULT 'NO NAME',
  `shopdescription` varchar(100) COLLATE utf8mb4_vietnamese_ci DEFAULT 'No information',
  `momoqr` varchar(256) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `bankaccount` varchar(15) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`idshop`),
  CONSTRAINT `FK_SHOP_ACC` FOREIGN KEY (`idshop`) REFERENCES `account` (`idaccount`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop`
--

LOCK TABLES `shop` WRITE;
/*!40000 ALTER TABLE `shop` DISABLE KEYS */;
INSERT INTO `shop` VALUES (10,NULL,'SUNFLOWER','No information',NULL,NULL);
/*!40000 ALTER TABLE `shop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type` (
  `idtype` int(11) NOT NULL AUTO_INCREMENT,
  `typename` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  PRIMARY KEY (`idtype`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (1,'Dry cleaning'),(2,'Laundry cleaning'),(3,'Shoes cleaning'),(4,'Furniture cleaning'),(5,'Stuffed dolls cleaning');
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'db_laundry'
--

--
-- Dumping routines for database 'db_laundry'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-09 15:28:56
