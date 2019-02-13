/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2019-02-13 21:00:35
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin_table
-- ----------------------------
DROP TABLE IF EXISTS `admin_table`;
CREATE TABLE `admin_table` (
  `ID` varchar(32) NOT NULL,
  `username` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for admin_token_table
-- ----------------------------
DROP TABLE IF EXISTS `admin_token_table`;
CREATE TABLE `admin_token_table` (
  `ID` varchar(32) NOT NULL,
  `admin_ID` varchar(32) DEFAULT NULL,
  `expires` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for admin_article_detail
-- ----------------------------
DROP TABLE IF EXISTS `admin_article_detail`;
CREATE TABLE `admin_article_detail` (
  `article_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `article_detail` text NOT NULL,
  `article_title` varchar(32) NOT NULL,
  `article_tag` varchar(32) DEFAULT NULL,
  `create_at` varchar(32) NOT NULL,
  `update_at` varchar(32) NOT NULL,
  `ID` int(10) unsigned NOT NULL,
  `article_desc` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`article_id`),
  KEY `ID` (`ID`),
  CONSTRAINT `admin_article_detail_ibfk_1` FOREIGN KEY (`ID`) REFERENCES `admin_article_list` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;


-- ----------------------------
-- Table structure for admin_article_list
-- ----------------------------
DROP TABLE IF EXISTS `admin_article_list`;
CREATE TABLE `admin_article_list` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(64) NOT NULL,
  `description` varchar(128) DEFAULT NULL,
  `creater` varchar(32) NOT NULL,
  `create_time` varchar(32) NOT NULL,
  `is_delete` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;


