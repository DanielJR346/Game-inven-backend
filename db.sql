CREATE DATABASE  IF NOT EXISTS `db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: db
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `UserID` int NOT NULL,
  `AdminID` int NOT NULL,
  PRIMARY KEY (`UserID`,`AdminID`),
  UNIQUE KEY `UserID_UNIQUE` (`UserID`),
  UNIQUE KEY `AdminID_UNIQUE` (`AdminID`),
  CONSTRAINT `User` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,1);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_can_edit_inv`
--

DROP TABLE IF EXISTS `admin_can_edit_inv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_can_edit_inv` (
  `AdminID` int NOT NULL,
  `PlayerID` int NOT NULL,
  PRIMARY KEY (`AdminID`,`PlayerID`),
  UNIQUE KEY `AdminID_UNIQUE` (`AdminID`),
  UNIQUE KEY `PlayerID_UNIQUE` (`PlayerID`),
  KEY `AdminEdits_idx` (`AdminID`),
  KEY `PlayedEdit_idx` (`PlayerID`),
  CONSTRAINT `AdminEdits` FOREIGN KEY (`AdminID`) REFERENCES `admin` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `PlayedEdit` FOREIGN KEY (`PlayerID`) REFERENCES `player` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_can_edit_inv`
--

LOCK TABLES `admin_can_edit_inv` WRITE;
/*!40000 ALTER TABLE `admin_can_edit_inv` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin_can_edit_inv` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_set_attribute`
--

DROP TABLE IF EXISTS `admin_set_attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_set_attribute` (
  `AdminID` int NOT NULL,
  `ItemID` int NOT NULL,
  PRIMARY KEY (`ItemID`,`AdminID`),
  UNIQUE KEY `AdminID_UNIQUE` (`AdminID`),
  UNIQUE KEY `ItemID_UNIQUE` (`ItemID`),
  CONSTRAINT `AdminSet` FOREIGN KEY (`AdminID`) REFERENCES `admin` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='AdminID is a foreign key of admin.UserID, not admin.AdminID, I get some index errors from trying to set it to admin.AdminID so ill leave it like this for now';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_set_attribute`
--

LOCK TABLES `admin_set_attribute` WRITE;
/*!40000 ALTER TABLE `admin_set_attribute` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin_set_attribute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `armour`
--

DROP TABLE IF EXISTS `armour`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `armour` (
  `ItemID` int NOT NULL,
  `Defense` int NOT NULL DEFAULT '0',
  `Type` varchar(45) NOT NULL,
  `EquippedID` int DEFAULT NULL,
  PRIMARY KEY (`ItemID`),
  KEY `EquippedBy_idx` (`EquippedID`),
  CONSTRAINT `ArmourItem` FOREIGN KEY (`ItemID`) REFERENCES `equippable` (`ItemID`),
  CONSTRAINT `EquippedBy` FOREIGN KEY (`EquippedID`) REFERENCES `player` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Type: {helmet, chestplate, leggings, boots}\nEquippedID: UserID of player currently equipping item';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `armour`
--

LOCK TABLES `armour` WRITE;
/*!40000 ALTER TABLE `armour` DISABLE KEYS */;
INSERT INTO `armour` VALUES (1,123,'1',1),(2,327,'2',1);
/*!40000 ALTER TABLE `armour` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consumable`
--

DROP TABLE IF EXISTS `consumable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumable` (
  `ItemID` int NOT NULL,
  `Effect` varchar(255) NOT NULL,
  `Quantity` int DEFAULT NULL,
  `#Uses` int DEFAULT NULL,
  `PlayerIDConsumed` int DEFAULT NULL,
  PRIMARY KEY (`ItemID`),
  KEY `PlayerIDConsumed_idx` (`PlayerIDConsumed`),
  CONSTRAINT `ConsumableItem` FOREIGN KEY (`ItemID`) REFERENCES `item` (`ItemID`),
  CONSTRAINT `PlayerIDConsumed` FOREIGN KEY (`PlayerIDConsumed`) REFERENCES `player` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='We might have to remove PlayerIDConsumed and make it its own table like player_buys_item but player_consumes_potion';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumable`
--

LOCK TABLES `consumable` WRITE;
/*!40000 ALTER TABLE `consumable` DISABLE KEYS */;
INSERT INTO `consumable` VALUES (3,'assda',3,1,NULL);
/*!40000 ALTER TABLE `consumable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equippable`
--

DROP TABLE IF EXISTS `equippable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equippable` (
  `ItemID` int NOT NULL,
  `Weight` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`ItemID`),
  CONSTRAINT `EquippableItem` FOREIGN KEY (`ItemID`) REFERENCES `item` (`ItemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equippable`
--

LOCK TABLES `equippable` WRITE;
/*!40000 ALTER TABLE `equippable` DISABLE KEYS */;
INSERT INTO `equippable` VALUES (1,123),(2,123);
/*!40000 ALTER TABLE `equippable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `ItemID` int NOT NULL AUTO_INCREMENT,
  `Description` varchar(255) DEFAULT NULL,
  `PlayerStoredID` int DEFAULT NULL,
  `PlayerSellPrice` int DEFAULT '0',
  PRIMARY KEY (`ItemID`),
  KEY `PlayerOwned_idx` (`PlayerStoredID`),
  CONSTRAINT `PlayerOwned` FOREIGN KEY (`PlayerStoredID`) REFERENCES `player` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='PlayerSellPrice is the price the player can sell the item for. NOT the price to buy the item! that price is in vendor_sells_item';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,'test melee weapon',3,0),(2,'test melee weapon',1,50),(3,'test melee weapon',1,0),(4,'test melee weapon',1,0),(5,'test melee weapon',1,0),(6,'test melee weapon',1,0),(7,'test melee weapon final',2,0),(8,'test melee weapon final again',2,0),(9,'test melee weapon final again',2,0),(10,'test melee weapon final again with NULL playerWieldID',2,0),(11,'test melee weapon final again with without inputting PlayerWieldID and ItemID',2,0),(12,'test melee weapon final again with without inputting PlayerWieldID and ItemID',2,0),(13,'test melee weapon final again with without inputting PlayerWieldID and ItemID',2,0),(14,'test melee weapon final again with without inputting PlayerWieldID and ItemID',2,0),(15,'test melee weapon final again with without inputting PlayerWieldID and ItemID',2,0),(16,'test melee weapon final again with without inputting PlayerWieldID and ItemID',2,0),(17,'test melee weapon final again with without inputting PlayerWieldID and ItemID',2,0),(18,'test melee weapon final again with without inputting PlayerWieldID and ItemID',2,0),(19,'test melee weapon final again with without inputting PlayerWieldID and ItemID',2,0),(20,'ples work',NULL,0),(23,'testing test2 function',1,0),(24,'testing test2 function',1,0),(100,'testing if I can return the itemID',NULL,0),(101,'testing if I can return the itemID',NULL,0),(102,'testing if I can return the itemID',NULL,0),(103,'testing if I can return the itemID',NULL,0),(104,'testing if I can return the itemID',NULL,0),(105,'testing if I can return the itemID',NULL,0),(106,'testing if I can return the itemID',NULL,0),(107,'testing if I can return the itemID',NULL,0),(108,'testing if I can return the itemID',NULL,0),(109,'testing if I can return the itemID',NULL,0),(110,'testing if I can return the itemID',NULL,0),(111,'testing if this shows up on the table',NULL,0),(112,'testing if this shows up on the table',NULL,0),(113,'testing if I can return the itemID',NULL,0),(114,'testing if I can return the itemID',NULL,0),(115,'testing if I can return the itemID',NULL,0),(116,'testing if I can return the itemID',NULL,0),(117,'testing if I can return the itemID',NULL,0),(118,'testing if I can return the itemID, is this item showing up?',NULL,0),(119,'testing if I can return the itemID, is this item showing up?',NULL,0),(120,'testing if I can return the itemID, is this item showing up?',NULL,0),(121,'test melee weapon again',NULL,0),(122,'test melee weapon again',NULL,0),(123,'test melee weapon again',NULL,0),(124,'test melee weapon again',NULL,0),(125,'test melee weapon again',NULL,0),(126,'test melee weapon again',NULL,0),(127,'test melee weapon again',NULL,0),(128,'test melee weapon again',NULL,0),(129,'test melee weapon again',NULL,0),(130,'test melee weapon again',NULL,0),(131,'test melee weapon again',NULL,0),(132,'test melee weapon again',NULL,0),(133,'ples work',NULL,0),(134,'testing test2 function',NULL,0);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `magic_weapon`
--

DROP TABLE IF EXISTS `magic_weapon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `magic_weapon` (
  `WeaponID` int NOT NULL,
  `ManaCost` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`WeaponID`),
  CONSTRAINT `MagicID` FOREIGN KEY (`WeaponID`) REFERENCES `weapon` (`ItemID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `magic_weapon`
--

LOCK TABLES `magic_weapon` WRITE;
/*!40000 ALTER TABLE `magic_weapon` DISABLE KEYS */;
/*!40000 ALTER TABLE `magic_weapon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `melee_weapon`
--

DROP TABLE IF EXISTS `melee_weapon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `melee_weapon` (
  `WeaponID` int NOT NULL,
  `AttackSpeed` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`WeaponID`),
  CONSTRAINT `MeleeID` FOREIGN KEY (`WeaponID`) REFERENCES `weapon` (`ItemID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `melee_weapon`
--

LOCK TABLES `melee_weapon` WRITE;
/*!40000 ALTER TABLE `melee_weapon` DISABLE KEYS */;
INSERT INTO `melee_weapon` VALUES (5,2),(7,5),(8,5),(10,5);
/*!40000 ALTER TABLE `melee_weapon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player` (
  `UserID` int NOT NULL,
  `Money` int NOT NULL DEFAULT '0',
  `CarryWeight` int NOT NULL DEFAULT '0',
  `Invcapacity` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`UserID`),
  CONSTRAINT `UserID` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (1,1245,300,200),(2,200,300,200),(3,100,300,200);
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player_buys_item`
--

DROP TABLE IF EXISTS `player_buys_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player_buys_item` (
  `PlayerID` int NOT NULL,
  `ItemID` int NOT NULL,
  PRIMARY KEY (`PlayerID`,`ItemID`),
  KEY `ItemSold_idx` (`ItemID`),
  CONSTRAINT `ItemSold` FOREIGN KEY (`ItemID`) REFERENCES `item` (`ItemID`),
  CONSTRAINT `PlayerBuy` FOREIGN KEY (`PlayerID`) REFERENCES `player` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_buys_item`
--

LOCK TABLES `player_buys_item` WRITE;
/*!40000 ALTER TABLE `player_buys_item` DISABLE KEYS */;
INSERT INTO `player_buys_item` VALUES (1,1),(1,2),(2,2);
/*!40000 ALTER TABLE `player_buys_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ranged_weapon`
--

DROP TABLE IF EXISTS `ranged_weapon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ranged_weapon` (
  `WeaponID` int NOT NULL,
  `DrawSpeed` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`WeaponID`),
  CONSTRAINT `RangedID` FOREIGN KEY (`WeaponID`) REFERENCES `weapon` (`ItemID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ranged_weapon`
--

LOCK TABLES `ranged_weapon` WRITE;
/*!40000 ALTER TABLE `ranged_weapon` DISABLE KEYS */;
/*!40000 ALTER TABLE `ranged_weapon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `set_vendor_offers`
--

DROP TABLE IF EXISTS `set_vendor_offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `set_vendor_offers` (
  `AdminID` int NOT NULL,
  `VendorID` int NOT NULL,
  PRIMARY KEY (`AdminID`,`VendorID`),
  UNIQUE KEY `AdminID_UNIQUE` (`AdminID`),
  UNIQUE KEY `VendorID_UNIQUE` (`VendorID`),
  KEY `VendorSet_idx` (`VendorID`),
  CONSTRAINT `AdminVendSer` FOREIGN KEY (`AdminID`) REFERENCES `admin` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `VendorSet` FOREIGN KEY (`VendorID`) REFERENCES `vendor` (`VendorID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='same problem with admin_can_edit_inv is here too, idk why its hapening :(';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `set_vendor_offers`
--

LOCK TABLES `set_vendor_offers` WRITE;
/*!40000 ALTER TABLE `set_vendor_offers` DISABLE KEYS */;
/*!40000 ALTER TABLE `set_vendor_offers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Password` varchar(255) NOT NULL DEFAULT 'password',
  `Username` varchar(45) NOT NULL DEFAULT 'User',
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='all users deafult passwords is ''password''';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'newPassword','testname'),(2,'password','User'),(3,'password','User'),(4,'newPasswordButForUser4','User');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor`
--

DROP TABLE IF EXISTS `vendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendor` (
  `VendorID` int NOT NULL AUTO_INCREMENT,
  `Money` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`VendorID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor`
--

LOCK TABLES `vendor` WRITE;
/*!40000 ALTER TABLE `vendor` DISABLE KEYS */;
INSERT INTO `vendor` VALUES (1,755);
/*!40000 ALTER TABLE `vendor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor_buys_item`
--

DROP TABLE IF EXISTS `vendor_buys_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendor_buys_item` (
  `VendorID` int NOT NULL,
  `ItemID` int NOT NULL,
  PRIMARY KEY (`VendorID`,`ItemID`),
  KEY `ItemSold_id` (`ItemID`) /*!80000 INVISIBLE */,
  CONSTRAINT `ItemBought` FOREIGN KEY (`ItemID`) REFERENCES `item` (`ItemID`),
  CONSTRAINT `VendorSeller` FOREIGN KEY (`VendorID`) REFERENCES `vendor` (`VendorID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor_buys_item`
--

LOCK TABLES `vendor_buys_item` WRITE;
/*!40000 ALTER TABLE `vendor_buys_item` DISABLE KEYS */;
INSERT INTO `vendor_buys_item` VALUES (1,2);
/*!40000 ALTER TABLE `vendor_buys_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor_sells_item`
--

DROP TABLE IF EXISTS `vendor_sells_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendor_sells_item` (
  `VendorID` int NOT NULL,
  `ItemID` int NOT NULL,
  `Price` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`VendorID`,`ItemID`),
  KEY `ItemOffered_idx` (`ItemID`),
  CONSTRAINT `ItemOffered` FOREIGN KEY (`ItemID`) REFERENCES `item` (`ItemID`),
  CONSTRAINT `SellVendor` FOREIGN KEY (`VendorID`) REFERENCES `vendor` (`VendorID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Shows which items are being sold by which vendors';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor_sells_item`
--

LOCK TABLES `vendor_sells_item` WRITE;
/*!40000 ALTER TABLE `vendor_sells_item` DISABLE KEYS */;
INSERT INTO `vendor_sells_item` VALUES (1,1,248),(1,5,110);
/*!40000 ALTER TABLE `vendor_sells_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weapon`
--

DROP TABLE IF EXISTS `weapon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weapon` (
  `ItemID` int NOT NULL,
  `AttackPower` int NOT NULL DEFAULT '0',
  `PlayerWieldID` int DEFAULT NULL,
  PRIMARY KEY (`ItemID`),
  KEY `PlayerWielder_idx` (`PlayerWieldID`),
  CONSTRAINT `PlayerWielder` FOREIGN KEY (`PlayerWieldID`) REFERENCES `player` (`UserID`),
  CONSTRAINT `WeaponItem` FOREIGN KEY (`ItemID`) REFERENCES `item` (`ItemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weapon`
--

LOCK TABLES `weapon` WRITE;
/*!40000 ALTER TABLE `weapon` DISABLE KEYS */;
INSERT INTO `weapon` VALUES (5,69,1),(6,69,1),(7,69,2),(8,69,2),(10,69,NULL);
/*!40000 ALTER TABLE `weapon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weapon_effects`
--

DROP TABLE IF EXISTS `weapon_effects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weapon_effects` (
  `WeaponID` int NOT NULL,
  `Effect` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`WeaponID`),
  CONSTRAINT `weapon` FOREIGN KEY (`WeaponID`) REFERENCES `weapon` (`ItemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weapon_effects`
--

LOCK TABLES `weapon_effects` WRITE;
/*!40000 ALTER TABLE `weapon_effects` DISABLE KEYS */;
/*!40000 ALTER TABLE `weapon_effects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-11  0:21:20
