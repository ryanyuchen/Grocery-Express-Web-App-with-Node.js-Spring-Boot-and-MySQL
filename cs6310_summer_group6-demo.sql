/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 5.7.21 : Database - cs6310_summer_group6_demo
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`cs6310_summer_group6_demo` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `cs6310_summer_group6_demo`;

/*Table structure for table `angrybird` */

DROP TABLE IF EXISTS `angrybird`;

CREATE TABLE `angrybird` (
  `angrybird_id` int(11) NOT NULL AUTO_INCREMENT,
  `total_birds` int(11) DEFAULT '0',
  `probability` double(16,2) DEFAULT '0.30',
  PRIMARY KEY (`angrybird_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `angrybird` */

insert  into `angrybird`(`angrybird_id`,`total_birds`,`probability`) values 
(2,1,0.30);

/*Table structure for table `customer` */

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `first_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `credit` int(11) DEFAULT NULL,
  `rating` double(2,1) DEFAULT NULL,
  `phone_number` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pending_order_cost` int(11) DEFAULT '0',
  `username` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  KEY `customer_fk0` (`user_id`),
  CONSTRAINT `customer_fk0` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `customer` */

insert  into `customer`(`customer_id`,`user_id`,`first_name`,`last_name`,`credit`,`rating`,`phone_number`,`pending_order_cost`,`username`) values 
(7,17,'eLOO','jDWHV',10000,3.5,'2334567890',430,'user1'),
(8,18,'oHR','pHVVL',90,4.5,'2022022022',10,'user2');

/*Table structure for table `drone` */

DROP TABLE IF EXISTS `drone`;

CREATE TABLE `drone` (
  `drone_id` int(11) NOT NULL AUTO_INCREMENT,
  `drone_identifier` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_id` int(11) DEFAULT NULL,
  `max_trip` int(11) DEFAULT NULL,
  `max_capacity` int(11) DEFAULT NULL,
  `pilot_id` int(11) DEFAULT NULL,
  `drone_status` int(11) DEFAULT '1' COMMENT '1:available, 0: unavailable',
  `remaining_trip` int(11) DEFAULT NULL,
  `remaining_capacity` int(11) DEFAULT NULL,
  `num_of_orders` int(11) DEFAULT '0',
  PRIMARY KEY (`drone_id`),
  KEY `store_id` (`store_id`),
  KEY `pilot_id` (`pilot_id`),
  CONSTRAINT `drone_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`),
  CONSTRAINT `drone_ibfk_2` FOREIGN KEY (`pilot_id`) REFERENCES `pilot` (`pilot_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `drone` */

insert  into `drone`(`drone_id`,`drone_identifier`,`store_id`,`max_trip`,`max_capacity`,`pilot_id`,`drone_status`,`remaining_trip`,`remaining_capacity`,`num_of_orders`) values 
(5,'1',12,10,50,6,1,9,24,6),
(6,'1',13,3,50,NULL,1,3,50,0),
(7,'2',13,0,50,NULL,1,0,50,0);

/*Table structure for table `item` */

DROP TABLE IF EXISTS `item`;

CREATE TABLE `item` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` int(11) DEFAULT NULL,
  `item_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unit_weight` int(11) DEFAULT NULL,
  `unit_price` int(11) DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  KEY `store_id` (`store_id`),
  CONSTRAINT `item_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `item` */

insert  into `item`(`item_id`,`store_id`,`item_name`,`unit_weight`,`unit_price`) values 
(6,12,'apple',1,10),
(7,12,'orange',5,5),
(8,12,'stone',100,1),
(9,12,'gold',1,100),
(10,13,'apple',1,5),
(11,13,'gold',1,100),
(12,13,'stone',100,1),
(13,13,'orange',5,5);

/*Table structure for table `line` */

DROP TABLE IF EXISTS `line`;

CREATE TABLE `line` (
  `line_id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `total_cost` int(11) DEFAULT NULL,
  `total_weight` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `item_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_identifier` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`line_id`),
  KEY `item_id` (`item_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `line_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`),
  CONSTRAINT `line_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `line` */

insert  into `line`(`line_id`,`item_id`,`quantity`,`total_cost`,`total_weight`,`order_id`,`item_name`,`order_identifier`) values 
(19,6,1,10,1,8,'apple','purchaseA'),
(20,7,2,10,10,9,'orange','purchaseC'),
(21,9,2,200,2,9,'gold','purchaseC'),
(22,6,12,120,12,10,'apple','purchaseE'),
(23,7,2,10,10,8,'orange','purchaseA'),
(24,9,1,100,1,8,'gold','purchaseA');

/*Table structure for table `order` */

DROP TABLE IF EXISTS `order`;

CREATE TABLE `order` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` int(11) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `drone_id` int(11) DEFAULT NULL,
  `order_identifier` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_cost` int(11) DEFAULT '0',
  `status` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT 'Pending',
  `total_weight` int(11) DEFAULT '0',
  PRIMARY KEY (`order_id`),
  KEY `store_id` (`store_id`),
  KEY `customer_id` (`customer_id`),
  KEY `drone_id` (`drone_id`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`),
  CONSTRAINT `order_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `order_ibfk_3` FOREIGN KEY (`drone_id`) REFERENCES `drone` (`drone_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `order` */

insert  into `order`(`order_id`,`store_id`,`customer_id`,`drone_id`,`order_identifier`,`total_cost`,`status`,`total_weight`) values 
(8,12,7,5,'purchaseA',120,'Pending',12),
(9,12,8,5,'purchaseC',210,'Purchased',12),
(10,12,7,5,'purchaseE',120,'Pending',12),
(11,12,7,5,'purchaseF',0,'Pending',0),
(12,12,7,5,'purchaseG',0,'Pending',0),
(13,12,7,5,'purchaseH',0,'Pending',0),
(14,12,7,5,'purchaseI',0,'Pending',0);

/*Table structure for table `pilot` */

DROP TABLE IF EXISTS `pilot`;

CREATE TABLE `pilot` (
  `pilot_id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tax_id` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `license_id` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `experience` int(11) DEFAULT NULL,
  `phone_number` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`pilot_id`),
  UNIQUE KEY `account` (`account`),
  UNIQUE KEY `tax_id` (`tax_id`),
  UNIQUE KEY `license_id` (`license_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `pilot` */

insert  into `pilot`(`pilot_id`,`account`,`first_name`,`last_name`,`tax_id`,`license_id`,`experience`,`phone_number`) values 
(6,'SLORW4','oLRQHO','pHVVL','444556666','777888999',11,'9996660000'),
(11,'SLORW5','fULVWLDQR','uRQDOGR','456789012','45678',20,'2109876543');

/*Table structure for table `store` */

DROP TABLE IF EXISTS `store`;

CREATE TABLE `store` (
  `store_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revenue` int(11) DEFAULT NULL,
  PRIMARY KEY (`store_id`),
  UNIQUE KEY `store_name` (`store_name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `store` */

insert  into `store`(`store_id`,`store_name`,`revenue`) values 
(12,'Kroger',10010),
(13,'Walmart',30000);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` int(1) DEFAULT '0' COMMENT '0：customer, 1:admin',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `user` */

insert  into `user`(`user_id`,`username`,`password`,`role`) values 
(16,'admin','admin',1),
(17,'user1','password1',0),
(18,'user2','password2',0),
(19,'user3','password3',0),
(20,'user4','password4',0);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
