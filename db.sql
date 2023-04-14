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
INSERT INTO `admin` VALUES (1,7),(2,4);
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
INSERT INTO `admin_can_edit_inv` VALUES (4,1),(4,2),(4,3),(7,1),(7,2),(7,3);
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
  PRIMARY KEY (`AdminID`,`ItemID`),
  KEY `ItemID` (`ItemID`),
  CONSTRAINT `AdminSet` FOREIGN KEY (`AdminID`) REFERENCES `admin` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ItemID` FOREIGN KEY (`ItemID`) REFERENCES `item` (`ItemID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='AdminID is a foreign key of admin.UserID, not admin.AdminID, I get some index errors from trying to set it to admin.AdminID so ill leave it like this for now';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_set_attribute`
--

LOCK TABLES `admin_set_attribute` WRITE;
/*!40000 ALTER TABLE `admin_set_attribute` DISABLE KEYS */;
INSERT INTO `admin_set_attribute` VALUES (7,1),(7,2),(7,3),(7,4),(7,5),(7,6),(7,7),(7,8),(7,9),(7,10),(7,11),(7,12),(4,13),(4,14),(4,15),(4,16),(4,17),(4,18),(4,19),(4,20),(4,21),(4,22),(4,23),(4,24);
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
INSERT INTO `armour` VALUES (10,5,'helmet',NULL),(11,15,'chestplate',NULL),(12,9,'leggings',NULL),(13,4,'boots',NULL),(14,8,'helmet',NULL),(15,18,'chestplate',NULL),(16,12,'leggings',NULL),(17,7,'boots',NULL),(18,3,'helmet',NULL),(19,12,'chestplate',NULL),(20,8,'leggings',NULL),(21,2,'boots',NULL);
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
  `Uses` int DEFAULT NULL,
  `CurrentUsesLeft` int DEFAULT NULL,
  PRIMARY KEY (`ItemID`),
  CONSTRAINT `ConsumableItem` FOREIGN KEY (`ItemID`) REFERENCES `item` (`ItemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Uses is the amount of uses a consumable has per quantity\nCurrentUsesLeft is the amount of uses left for that quantity of the consumable';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumable`
--

LOCK TABLES `consumable` WRITE;
/*!40000 ALTER TABLE `consumable` DISABLE KEYS */;
INSERT INTO `consumable` VALUES (22,'Restores HP',5,3,2),(23,'Restores MP',10,5,3),(24,'Grants mystical effects',3,1,1);
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
INSERT INTO `equippable` VALUES (1,15),(2,25),(3,13),(4,15),(5,30),(6,7),(7,28),(8,31),(9,23),(10,10),(11,20),(12,15),(13,5),(14,15),(15,25),(16,20),(17,10),(18,7),(19,18),(20,13),(21,6);
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
) ENGINE=InnoDB AUTO_INCREMENT=190 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='PlayerSellPrice is the price the player can sell the item for. NOT the price to buy the item! that price is in vendor_sells_item';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,'Original Fire',NULL,0),(2,'Excalibur',NULL,0),(3,'Galatine',NULL,0),(4,'Khryselakatos',NULL,0),(5,'Yew Bow',NULL,0),(6,'Gandiva',NULL,0),(7,'Spellbinder',NULL,0),(8,'Twilight',NULL,0),(9,'Journey\'s End',NULL,0),(10,'Black Wolf Mask',NULL,0),(11,'Blaidd\'s Armour',NULL,0),(12,'Blaidd\'s Greaves',NULL,0),(13,'Blaidd\'s Boots',NULL,0),(14,'Haligtree Knight Helm',NULL,0),(15,'Haligtree Knight Armour',NULL,0),(16,'Haligtree Greaves',NULL,0),(17,'Haligtree Boots',NULL,0),(18,'Omen Helm',NULL,0),(19,'Omen Armour',NULL,0),(20,'Omen Greaves',NULL,0),(21,'Omen Boots',NULL,0),(22,'Flask of Crimson Tears',NULL,0),(23,'Flask of Cerulean Tears',NULL,0),(24,'Flask of Wondrous Physick',NULL,0);
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
INSERT INTO `magic_weapon` VALUES (7,160),(8,90),(9,250);
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
INSERT INTO `melee_weapon` VALUES (1,5),(2,8),(3,3);
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
INSERT INTO `player` VALUES (3,1500,200,120),(4,2000,280,150),(5,1337,235,180);
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
/*!40000 ALTER TABLE `player_buys_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player_consumes_consumable`
--

DROP TABLE IF EXISTS `player_consumes_consumable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player_consumes_consumable` (
  `ItemID` int DEFAULT NULL,
  `PlayerConsumedID` int DEFAULT NULL,
  KEY `ConsumableID_idx` (`ItemID`),
  KEY `ConsumerID_idx` (`PlayerConsumedID`),
  CONSTRAINT `ConsumableID` FOREIGN KEY (`ItemID`) REFERENCES `consumable` (`ItemID`),
  CONSTRAINT `ConsumerID` FOREIGN KEY (`PlayerConsumedID`) REFERENCES `player` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='records which potions a player consumes';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_consumes_consumable`
--

LOCK TABLES `player_consumes_consumable` WRITE;
/*!40000 ALTER TABLE `player_consumes_consumable` DISABLE KEYS */;
/*!40000 ALTER TABLE `player_consumes_consumable` ENABLE KEYS */;
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
INSERT INTO `ranged_weapon` VALUES (4,3),(5,8),(6,5);
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
INSERT INTO `set_vendor_offers` VALUES (4,4),(7,4),(4,7),(7,7),(4,14),(7,14);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='all users deafult passwords is ''password''';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Admin1','Alpha'),(2,'Admin2','Gamma'),(3,'Player1','Beta'),(4,'Player2','Delta'),(5,'Player3','Charlie');
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor`
--

LOCK TABLES `vendor` WRITE;
/*!40000 ALTER TABLE `vendor` DISABLE KEYS */;
INSERT INTO `vendor` VALUES (4,2000),(7,500),(14,1250);
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
  KEY `PlayerWielder_idx` (`PlayerWieldID`),
  KEY `WeaponItem_idx` (`ItemID`),
  CONSTRAINT `PlayerWielder` FOREIGN KEY (`PlayerWieldID`) REFERENCES `player` (`UserID`),
  CONSTRAINT `WeaponItem` FOREIGN KEY (`ItemID`) REFERENCES `equippable` (`ItemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weapon`
--

LOCK TABLES `weapon` WRITE;
/*!40000 ALTER TABLE `weapon` DISABLE KEYS */;
/*!40000 ALTER TABLE `weapon` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-13 23:04:49
