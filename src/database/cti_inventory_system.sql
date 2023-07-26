-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 26, 2023 at 03:54 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cti_inventory_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(5) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(30) NOT NULL,
  `position` varchar(15) NOT NULL,
  `company` varchar(99) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `name`, `email`, `password`, `position`, `company`) VALUES
(1, '-Unknown-', 'developer@g.batstate-u.edu.ph', 'ronlangsakalam', 'administrator', 'STEER HUB'),
(2, 'Lloyd', 'developer1@g.batstate-u.edu.ph', 'lloydlangsakalam', 'moderator', 'DTC'),
(3, 'Rommel', 'developer2@g.batstate-u.edu.ph', 'rommellangsakalam', 'user', 'CTI'),
(4, 'ewqewew', 'qewq@g', '123456', 'user', 'CTI');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(15) NOT NULL,
  `name` varchar(50) NOT NULL,
  `location` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `location`) VALUES
(1, 'Furniture', 'CTI'),
(2, 'Appliance', 'CTI'),
(3, 'Device', 'CTI'),
(15, 'Computer Software', 'CTI'),
(16, 'ICT', 'CTI'),
(17, 'Technical Equipment', 'CTI');

-- --------------------------------------------------------

--
-- Table structure for table `code`
--

CREATE TABLE `code` (
  `id` int(10) NOT NULL,
  `company` varchar(90) NOT NULL,
  `admin` varchar(90) NOT NULL,
  `user` varchar(90) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `code`
--

INSERT INTO `code` (`id`, `company`, `admin`, `user`) VALUES
(2, 'CTI', 'CTI-ADMIN', 'CTI-USER'),
(3, 'CTI', '32132', '321321'),
(4, 'MTCC', 'qqqq', 'qqqq'),
(5, 'DTC', 'aaa', 'qqq');

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` int(15) NOT NULL,
  `location` varchar(50) NOT NULL,
  `fullname` varchar(99) NOT NULL,
  `floor` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `location`, `fullname`, `floor`) VALUES
(1, 'MRC', 'Manufacturing Research Center', '1st Floor'),
(2, 'MTCC', 'Material Testing and Calibration Center', '1st Floor'),
(3, 'CTI', 'Center for Technopreneurship and Innovation', '2nd Floor'),
(4, 'DTC', 'Digital Transforming Center', '2nd Floor'),
(5, 'ESRC', 'Electronic System Research Center', '2nd Floor'),
(6, 'GIS', 'Geographic Information System Application Development System', '2nd Floor'),
(8, 'CIEE', 'Center for Innovation in Engineering Education', '3rd Floor'),
(9, 'KIST', 'Knowledge Innovation and Science Technology', '3rd Floor'),
(17, 'PEZABSUSEZI', 'Philippine Economic Zone Authority Batangas State University Special Economic Zone Institute', '3rd Floor');

-- --------------------------------------------------------

--
-- Table structure for table `defective`
--

CREATE TABLE `defective` (
  `id` int(11) NOT NULL,
  `item_id` int(15) NOT NULL,
  `item_name` varchar(50) NOT NULL,
  `quantity` int(10) NOT NULL,
  `location` varchar(99) NOT NULL,
  `companyownership` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `defective`
--

INSERT INTO `defective` (`id`, `item_id`, `item_name`, `quantity`, `location`, `companyownership`) VALUES
(1, 5, 'Bean Bags - Couch', 1, 'Storage Room', 'CTI'),
(2, 6, 'Bean Bags -  Tear Drop', 1, 'Storage Room', 'CTI'),
(3, 22, 'Plastic Folding Stool', 19, 'Storage Room', 'CTI'),
(4, 37, 'Coffee Maker - American Heritage', 1, 'Conference Room', 'CTI'),
(5, 43, 'Acer Laptop - From Sir Rojay', 1, 'Conference Room', 'CTI'),
(6, 52, 'Brother Fax', 1, 'Storage Room', 'CTI'),
(7, 57, 'Laptop Computer (Dell Latitude E6440 CTO)', 1, 'Storage Room', 'CTI'),
(8, 59, 'Dell CPU Precision', 1, 'Conference Room', 'CTI'),
(9, 73, 'HP Laserjet Printer', 1, 'Storage Room', 'CTI'),
(10, 74, 'HP Officejet Pro 8620', 1, 'Storage Room', 'CTI'),
(11, 82, 'MySQL', 1, 'Software', 'CTI'),
(12, 85, 'Paper Shredder', 1, 'Storage Room', 'CTI'),
(13, 86, 'Panasonic DP-MB250 Fax Machine', 1, 'Storage Room', 'CTI'),
(14, 89, 'Power Bank - Xiaomi', 1, 'Jecamarie Pasay', 'CTI'),
(15, 109, '1TB Transcend External Hard Drive', 1, 'Jecamarie Pasay', 'CTI');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `item_id` int(11) NOT NULL,
  `itemid_company` int(11) DEFAULT NULL,
  `Serial` varchar(255) DEFAULT NULL,
  `Property` varchar(255) DEFAULT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `project` varchar(255) DEFAULT NULL,
  `specificlocation` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `par` varchar(255) DEFAULT NULL,
  `condition` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`item_id`, `itemid_company`, `Serial`, `Property`, `item_name`, `quantity`, `category`, `project`, `specificlocation`, `location`, `image`, `par`, `condition`) VALUES
(1, 1, '', '', 'Accent Chair', 2, 'Furniture', 'DOST PCIEERD - Establishment of BatStateU CTI', 'Co-Working Space', 'CTI', '', 'https://drive.google.com/file/d/1Ao9jpjNE0gWD4AW3ig1WUSXH2Om6VB-a/view?usp=sharing', 'WORKING'),
(2, 2, '', '', 'Accent Chair', 2, 'Furniture', 'DOST PCIEERD - Establishment of BatStateU CTI', 'OVPRDES', 'CTI', '', 'https://drive.google.com/file/d/1Ao9jpjNE0gWD4AW3ig1WUSXH2Om6VB-a/view?usp=sharing', 'WORKING'),
(3, 3, '', '', 'Artificial Plants', 2, 'Furniture', 'DOST PCIEERD - TBI 4.0 YEAR 2', 'Co-Working Space', 'CTI', '', '', 'WORKING'),
(4, 4, '', '', 'Bean Bugs - Cupcake', 1, 'Furniture', 'DOST PCIEERD - Establishment of BatStateU CTI', 'DTC', 'CTI', 'https://drive.google.com/file/d/1AqoXEyrRsRx6FyTXiH6hl2Ex1bXhh385/view?usp=sharing', 'https://drive.google.com/file/d/1B3t9e7Vtw8gjSCAzVq7RFMy-Yv_mcnKD/view?usp=sharing', 'WORKING'),
(5, 5, '', '', 'Bean Bugs - Cupcake', 1, 'Furniture', 'DOST PCIEERD - Establishment of BatStateU CTI', 'Co-Working Space', 'CTI', 'https://drive.google.com/file/d/1AqoXEyrRsRx6FyTXiH6hl2Ex1bXhh385/view?usp=sharing', 'https://drive.google.com/file/d/1B3t9e7Vtw8gjSCAzVq7RFMy-Yv_mcnKD/view?usp=sharing', 'WORKING'),
(6, 6, '', '', 'Bean Bugs - Floor Chairs', 2, 'Furniture', 'CHED IDIG - TechHub', 'Co-Working Space', 'CTI', '', '', 'WORKING'),
(7, 7, '', '', 'Bean Bugs - Couch', 1, 'Furniture', 'CHED IDIG - TechHub', 'Co-Working Space', 'CTI', '', '', 'WORKING'),
(8, 8, '', '', 'Bean Bugs - Couch', 1, 'Furniture', 'CHED IDIG - TechHub', 'Storage Room', 'CTI', '', '', 'DEFECTIVE'),
(9, 9, '', '', 'Bean Bugs - Tear Drop', 1, 'Furniture', 'CHED IDIG - TechHub', 'Storage Room', 'CTI', '', '', 'DEFECTIVE'),
(10, 10, '', '', 'Carpet', 4, 'Furniture', 'DOST PCIEERD - TBI 4.0 YEAR 2', 'Co-Working Space', 'CTI', '', '', 'WORKING'),
(11, 11, '', '', 'Clerical Chair', 1, 'Furniture', '', 'Ms. Jecamarie Pasay', 'CTI', '', '', 'WORKING'),
(12, 12, '', '', 'Clerical Chair', 1, 'Furniture', '', 'Ms. Honey Lyn Tirador', 'CTI', '', '', 'WORKING'),
(13, 13, '', '', 'Computer table', 2, 'Furniture', '', 'Co-Working Space', 'CTI', '', '', 'WORKING'),
(14, 14, '', '', 'Computer table', 7, 'Furniture', '', 'Locators Space', 'CTI', '', '', 'WORKING'),
(15, 15, '', '', 'Computer table', 4, 'Furniture', '', 'Storage Room', 'CTI', '', '', 'WORKING'),
(16, 16, '', '', 'Computer table', 2, 'Furniture', '', 'PEZA', 'CTI', '', '', 'WORKING'),
(17, 17, '', '', 'Cross workstation desk with swivel chairs', 1, 'Furniture', 'STF', 'Staff Workspace', 'CTI', '', '', 'WORKING'),
(18, 18, '', '', 'Display Rack', 1, 'Furniture', 'DOST PCIEERD - TBI 4.0 Year 2', 'Conference Room', 'CTI', '', '', 'WORKING'),
(19, 19, '', '', 'Display Shelf - Hexagon', 2, 'Furniture', 'DOST PCIEERD - TBI 4.0 Year 2', 'Co-Working Space', 'CTI', '', '', 'WORKING'),
(20, 20, '', '', 'Folding Table', 3, 'Furniture', '', 'Storage Room', 'CTI', '', '', 'WORKING'),
(21, 21, '', '', 'Folding Tables', 3, 'Furniture', '', 'Storage Room', 'CTI', '', '', 'WORKING'),
(22, 22, '', '', 'Gang Chair', 6, 'Furniture', '', 'STEER HUB', 'CTI', '', '', 'WORKING'),
(23, 23, '', '', 'Locker', 4, 'Furniture', 'DOST PCIEERD - Establishment of BatStateU CTI', 'Outside Office', 'CTI', '', 'https://drive.google.com/file/d/1sHEaNd95LU_x303jmiSg2Jty_vqsX7W7/view?usp=sharing', 'WORKING'),
(24, 24, '', '', 'Locker', 2, 'Furniture', 'DOST PCIEERD - Establishment of BatStateU CTI', 'DTC', 'CTI', '', 'https://drive.google.com/file/d/1sHEaNd95LU_x303jmiSg2Jty_vqsX7W7/view?usp=sharing', 'WORKING'),
(25, 25, '', '', 'Mobile Pedestal ( Cabinet )', 7, 'Furniture', '', 'Conference Room', 'CTI', '', '', 'WORKING'),
(26, 26, '', '', 'Mobile Pedestal ( Cabinet )', 1, 'Furniture', '', 'Asst. Prof. John Richard Esguerra', 'CTI', '', '', 'WORKING'),
(27, 27, '', '', 'Mobile Pedestal ( Cabinet )', 1, 'Furniture', '', 'Ms. Honey Lyn A. Tirador', 'CTI', '', '', 'WORKING'),
(28, 28, '', '', 'Mobile Pedestal ( Cabinet )', 1, 'Furniture', '', 'Mr. Red Tarcelo', 'CTI', '', '', 'WORKING'),
(29, 29, '', '', 'Mobile Pedestal ( Cabinet )', 1, 'Furniture', '', 'Ms. Jecamarie Pasay', 'CTI', '', '', 'WORKING'),
(30, 30, '', '', 'Mobile Pedestal ( Cabinet )', 1, 'Furniture', '', 'Engr. Lovely Barbosa', 'CTI', '', '', 'WORKING'),
(31, 31, '', '', 'Movable Height Adjustable Table', 1, 'Furniture', 'DOST PCIEERD - TBI 4.0 Year 2', 'OVPRDES', 'CTI', '', 'https://drive.google.com/file/d/1YsDCJ3LyV6OX3vtUNnoMrbcW-lBiU2ZS/view?usp=sharing', 'WORKING'),
(32, 32, '', '', 'Movable Height Adjustable Table', 1, 'Furniture', 'DOST PCIEERD - TBI 4.0 Year 2', 'Co-Working Space', 'CTI', '', 'https://drive.google.com/file/d/1YsDCJ3LyV6OX3vtUNnoMrbcW-lBiU2ZS/view?usp=sharing', 'WORKING'),
(33, 33, '', '', 'Office Movable Partition', 1, 'Furniture', '', 'Co-Working Space', 'CTI', '', '', 'WORKING'),
(34, 34, '', '', 'Office Table and Office Chair', 3, 'Furniture', 'DOST PCIEERD - TBI 4.0 Year 2', 'Locators Space', 'CTI', '', '', 'WORKING'),
(35, 35, '', '', 'Ottoman', 11, 'Furniture', 'DOST PCIEERD - Establishment of BatStateU CTI', 'Co-Working Space', 'CTI', 'https://drive.google.com/file/d/1AcXpNJjrmEz5ethoJQzkEJnTBvNvY83f/view?usp=sharing', 'https://drive.google.com/file/d/1AL24XTs0amZfhQP3uwhgJc5aNEbBd5SP/view?usp=sharing', 'WORKING'),
(36, 36, '', '', 'Ottoman', 3, 'Furniture', 'DOST PCIEERD - Establishment of BatStateU CTI', 'DTC', 'CTI', 'https://drive.google.com/file/d/1AcXpNJjrmEz5ethoJQzkEJnTBvNvY83f/view?usp=sharing', 'https://drive.google.com/file/d/1AL24XTs0amZfhQP3uwhgJc5aNEbBd5SP/view?usp=sharing', 'WORKING'),
(37, 37, '', '', 'Plastic Folding Stool', 8, 'Furniture', 'DOST PCIEERD - Establishment of BatStateU CTI', 'AVR', 'CTI', '', 'https://drive.google.com/file/d/1zlMgt76p0tvi3nIk4duCrZS4-qXLMA3l/view?usp=sharing', 'WORKING'),
(38, 38, '', '', 'Plastic Folding Stool', 16, 'Furniture', 'DOST PCIEERD - Establishment of BatStateU CTI', 'FabLab', 'CTI', '', 'https://drive.google.com/file/d/1zlMgt76p0tvi3nIk4duCrZS4-qXLMA3l/view?usp=sharing', 'DEFECTIVE'),
(39, 39, '', '', 'Round Table', 1, 'Furniture', '', 'Co-Working Space', 'CTI', '', '', 'WORKING'),
(40, 40, '', '', 'Steel Cabine with Safety Vault', 1, 'Furniture', 'DOST PCIEERD - Establishment of BatStateU CTI', 'Conference Room', 'CTI', '', '', 'WORKING'),
(41, 41, '', '', 'Sofa ( Modular )', 1, 'Furniture', 'CHED-IDIG', 'Receiving Area', 'CTI', '', '', 'WORKING'),
(42, 42, '', '', 'Sofa lounge with table', 1, 'Furniture', 'DOST PCIEERD - Establishment of BatStateU CTI', 'Receiving Area', 'CTI', '', '', 'WORKING'),
(43, 43, '', '', 'Steel Rack', 2, 'Furniture', 'DOST CALABRZON - RIIC Calabarzon Year 1', 'Storage Room', 'CTI', '', '', 'WORKING'),
(44, 44, '', '', 'Steel Filling Cabinet', 2, 'Furniture', 'DOST PCIEERD - TBI 4.0 Year 2', 'Conference Room', 'CTI', '', '', 'WORKING'),
(45, 45, '', '', 'Swivel Chair', 1, 'Furniture', 'DOST PCIEERD - Establishment of BatStateU CTI', 'Asst. Prof. John Richard Esguerra', 'CTI', '', '', 'WORKING'),
(46, 46, '', '', 'Swivel Chair', 1, 'Furniture', 'DOST PCIEERD - Establishment of BatStateU CTI', 'Mr. Red Tarcelo', 'CTI', '', '', 'WORKING'),
(47, 47, '', '', 'Swivel Chair', 1, 'Furniture', 'DOST PCIEERD - Establishment of BatStateU CTI', 'Ms. Lovely Barbosa', 'CTI', '', '', 'WORKING'),
(48, 48, '', '', 'Wooden File Cabinet', 1, 'Furniture', 'DOST PCIEERD - Establishment of BatStateU CTI', 'Staff Workspace', 'CTI', '', '', 'WORKING'),
(49, 49, '', '', 'Wooden Easel Stand', 1, 'Furniture', 'DOST PCIEERD - TBI 4.0 Year 2', 'Co-Working Space', 'CTI', '', '', 'WORKING'),
(50, 50, '', '', 'Wooden Easel Stand', 4, 'Furniture', 'DOST PCIEERD - TBI 4.0 Year 2', 'Storage Room', 'CTI', '', '', 'WORKING'),
(51, 51, '', '', 'Zigzag workstation desk with swivel chairs', 1, 'Furniture', 'STF', 'Co-Working Space', 'CTI', '', '', 'WORKING'),
(52, 52, '', '', 'Conference table with 8 swivel chairs', 1, 'Furniture', 'STF', 'Conference Room', 'CTI', '', '', 'WORKING'),
(53, 53, '', '', 'Layer  Steel Filing Cabinet ', 2, 'Furniture', 'STF', 'Conference Room', 'CTI', '', '', 'WORKING'),
(54, 54, '', '', 'Automatic Thermal Scanner with Alcohol Auto Dispenser', 1, 'Appliance', 'DOST PCIEERD - TBI 4.0 Year 2', 'CTI', 'CTI', '', 'https://drive.google.com/file/d/1nRhpCK8D8SIcUvA4uSAMgM0YZOkQXbpR/view?usp=sharing', 'WORKING'),
(55, 55, '', '', 'Automatic Thermal Scanner with Alcohol Auto Dispenser', 1, 'Appliance', 'DOST PCIEERD - TBI 4.0 Year 2', 'Vault', 'CTI', '', 'https://drive.google.com/file/d/1nRhpCK8D8SIcUvA4uSAMgM0YZOkQXbpR/view?usp=sharing', 'WORKING'),
(56, 56, '', '', 'Automatic Thermal Scanner with Alcohol Auto Dispenser', 1, 'Appliance', 'DOST PCIEERD - TBI 4.0 Year 2', 'Ground Flr', 'CTI', '', 'https://drive.google.com/file/d/1nRhpCK8D8SIcUvA4uSAMgM0YZOkQXbpR/view?usp=sharing', 'WORKING'),
(57, 57, '', '', 'Automatic Thermal Scanner with Alcohol Auto Dispenser', 1, 'Appliance', 'DOST PCIEERD - TBI 4.0 Year 2', 'Receiving Area', 'CTI', '', 'https://drive.google.com/file/d/1nRhpCK8D8SIcUvA4uSAMgM0YZOkQXbpR/view?usp=sharing', 'WORKING'),
(58, 58, '', '', 'Coffee Maker - Asahi ', 1, 'Appliance', 'DOST PCIEERD - TBI 4.0 Year 2', 'Conference Room', 'CTI', '', '', 'WORKING'),
(59, 59, '', '', 'Coffee Maker - American Heritage', 1, 'Appliance', '', 'Conference Room', 'CTI', '', '', 'DEFECTIVE'),
(60, 60, '', '', 'Fujidenzo Two Door Personal Refrigerator', 1, 'Appliance', 'DOST PCIEERD - TBI 4.0 Year 2  ', 'Conference Room', 'CTI', '', '', 'WORKING'),
(61, 61, '', '', 'Hot and Cold Water dispenser', 1, 'Appliance', '', 'Co-Working Space', 'CTI', '', '', 'WORKING'),
(62, 62, '', '', 'Hanabishi Microwave oven', 1, 'Appliance', '', 'Conference Room', 'CTI', '', '', 'WORKING'),
(63, 63, '', '', 'Oven toaster', 1, 'Appliance', '', 'Conference Room', 'CTI', '', '', 'WORKING'),
(64, 64, '', '', 'Acer Laptop', 1, 'Device', 'DOST PCIEERD - TBI 4.0 Year 1', 'Engr. Lovely Barbosa', 'CTI', '', '', 'WORKING'),
(65, 65, '', '', 'Acer Laptop - From Sir Rojay', 1, 'Device', '', 'Conference Room', 'CTI', '', '', 'DEFECTIVE'),
(66, 66, '', '', 'Acer Swift 5 Laptop', 1, 'Device', 'CHED - IDIG', 'Ms. Jecamarie Pasay', 'CTI', '', '', 'WORKING'),
(67, 67, '', '', 'Acer Swift 5 Laptop', 1, 'Device', 'CHED - IDIG', 'Ms. Neres Ann Repollo', 'CTI', '', '', 'WORKING'),
(68, 68, '', '', 'Acer 23  G23HL', 1, 'Device', 'DOST PCIEERD - TBI 4.0 Year 1', 'Engr. Lovely Barbosa', 'CTI', '', '', 'WORKING'),
(69, 69, '', '', 'Acer 23  G23HL', 1, 'Device', 'DOST PCIEERD - TBI 4.0 Year 1', 'Mr. Red Tarcelo', 'CTI', '', '', 'WORKING'),
(70, 70, '', '', 'AOC Monitor', 1, 'Device', 'Ms. Khristia Tresvalles', '', 'CTI', '', '', 'WORKING'),
(71, 71, '', '', 'AOC Monitor', 2, 'Device', '', 'Ms. Jecamarie V. Pasay', 'CTI', '', '', 'WORKING'),
(72, 72, '', '', 'Apple Magic Mouse', 1, 'Device', '', 'Conference Room', 'CTI', '', '', 'WORKING'),
(73, 73, '', '', 'Apple Magic Keyboard', 1, 'Device', '', 'Conference Room', 'CTI', '', '', 'WORKING'),
(74, 74, '', '', 'Asus Zenbook 13 UX334FLC-1782IT', 1, 'Device', 'RDC Website and Walkthrough Development', 'Ms. Honey Lyn Tirador', 'CTI', '', '', 'WORKING'),
(75, 75, '', '', 'A4 Tech Wireless Mouse', 3, 'Device', 'DOST PCIEERD - TBI 4.0 Year 2', 'Conference Room', 'CTI', '', '', 'WORKING'),
(76, 76, '', '', 'BatStateU Thin Powerbank', 17, 'Device', '', 'Vault', 'CTI', '', '', 'WORKING'),
(77, 77, '', '', 'Brother Fax', 1, 'Device', '', 'Storage Room', 'CTI', '', '', 'WORKING'),
(78, 78, '', '', 'Carbon Fiber Tripod Kit', 1, 'Device', 'MDS', 'Conference Room', 'CTI', '', '', 'WORKING'),
(79, 79, '', '', 'Cardioid Condenser Microphone', 3, 'Device', 'DOST PCIEERD - TBI 4.0 Year 2', 'Conference Room', 'CTI', '', '', 'WORKING'),
(80, 80, '', '', 'Creative Pen Tablet', 1, 'Device', '', 'Conference Room', 'CTI', '', '', 'WORKING'),
(81, 81, '', '', 'CTI USB', 0, 'Device', '', 'Vault', 'CTI', '', '', 'WORKING'),
(82, 82, '', '', 'Laptop Computer (Dell Latitude E6440 CTO)', 1, 'Device', 'STF', 'Storage Room', 'CTI', '', '', 'DEFECTIVE'),
(83, 83, '', '', 'Dell Monitor', 1, 'Device', 'DOST PCIEERD - Establishment of BatStateU CTI', 'Co-Working Space', 'CTI', '', '', 'WORKING'),
(84, 84, '', '', 'Dell CPU Precision', 1, 'Device', '', 'Conference Room', 'CTI', '', '', 'DEFECTIVE'),
(85, 85, '', '', 'Desktop Computer', 1, 'ICT', 'RTF', 'Ms. Jecamarie Pasay', 'CTI', 'https://drive.google.com/file/d/1A3fnF9aoCczffUGRzZM15Nf7cRt9xoEC/view?usp=sharing', 'https://drive.google.com/file/d/1SvHkIYKHCHXFmAD4FcYbzw2l2L6Cax8_/view?usp=sharing', 'WORKING'),
(86, 86, '', '', 'Desktop Computer', 1, 'ICT', 'RTF', 'Ms. Honey Lyn Tirador', 'CTI', 'https://drive.google.com/file/d/1A3fnF9aoCczffUGRzZM15Nf7cRt9xoEC/view?usp=sharing', 'https://drive.google.com/file/d/1SvHkIYKHCHXFmAD4FcYbzw2l2L6Cax8_/view?usp=sharing', 'WORKING'),
(87, 87, '', '', 'Desktop Computer', 1, 'ICT', 'RTF', 'Mr. Red Tarcelo', 'CTI', 'https://drive.google.com/file/d/1A3fnF9aoCczffUGRzZM15Nf7cRt9xoEC/view?usp=sharing', 'https://drive.google.com/file/d/1SvHkIYKHCHXFmAD4FcYbzw2l2L6Cax8_/view?usp=sharing', 'WORKING'),
(88, 88, '', '', 'Desktop Computer', 1, 'ICT', 'RTF', 'SIMULATION LAB', 'CTI', 'https://drive.google.com/file/d/1A3fnF9aoCczffUGRzZM15Nf7cRt9xoEC/view?usp=sharing', 'https://drive.google.com/file/d/1SvHkIYKHCHXFmAD4FcYbzw2l2L6Cax8_/view?usp=sharing', 'WORKING'),
(89, 89, '', '', 'Desktop Computer', 1, 'ICT', 'RTF', 'GIS', 'CTI', 'https://drive.google.com/file/d/1A3fnF9aoCczffUGRzZM15Nf7cRt9xoEC/view?usp=sharing', 'https://drive.google.com/file/d/1SvHkIYKHCHXFmAD4FcYbzw2l2L6Cax8_/view?usp=sharing', 'WORKING'),
(90, 90, '', '', 'Desktop Computer', 1, 'ICT', 'RTF', 'CTI', 'CTI', 'https://drive.google.com/file/d/1A3fnF9aoCczffUGRzZM15Nf7cRt9xoEC/view?usp=sharing', 'https://drive.google.com/file/d/1SvHkIYKHCHXFmAD4FcYbzw2l2L6Cax8_/view?usp=sharing', 'WORKING'),
(91, 91, '', '', 'Desktop Computer', 2, 'ICT', 'RTF', 'PEZABSUSEZI', 'CTI', 'https://drive.google.com/file/d/1A3fnF9aoCczffUGRzZM15Nf7cRt9xoEC/view?usp=sharing', 'https://drive.google.com/file/d/1SvHkIYKHCHXFmAD4FcYbzw2l2L6Cax8_/view?usp=sharing', 'WORKING'),
(92, 92, '', '', 'Desktop Computer', 2, 'ICT', 'RTF', 'KIST', 'CTI', 'https://drive.google.com/file/d/1A3fnF9aoCczffUGRzZM15Nf7cRt9xoEC/view?usp=sharing', 'https://drive.google.com/file/d/1SvHkIYKHCHXFmAD4FcYbzw2l2L6Cax8_/view?usp=sharing', 'WORKING'),
(93, 93, '', '', 'Desktop Computer', 6, 'ICT', 'RTF', 'GADC', 'CTI', 'https://drive.google.com/file/d/1A3fnF9aoCczffUGRzZM15Nf7cRt9xoEC/view?usp=sharing', 'https://drive.google.com/file/d/1SvHkIYKHCHXFmAD4FcYbzw2l2L6Cax8_/view?usp=sharing', 'WORKING'),
(94, 94, '', '', 'Desktop Computer', 2, 'ICT', 'RTF', 'OVPRDES', 'CTI', 'https://drive.google.com/file/d/1A3fnF9aoCczffUGRzZM15Nf7cRt9xoEC/view?usp=sharing', 'https://drive.google.com/file/d/1SvHkIYKHCHXFmAD4FcYbzw2l2L6Cax8_/view?usp=sharing', 'WORKING'),
(95, 95, '', '', 'Desktop Computer', 2, 'ICT', 'RTF', 'ESRC', 'CTI', 'https://drive.google.com/file/d/1A3fnF9aoCczffUGRzZM15Nf7cRt9xoEC/view?usp=sharing', 'https://drive.google.com/file/d/1SvHkIYKHCHXFmAD4FcYbzw2l2L6Cax8_/view?usp=sharing', 'WORKING'),
(96, 96, '', '', 'Desktop Podcasting Microphone', 1, 'Device', 'DOST PCIEERD - TBI 4.0 Year 2', 'Asst. Prof. John Richard Esguerra', 'CTI', '', '', 'WORKING'),
(97, 97, '', '', 'Desktop Podcasting Microphone', 2, 'Device', 'DOST PCIEERD - TBI 4.0 Year 2', 'Conference Room', 'CTI', '', '', 'WORKING'),
(98, 98, '', '', 'Docuprint Multifunction Printer Brand: Fuji', 1, 'Device', '', 'Conference Room', 'CTI', '', '', 'WORKING'),
(99, 99, '', '', 'Epson L360', 1, 'Device', '', 'Mr. Red Tarcelo', 'CTI', '', '', 'WORKING'),
(100, 100, '', '', 'Epson L3250 Printer', 1, 'Device', '', 'Ms. Honey Lyn Tirador', 'CTI', '', '', 'WORKING'),
(101, 101, '', '', 'Epson EB-X31 Projector', 4, 'Device', 'with PCIEERD sticker, color white', 'Storage Room', 'CTI', '', '', 'WORKING'),
(102, 102, '', '', 'Extension Cords', 9, 'Device', '', 'Conference Room', 'CTI', '', '', 'WORKING'),
(103, 103, '', '', 'Globe Pocket Wifi - Black', 2, 'Device', 'Engr. Lovely Barbosa', '', 'CTI', '', '', 'WORKING'),
(104, 104, '', '', 'Globe Pocket Wifi - Black', 2, 'Device', 'Ms. Honey Lyn A. Tirador', '', 'CTI', '', '', 'WORKING'),
(105, 105, '', '', 'Globe Pocket Wifi - Black', 2, 'Device', 'Conference Room', '', 'CTI', '', '', 'WORKING'),
(106, 106, '', '', 'Globe Pocket Wifi - White', 1, 'Device', '', 'Conference Room', 'CTI', '', '', 'WORKING'),
(107, 107, '', '', 'HDMI Cords', 1, 'Device', '', 'Ms. Jecamarie Pasay', 'CTI', '', '', 'WORKING'),
(108, 108, '', '', 'HDMI Cords', 1, 'Device', '', 'Asst. Prof. John Richard Esguerra', 'CTI', '', '', 'WORKING'),
(109, 109, '', '', 'HDMI Cords', 1, 'Device', '', 'Khristia Tresvalles', 'CTI', '', '', 'WORKING'),
(110, 110, '', '', 'HDMI Cords', 1, 'Device', '', 'Ralph Aguilar', 'CTI', '', '', 'WORKING'),
(111, 111, '', '', 'HDMI Cords', 1, 'Device', '', 'Mr. Red Tarcelo', 'CTI', '', '', 'WORKING'),
(112, 112, '', '', 'HDMI Video Capture', 2, 'Device', 'DOST PCIEERD - TBI 4.0 Year 2', 'Conference Room', 'CTI', '', '', 'WORKING'),
(113, 113, '', '', 'HP Deskjet Ink Advantage 3545', 2, 'Device', '', 'Storage Room', 'CTI', '', '', 'WORKING'),
(114, 114, '', '', 'Plotter HP Designjet T520', 1, 'Device', '', 'Storage Room', 'CTI', '', '', 'WORKING'),
(115, 115, '', '', 'HP Laserjet Printer', 1, 'Device', '', 'Storage Room', 'CTI', '', '', 'DEFECTIVE'),
(116, 116, '', '', 'HP Officejet Pro 8620', 1, 'ICT', '', 'Storage Room', 'CTI', '', '', 'WORKING'),
(117, 117, '', '', 'HP Officejet Pro 8620', 1, 'ICT', '', 'OVPRDES', 'CTI', '', '', 'DEFECTIVE'),
(118, 118, '', '', 'Keyboard', 4, 'Device', 'DOST PCIEERD - TBI 4.0 Year 2', 'Conference Room', 'CTI', '', '', 'WORKING'),
(119, 119, '', '', 'Kingston USB', 1, 'Device', '', 'Engr. Lovely Barbosa', 'CTI', '', '', 'WORKING'),
(120, 120, '', '', 'Kingston USB', 1, 'Device', '', 'Mr. John Paul Heje', 'CTI', '', '', 'WORKING'),
(121, 121, '', '', 'Kingston USB', 2, 'Device', '', 'Vault', 'CTI', '', '', 'WORKING'),
(122, 122, '', '', 'Logitech Corded Mouse', 8, 'Device', '', 'Conference Room', 'CTI', '', '', 'WORKING'),
(123, 123, '', '', 'Matlab & Simulink', 1, 'Device', '', 'Vault', 'CTI', '', '', 'WORKING'),
(124, 124, '', '', 'Microphone', 5, 'Device', 'DOST PCIEERD - TBI 4.0 Year 2', 'Conference Room', 'CTI', '', '', 'WORKING'),
(125, 125, '', '', 'Microphone', 3, 'Device', 'DOST PCIEERD - TBI 4.0 Year 2', 'Storage Room', 'CTI', '', '', 'WORKING'),
(126, 126, '', '', 'Monitor Headphone', 3, 'Device', '', 'Storage Room', 'CTI', '', '', 'WORKING'),
(127, 127, '', '', 'Muratec Multi-Function System Photocopying Machine SN: DC226520009015', 1, 'Device', 'DOST PCIEERD - Establishment of BatStateU CTI', 'Storage Room', 'CTI', '', '', 'WORKING'),
(128, 128, '', '', 'MySQL', 1, 'Device', 'DOST PCIEERD - Establishment of BatStateU CTI', 'Software', 'CTI', '', '', 'WORKING'),
(129, 129, '', '', 'Nikon D5300 DSLR Camera with AF-P 18-55mm Lens', 1, 'Device', '', 'Conference Room', 'CTI', '', '', 'WORKING'),
(130, 130, '', '', 'Nikon D5300 DSLR Camera with AF-P 18-55mm Lens', 1, 'Device', '', 'SD Card c/o Emman of ROBIN borrowed for SCAN Program', 'CTI', '', '', 'WORKING'),
(131, 131, '', '', 'OTG Kingston', 1, 'Device', '', 'Vault', 'CTI', '', '', 'WORKING'),
(132, 132, '', '', 'OTG Kingston', 1, 'Device', '', 'Ms. Jecamarie V. Pasay', 'CTI', '', '', 'WORKING'),
(133, 133, '', '', 'Paper Shredder', 1, 'Device', '', 'Storage Room', 'CTI', '', '', 'DEFECTIVE'),
(134, 134, '', '', 'Panasonic DP-MB250 Fax Machine', 1, 'Device', '', 'Storage Room', 'CTI', '', '', 'DEFECTIVE'),
(135, 135, '', '', 'Panasonic LB330 XGA Projector', 3, 'Device', 'with PCIEERD sticker, color white', 'Storage Room', 'CTI', '', '', 'WORKING'),
(136, 136, '', '', 'Portable Trolley Speaker', 2, 'Device', 'DOST PCIEERD - TBI 4.0 Year 2', 'Storage Room', 'CTI', '', '', 'WORKING'),
(137, 137, '', '', 'Power Bank - Xiaomi', 1, 'Device', '', 'Ms. Neres Repollo', 'CTI', '', '', 'WORKING'),
(138, 138, '', '', 'Power Bank - Xiaomi', 1, 'Device', '', 'Jecamarie Pasay', 'CTI', '', '', 'DEFECTIVE'),
(139, 139, '', '', 'Projector Optoma', 1, 'Device', '', 'Conference Room', 'CTI', '', '', 'WORKING'),
(140, 140, '', '', 'Red Spartan USB', 3, 'Device', '', 'Vault', 'CTI', '', '', 'WORKING'),
(141, 141, '', '', 'Ring Binder Machine', 1, 'Device', '', 'Conference Room', 'CTI', '', '', 'WORKING'),
(142, 142, '', '', 'Romoss Powerbank', 1, 'Device', 'DOST PCIEERD - TBI 4.0 Year 2', 'Engr. Lovely Barbosa', 'CTI', '', '', 'WORKING'),
(143, 143, '', '', 'Romoss Powerbank', 1, 'Device', 'DOST PCIEERD - TBI 4.0 Year 2', 'Ms. Honey Lyn Tirador', 'CTI', '', '', 'WORKING'),
(144, 144, '', '', 'Romoss Powerbank', 1, 'Device', 'DOST PCIEERD - TBI 4.0 Year 2', 'Ms. Jecamarie Pasay', 'CTI', '', '', 'WORKING'),
(145, 145, '', '', 'Romoss Powerbank', 2, 'Device', 'DOST PCIEERD - TBI 4.0 Year 2', 'Conference Room', 'CTI', '', '', 'WORKING'),
(146, 146, '', '', 'Seagate External Hard Drive', 1, 'ICT', 'DOST PCIEERD - Establishment of BatStateU CTI', 'M.s Bonzai', 'CTI', '', 'https://drive.google.com/file/d/18HqwbjZzUuiuCyGPD2p0m-zu61281bhv/view?usp=sharing', 'WORKING'),
(147, 147, '', '', 'Seagate External Hard Drive', 1, 'ICT', 'DOST PCIEERD - Establishment of BatStateU CTI', 'Mr. Apollo Malaluan', 'CTI', '', 'https://drive.google.com/file/d/18HqwbjZzUuiuCyGPD2p0m-zu61281bhv/view?usp=sharing', 'WORKING'),
(148, 148, '', '', 'Seagate External Hard Drive', 1, 'ICT', 'DOST PCIEERD - Establishment of BatStateU CTI', 'Ms. Honey Lyn Tirador', 'CTI', '', 'https://drive.google.com/file/d/18HqwbjZzUuiuCyGPD2p0m-zu61281bhv/view?usp=sharing', 'WORKING'),
(149, 149, '', '', 'Seagate External Hard Drive', 1, 'ICT', 'DOST PCIEERD - Establishment of BatStateU CTI', 'Engr. Neres Repollo', 'CTI', '', 'https://drive.google.com/file/d/18HqwbjZzUuiuCyGPD2p0m-zu61281bhv/view?usp=sharing', 'WORKING'),
(150, 150, '', '', 'Smartphone/DSLR Teleprompter', 2, 'Device', 'DOST PCIEERD - TBI 4.0 Year 2', 'Conference Room', 'CTI', '', '', 'WORKING'),
(151, 151, '', '', 'Smart Pocket Wifi', 1, 'Device', '', 'Engr. Lovely Barbosa', 'CTI', '', '', 'WORKING'),
(152, 152, '', '', 'Smart Pocket Wifi', 2, 'Device', '', 'Conference Room', 'CTI', '', '', 'WORKING'),
(153, 153, '', '', 'Sony Smart TV 65 ', 1, 'Device', 'DOST PCIEERD - TBI 4.0 Year 2', 'Co-Working Space', 'CTI', '', '', 'WORKING'),
(154, 154, '', '', 'Sony Smart TV 65 ', 1, 'Device', 'DOST PCIEERD - TBI 4.0 Year 2', 'Conference Room', 'CTI', '', '', 'WORKING'),
(155, 155, '', '', 'Stereo Microphone ', 1, 'Device', '', 'Vault', 'CTI', '', '', 'WORKING'),
(156, 156, '', '', 'Super Speed Portable Hard Drive', 5, 'Device', '', 'Vault', 'CTI', '', '', 'WORKING'),
(157, 157, '', '', 'Tablet', 1, 'Device', '', 'Ms. Honey Lyn Tirador', 'CTI', '', '', 'WORKING'),
(158, 158, '', '', 'Tablet with Stand', 1, 'Device', 'DOST PCIEERD - TBI 4.0 Year 2', 'Ms. Jecamarie V. Pasay', 'CTI', '', '', 'WORKING'),
(159, 159, '', '', 'Tablet with Stand', 1, 'Device', 'DOST PCIEERD - TBI 4.0 Year 2', 'Engr. Lovely Barbosa', 'CTI', '', '', 'WORKING'),
(160, 160, '', '', 'TV Stand ', 1, 'Device', '', 'Conference Room', 'CTI', '', '', 'WORKING'),
(161, 161, '', '', 'TV Stand ', 1, 'Device', '', 'Co-Working Space', 'CTI', '', '', 'WORKING'),
(162, 162, '', '', 'Transistor Megaphone', 1, 'Device', 'STF', 'Conference Room', 'CTI', '', '', 'WORKING'),
(163, 163, '', '', 'Uninterrupted Power Supply (UPS)', 1, 'Device', '', 'Mr. Red Tarcelo', 'CTI', '', '', 'WORKING'),
(164, 164, '', '', 'USB Card Reader', 1, 'Device', 'DOST PCIEERD - TBI 4.0 Year 2', 'Ms. Honey Lyn Tirador', 'CTI', '', '', 'WORKING'),
(165, 165, '', '', 'USB Card Reader', 1, 'Device', 'DOST PCIEERD - TBI 4.0 Year 2', 'Conference Room', 'CTI', '', '', 'WORKING'),
(166, 166, '', '', 'USB Hub Hi-Speed', 3, 'Device', '', 'Vault', 'CTI', '', '', 'WORKING'),
(167, 167, '', '', 'VGA Cords', 16, 'Device', '', 'Conference Room', 'CTI', '', '', 'WORKING'),
(168, 168, '', '', 'VGA Cords', 1, 'Device', '', 'Ms. Jecamarie Pasay', 'CTI', '', '', 'WORKING'),
(169, 169, '', '', 'Webcam', 1, 'Device', 'DOST PCIEERD - TBI 4.0 Year 2', 'Ms. Jecamarie V. Pasay', 'CTI', '', '', 'WORKING'),
(170, 170, '', '', 'Webcam', 1, 'Device', 'DOST PCIEERD - TBI 4.0 Year 2', 'Asst. Prof. John Richard Esguerra', 'CTI', '', '', 'WORKING'),
(171, 171, '', '', 'Webcam', 1, 'Device', 'DOST PCIEERD - TBI 4.0 Year 2', 'Ms. Lovely Barbosa', 'CTI', '', '', 'WORKING'),
(172, 172, '', '', 'Webcam', 1, 'Device', 'DOST PCIEERD - TBI 4.0 Year 2', 'Ms. Marielle Rosales', 'CTI', '', '', 'WORKING'),
(173, 173, '', '', 'Webcam', 1, 'Device', 'DOST PCIEERD - TBI 4.0 Year 2', 'Engr. John Paul Heje', 'CTI', '', '', 'WORKING'),
(174, 174, '', '', 'Transcend External Hard Drive 1TB', 1, 'Device', '', 'Ms. Lovely Barbosa', 'CTI', '', '', 'WORKING'),
(175, 175, '', '', 'Transcend External Hard Drive 1TB', 1, 'Device', '', 'Ms. Laisa', 'CTI', '', '', 'WORKING'),
(176, 176, '', '', 'Transcend External Hard Drive 1TB', 1, 'Device', '', 'Fatima Rosales', 'CTI', '', '', 'WORKING'),
(177, 177, '', '', 'Transcend External Hard Drive 1TB', 1, 'Device', '', 'Ms. Honey Lyn Tirador', 'CTI', '', '', 'WORKING'),
(178, 178, '', '', 'Transcend External Hard Drive 1TB', 1, 'Device', '', 'Asst. Prof. John Richard Esguerra', 'CTI', '', '', 'WORKING'),
(179, 179, '', '', 'Transcend External Hard Drive 1TB', 1, 'Device', '', 'Engr. Neres Repollo', 'CTI', '', '', 'WORKING'),
(180, 180, '', '', 'Transcend External Hard Drive 1TB', 1, 'Device', '', 'Jecamarie Pasay', 'CTI', '', '', 'DEFECTIVE'),
(181, 181, '', '', 'Hanabishi Refrigerator ', 1, 'Appliance', 'DOST PCIEERD - Establishment of BatStateU CTI', 'OVPRDES', 'CTI', '', '', 'WORKING'),
(182, 182, '', '', 'Bean bags - Basic Round', 2, 'Furniture', 'DOST PCIEERD - Establishment of BatStateU CTI', 'DTC', 'CTI', '', '', 'WORKING'),
(183, 183, '', '', 'Bean bags - Tear Drop', 1, 'Furniture', 'DOST PCIEERD - Establishment of BatStateU CTI', 'DTC', 'CTI', '', '', 'WORKING'),
(184, 184, '', '', 'Conference Table', 1, 'Furniture', 'RTF', 'STEER HUB', 'CTI', '', '', 'WORKING'),
(185, 185, '', '', 'Modular Sofa (Black)', 1, 'Furniture', 'CHED IDIG - TechHub', 'OVPRDES', 'CTI', '', 'https://drive.google.com/file/d/1eKIXQkyK6kLgEPqkfkee8B0390kzbULW/view?usp=share_link', 'WORKING'),
(186, 186, '', '', 'Modular Sofa (Gray)', 1, 'Furniture', 'CHED IDIG - TechHub', 'OVPRDES', 'CTI', '', 'https://drive.google.com/file/d/1PJTaZG7lNuawf4FOsWOcrRtiucpaB1i4/view?usp=share_link', 'WORKING'),
(187, 187, '', '', 'Office Chairs', 14, 'Furniture', 'STF', 'STEER HUB', 'CTI', '', '', 'WORKING'),
(188, 188, '', '', 'Office Tables', 4, 'Furniture', '', 'Locators Space', 'CTI', '', '', 'WORKING'),
(189, 189, '', '', 'L-Shaped Office Workstation Tables', 1, 'Furniture', 'RTF', 'KIST', 'CTI', '', '', 'WORKING'),
(190, 190, '', '', 'L-Shaped Office Workstation Tables', 1, 'Furniture', 'RTF', 'PEZABSUSEZI', 'CTI', '', '', 'WORKING'),
(191, 191, '', '', 'Steel Shelving Rack', 2, 'Furniture', '', 'ESRC', 'CTI', '', 'https://drive.google.com/file/d/11oEPW1YjYZKjy4fnxuScQt55fF8bfCsM/view?usp=sharing', 'WORKING'),
(192, 192, '', '', 'Sofa', 1, 'Furniture', '', 'OVPRDES', 'CTI', '', '', 'WORKING'),
(193, 193, '', '', 'Altium Development and Training License', 1, 'Computer Software', '', 'ESRC', 'CTI', '', 'https://drive.google.com/file/d/1sdwponXue1A5pmFidPEZGa3F1Zsg5gwM/view?usp=share_link', 'WORKING'),
(194, 194, '', '', 'Red Hat License', 1, 'Computer Software', 'DOST PCIEERD - Establishment of BatStateU CTI', 'ESRC', 'CTI', '', 'https://drive.google.com/file/d/1QNta0nXcXAkRw4Jx5BdEGB1JLekM8rLp/view?usp=sharing', 'WORKING'),
(195, 195, '', '', 'All in one Desktop PC', 1, 'ICT', 'STF', 'DTC', 'CTI', '', '', 'WORKING'),
(196, 196, '', '', 'Amplifier', 1, 'ICT', '', 'STEER HUB', 'CTI', '', 'https://drive.google.com/file/d/16lnX6HkRb1GMFFGnOzvNoXs-Ru9WNCHb/view?usp=sharing', 'WORKING'),
(197, 197, '', '', 'Connectivity: LCD display control, SD Card support, USB printing direct', 0, 'ICT', 'DOST PCIEERD - Establishment of BatStateU CTI', 'ESRC', 'CTI', '', 'https://drive.google.com/file/d/1DVoAv-hs2Bq5BJS5hwPdFd2YHd-OjdWU/view?usp=share_link', 'WORKING'),
(198, 198, '', '', 'Dell - XPS Silver', 1, 'ICT', 'DOST PCIEERD - Establishment of BatStateU CTI', 'Engr. Albertson Amante', 'CTI', '', 'https://drive.google.com/file/d/1VU-VkHf_9AKkwOZ46N0P1fTFdMunY8GQ/view?usp=share_link', 'WORKING'),
(199, 199, '', '', 'Double Shielded SMB to BNC Male Coax, 50 ohm, 1m', 1, 'ICT', 'MDS', 'ESRC', 'CTI', '', '', 'WORKING'),
(200, 200, '', '', 'LED TV Devant', 1, 'ICT', '', 'CTI', 'CTI', '', 'https://drive.google.com/file/d/1O8pLZ3bNklsr18Bhxw49QyNslqAD8YHM/view?usp=share_link', 'WORKING'),
(201, 201, '', '', 'LED TV Devant', 1, 'ICT', '', 'GADC', 'CTI', '', 'https://drive.google.com/file/d/1O8pLZ3bNklsr18Bhxw49QyNslqAD8YHM/view?usp=share_link', 'WORKING'),
(202, 202, '', '', 'Mixer 8 Channel', 1, 'ICT', '', 'STEER HUB', 'CTI', '', 'https://drive.google.com/file/d/1YDjysfJOaoq4H-GsCOjF4miWik4nt1Ux/view?usp=sharing', 'WORKING'),
(203, 203, '', '', 'Mobile Stand', 1, 'ICT', '', 'inside VP Alberts Office', 'CTI', '', 'https://drive.google.com/file/d/1Qfd6Boco-E52skauwulkxVYEfKCE84U7/view?usp=sharing', 'WORKING'),
(204, 204, '', '', 'Multifunction Digital Copier Machine', 1, 'ICT', '', 'OVPRDES', 'CTI', '', 'https://drive.google.com/file/d/1bvrzzXq0s5YJLPsIO8H8dYDpmQ_xWc4m/view?usp=sharing', 'DEFECTIVE'),
(205, 205, '', '', 'Speaker', 1, 'ICT', '', 'ESRC', 'CTI', '', 'https://drive.google.com/file/d/15QhF6sjIlV-nhrrvFo-CdYgH2KjIjDNf/view?usp=sharing', 'WORKING'),
(206, 206, '', '', 'Ultrabook Laptop', 1, 'ICT', '', 'Engr. Albertson Amante', 'CTI', '', 'https://drive.google.com/file/d/1N7LgpdTkl3oQGw_bWlUYzclIamuRgojC/view?usp=share_link', 'WORKING'),
(207, 207, '', '', 'Transcend External Hard Drive 2TB', 1, 'ICT', '', 'Mhagie De Chavez', 'CTI', 'https://drive.google.com/file/d/18TEdNK4mGo1lgFuNITMRttuJ_hDmsEYg/view?usp=sharing', '', 'WORKING'),
(208, 208, '', '', 'Transcend External Hard Drive 2TB', 1, 'ICT', '', 'John Paul Heje', 'CTI', 'https://drive.google.com/file/d/18TEdNK4mGo1lgFuNITMRttuJ_hDmsEYg/view?usp=sharing', '', 'WORKING'),
(209, 209, '', '', '27\" iMAC with Retina 5K Display', 1, 'ICT', '', 'DTC', 'CTI', '', 'https://drive.google.com/file/d/1vtANGssrTZhUbcbB6ivUKpn_gyXiEw5_/view?usp=share_link', 'WORKING'),
(210, 210, '', '', '3D Printer Essentials', 1, 'ICT', 'DOST PCIEERD - Establishment of BatStateU CTI', 'ESRC', 'CTI', '', 'https://drive.google.com/file/d/1QpRo8-PE5abjI-BZtchLpYJt4VyaEas0/view?usp=share_link', 'WORKING'),
(211, 211, '', '', '3D Printer with Filament and Educational Pack', 1, 'ICT', 'DOST PCIEERD - Establishment of BatStateU CTI', 'ESRC', 'CTI', '', 'https://drive.google.com/file/d/1pK9gL2_tg3a9dWOgD8IA1Dr5bxE6I2RI/view?usp=share_link', 'WORKING'),
(212, 212, '', '', '3D Printer', 3, 'ICT', 'DOST PCIEERD - Establishment of BatStateU CTI', 'ESRC', 'CTI', '', 'https://drive.google.com/file/d/1QpRo8-PE5abjI-BZtchLpYJt4VyaEas0/view?usp=sharing', 'WORKING'),
(213, 213, '', '', 'Advisor Generated System', 1, 'Technical Equipment', 'MDS', 'ESRC', 'CTI', 'https://drive.google.com/file/d/1_UFgVFRJiMQNSzkcGxbOXwda3f-EN1l5/view?usp=share_link', '', 'WORKING'),
(214, 214, '', '', 'Altera FPGA Development Kit', 2, 'Technical Equipment', 'STF', 'ESRC', 'CTI', '', '', 'WORKING'),
(215, 215, '', '', 'Automated Weather Station', 2, 'Technical Equipment', 'STF', 'ESRC', 'CTI', '', '', 'WORKING'),
(216, 216, '', '', 'Battery Charger Model: Energy 8 Plus', 1, 'Technical Equipment', '', 'ESRC', 'CTI', '', 'https://drive.google.com/file/d/1QHre9FpQWzdhoBy9QdlCEGvpw0feuLfJ/view?usp=share_link', 'WORKING'),
(217, 217, '', '', 'Bench Magnifier, Table Clamp Mount w/ accessories', 1, 'Technical Equipment', 'RTF', 'ESRC', 'CTI', '', '', 'WORKING'),
(218, 218, '', '', 'Bench Top Ioniser w/ mounting Arm & Power Cable', 1, 'Technical Equipment', 'DOST PCIEERD - Establishment of BatStateU CTI', 'ESRC', 'CTI', '', '', 'WORKING'),
(219, 219, '', '', 'Combined Frequency Counter and Function Generator with AM/FM Modulation, Model GFG-8255', 2, 'Technical Equipment', '', 'ESRC', 'CTI', '', '', 'WORKING'),
(220, 220, '', '', 'Current Clamp Adapter, Model: Fluke i410', 1, 'Technical Equipment', '', 'ESRC', 'CTI', '', '', 'WORKING'),
(221, 221, '', '', 'Data Acquisition Board', 1, 'Technical Equipment', 'STF', 'ESRC', 'CTI', 'https://drive.google.com/file/d/1BMXtoGXX-kg9QNTd0xsMCMKF1JhDZjbk/view?usp=share_link', '', 'WORKING'),
(222, 222, '', '', 'DAQ System', 1, 'Technical Equipment', '', 'ESRC', 'CTI', '', '', 'WORKING'),
(223, 223, '', '', 'Digital Handheld Multimeter', 1, 'Technical Equipment', 'DOST PCIEERD - Establishment of BatStateU CTI', 'ESRC', 'CTI', '', 'https://drive.google.com/file/d/1AsvSNklV45Tiy56sh-TGMvEs_kbYvz66/view?usp=sharing', 'WORKING'),
(224, 224, '', '', 'Double-Sided UV Exposure Unit', 1, 'Technical Equipment', 'DOST PCIEERD - Establishment of BatStateU CTI', 'ESRC', 'CTI', '', '', 'WORKING'),
(225, 225, '', '', 'Embedded Control & Monitoring Suite, USB', 1, 'Technical Equipment', 'MDS', 'ESRC', 'CTI', 'https://drive.google.com/file/d/1BMXtoGXX-kg9QNTd0xsMCMKF1JhDZjbk/view?usp=share_link', '', 'WORKING'),
(226, 226, '', '', 'Eureka Water Probes', 1, 'Technical Equipment', '', 'ESRC', 'CTI', '', '', 'WORKING'),
(227, 227, '', '', 'Fabrication and Materials of Biodiesel Reactor ', 1, 'Technical Equipment', '', 'AUTOMATIC MOTORS', 'CTI', '', 'https://drive.google.com/file/d/1oS8DBk7_7NzAYa-83JwD1Au2k_XaQPbp/view?usp=share_link', 'WORKING'),
(228, 228, '', '', 'Fixed Wing Aerial Drone w/ Multispectural Camera', 1, 'Technical Equipment', 'STF', 'ESRC', 'CTI', '', 'https://drive.google.com/file/d/17DliJ8icc8KU_7tf8XQN4jAhOg_veAYl/view?usp=share_link', 'WORKING'),
(229, 229, '', '', 'Gas Detector', 1, 'Technical Equipment', 'STF', 'ESRC', 'CTI', '', '', 'WORKING'),
(230, 230, '', '', 'Modular Engineering Platform', 1, 'Technical Equipment', 'MDS', 'ESRC', 'CTI', '', '', 'WORKING'),
(231, 231, '', '', 'myRIO University Bundle', 8, 'Technical Equipment', 'MDS', 'ESRC', 'CTI', '', '', 'WORKING'),
(232, 232, '', '', 'Multi Parameter Water Quality Meter', 1, 'Technical Equipment', 'STF', 'ESRC', 'CTI', '', 'https://drive.google.com/file/d/17DliJ8icc8KU_7tf8XQN4jAhOg_veAYl/view?usp=share_link', 'WORKING'),
(233, 233, '', '', 'NI DATA Acquisition Platform', 1, 'Technical Equipment', 'STF', 'ESRC', 'CTI', '', '', 'WORKING'),
(234, 234, '', '', 'NI Dynamic Signal Analyzer', 1, 'Technical Equipment', 'STF', 'ESRC', 'CTI', '', '', 'WORKING'),
(235, 235, '', '', 'Onset Water Level Logger', 3, 'Technical Equipment', 'STF', 'ESRC', 'CTI', '', 'https://drive.google.com/file/d/17DliJ8icc8KU_7tf8XQN4jAhOg_veAYl/view?usp=share_link', 'WORKING'),
(236, 236, '', '', 'Optic USB Base Station (BaseU-4)', 1, 'Technical Equipment', '', 'ESRC', 'CTI', '', 'https://drive.google.com/file/d/13r9tXcDfaGqYS7lGQ4tVujAe9IHtFGIW/view?usp=share_link', 'WORKING'),
(237, 237, '', '', 'Oscilloscope Probe', 1, 'Technical Equipment', 'DOST PCIEERD - Establishment of BatStateU CTI', 'ESRC', 'CTI', '', 'https://drive.google.com/file/d/1o5kgQkhDexd1kxHwjV0cKjvQgjwWyKXU/view?usp=sharing', 'WORKING'),
(238, 238, '', '', 'Platform for sensors and Instrumentaion Teaching Research', 1, 'Technical Equipment', 'STF', 'ESRC', 'CTI', '', '', 'WORKING'),
(239, 239, '', '', 'Power Block', 1, 'Technical Equipment', 'MDS', 'ESRC', 'CTI', '', '', 'WORKING'),
(240, 240, '', '', 'Power Dock', 1, 'Technical Equipment', 'MDS', 'ESRC', 'CTI', '', '', 'WORKING'),
(241, 241, '', '', 'Prototype Board', 1, 'Technical Equipment', 'STF', 'ESRC', 'CTI', '', '', 'WORKING'),
(242, 242, '', '', 'PXI 4498', 1, 'Technical Equipment', 'MDS', 'ESRC', 'CTI', '', '', 'WORKING'),
(243, 243, '', '', 'Replacement Multi-Meter Fuse', 1, 'Technical Equipment', 'N/A', 'ESRC', 'CTI', '', 'https://drive.google.com/file/d/1tvwTHUqBYYWb9cxBA0ywFkWtNjYACfTY/view?usp=share_link', 'WORKING'),
(244, 244, '', '', 'Sound Vibration Tool Kit', 1, 'Technical Equipment', 'MDS', 'ESRC', 'CTI', 'https://drive.google.com/file/d/1BMXtoGXX-kg9QNTd0xsMCMKF1JhDZjbk/view?usp=share_link', '', 'WORKING'),
(245, 245, '', '', 'SMD Rework Station', 1, 'Technical Equipment', 'RTF', 'ESRC', 'CTI', '', '', 'WORKING'),
(246, 246, '', '', 'Targets System Kit', 1, 'Technical Equipment', 'MDS', 'ESRC', 'CTI', '', '', 'WORKING'),
(247, 247, '', '', 'Temperature Sensor', 6, 'Technical Equipment', 'STF', 'ESRC', 'CTI', '', '', 'WORKING'),
(248, 248, '', '', 'Touch Screen Monitor, 15\"', 1, 'Technical Equipment', 'MDS', 'ESRC', 'CTI', '', '', 'WORKING'),
(249, 249, '', '', 'USB Dongle, single user', 1, 'Technical Equipment', 'MDS', 'CTI', 'CTI', '', '', 'WORKING'),
(250, 250, '', '', '\"USB-6009 14 Bit, 48 kS/s Multifunction I/O & Daqmx Software\"', 1, 'Technical Equipment', 'MDS', 'ESRC', 'CTI', '', '', 'WORKING'),
(251, 251, '', '', 'USB-6353', 1, 'Technical Equipment', 'MDS', 'ESRC', 'CTI', '', '', 'WORKING'),
(252, 252, '', '', 'Water Flow/ Current Meter', 2, 'Technical Equipment', 'STF', 'ESRC', 'CTI', '', 'https://drive.google.com/file/d/17DliJ8icc8KU_7tf8XQN4jAhOg_veAYl/view?usp=share_link', 'WORKING'),
(253, 253, '', '', 'Weather Monitoring System', 2, 'Technical Equipment', 'MDS', 'ESRC', 'CTI', '', '', 'WORKING'),
(254, 254, '', '', '200MHz 4 Analog and 16 Digital Channel Mixed Signal Oscilloscope', 1, 'Technical Equipment', 'DOST PCIEERD - Establishment of BatStateU CTI', 'ESRC', 'CTI', '', '', 'WORKING'),
(255, 255, '', '', '2.2 GHz Celeron 1020E Dual Core Windows 7', 1, 'Technical Equipment', 'MDS', 'ESRC', 'CTI', 'https://drive.google.com/file/d/1BMXtoGXX-kg9QNTd0xsMCMKF1JhDZjbk/view?usp=share_link', '', 'WORKING'),
(256, 256, '', '', '2-CH, 100MS/s Digitizer w/ 64MB/ch Onboard Memory', 1, 'Technical Equipment', 'MDS', 'ESRC', 'CTI', 'https://drive.google.com/file/d/1BMXtoGXX-kg9QNTd0xsMCMKF1JhDZjbk/view?usp=share_link', '', 'WORKING'),
(257, 257, '', '', '6 1/2 Digitflex DMM, LCR', 1, 'Technical Equipment', 'MDS', 'ESRC', 'CTI', 'https://drive.google.com/file/d/1BMXtoGXX-kg9QNTd0xsMCMKF1JhDZjbk/view?usp=share_link', '', 'WORKING');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `id` int(10) NOT NULL,
  `location` varchar(99) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `location`) VALUES
(1, 'Co-Working Space'),
(2, 'Storage Room'),
(3, 'Staff Workspace'),
(4, 'Locators Space'),
(5, 'Conference Room'),
(7, 'Receiving Area'),
(9, 'STEER HUB'),
(10, 'Vault'),
(11, 'Outside Office'),
(12, 'Pantry'),
(13, 'OVPRDES'),
(14, 'Engr. Albertson Amante'),
(15, 'Office of VP Albert'),
(16, 'Dell Server at ESRC'),
(17, 'Mr. Apollo Malaluan'),
(18, 'M.s Bonzai'),
(19, 'Mhagie De Chavez'),
(20, 'John Paul Heje'),
(21, 'Dr. Romel Briones'),
(27, 'Ground Flr'),
(28, 'AVR'),
(29, 'FabLab'),
(30, 'SIMULATION LAB'),
(31, 'GADC'),
(32, 'AUTOMATIC MOTORS'),
(33, 'Engr. Neres Repollo');

-- --------------------------------------------------------

--
-- Table structure for table `ownership`
--

CREATE TABLE `ownership` (
  `id` int(10) NOT NULL,
  `item_id` varchar(99) NOT NULL,
  `quantity` int(11) NOT NULL,
  `specific` varchar(99) NOT NULL,
  `location` varchar(99) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ownership`
--

INSERT INTO `ownership` (`id`, `item_id`, `quantity`, `specific`, `location`) VALUES
(2, '2', 2, 'Co-Working Space', 'CTI'),
(4, '4', 2, 'Co-Working Space', 'CTI'),
(5, '5', 1, 'Co-Working Space', 'CTI'),
(6, '5', 1, 'Storage Room', 'CTI'),
(7, '6', 1, 'Storage Room', 'CTI'),
(8, '7', 4, 'Co-Working Space', 'CTI'),
(9, '8', 1, 'Ms. Jecamarie Pasay', 'CTI'),
(10, '8', 1, 'Ms. Honey Lyn Tirador', 'CTI'),
(11, '9', 2, 'Co-Working Space', 'CTI'),
(12, '9', 5, 'Locators Space', 'CTI'),
(13, '9', 2, 'Locators Space', 'CTI'),
(14, '9', 4, 'Storage Room', 'CTI'),
(15, '9', 2, 'PEZA', 'CTI'),
(16, '10', 1, 'Staff Workspace', 'CTI'),
(17, '11', 1, 'Conference Room', 'CTI'),
(18, '12', 2, 'Co-Working Space', 'CTI'),
(19, '13', 3, 'Storage Room', 'CTI'),
(20, '14', 3, 'Storage Room', 'CTI'),
(21, '15', 6, 'STEER HUB', 'CTI'),
(23, '17', 7, 'Conference Room', 'CTI'),
(24, '17', 1, 'Asst. Prof. John Richard Esguerra', 'CTI'),
(25, '17', 1, 'Ms. Honey Lyn A. Tirador', 'CTI'),
(26, '17', 1, 'Mr. Red Tarcelo', 'CTI'),
(27, '17', 1, 'Ms. Jecamarie Pasay', 'CTI'),
(28, '17', 1, 'Engr. Lovely Barbosa', 'CTI'),
(30, '19', 1, 'Co-Working Space', 'CTI'),
(31, '20', 3, 'Locators Space', 'CTI'),
(34, '23', 1, 'Co-Working Space', 'CTI'),
(35, '24', 1, 'Conference Room', 'CTI'),
(36, '25', 1, 'Receiving Area', 'CTI'),
(37, '26', 1, 'Receiving Area', 'CTI'),
(38, '27', 2, 'Storage Room', 'CTI'),
(39, '28', 1, 'Conference Room', 'CTI'),
(40, '29', 1, 'Asst. Prof. John Richard Esguerra', 'CTI'),
(41, '29', 1, 'Mr. Red Tarcelo', 'CTI'),
(42, '29', 1, 'Ms. Lovely Barbosa', 'CTI'),
(43, '30', 1, 'Staff Workspace', 'CTI'),
(44, '31', 1, 'Co-Working Space', 'CTI'),
(45, '31', 4, 'Storage Room', 'CTI'),
(46, '32', 1, 'Co-Working Space', 'CTI'),
(47, '33', 1, 'Conference Room', 'CTI'),
(48, '34', 2, 'Conference Room', 'CTI'),
(52, '36', 1, 'Conference Room', 'CTI'),
(53, '37', 1, 'Conference Room', 'CTI'),
(54, '38', 1, 'Conference Room', 'CTI'),
(55, '39', 1, 'Co-Working Space', 'CTI'),
(56, '40', 1, 'Conference Room', 'CTI'),
(57, '41', 1, 'Conference Room', 'CTI'),
(58, '42', 1, 'Engr. Lovely Barbosa', 'CTI'),
(59, '43', 1, 'Conference Room', 'CTI'),
(60, '44', 1, 'Ms. Jecamarie Pasay', 'CTI'),
(61, '44', 1, 'Ms. Neres Ann Repollo', 'CTI'),
(62, '45', 1, 'Engr. Lovely Barbosa', 'CTI'),
(63, '45', 1, 'Mr. Red Tarcelo', 'CTI'),
(64, '46', 1, 'Ms. Khristia Tresvalles', 'CTI'),
(65, '46', 2, 'Ms. Jecamarie V. Pasay', 'CTI'),
(66, '47', 1, 'Conference Room', 'CTI'),
(67, '48', 1, 'Conference Room', 'CTI'),
(68, '49', 1, 'Ms. Honey Lyn Tirador', 'CTI'),
(69, '50', 3, 'Conference Room', 'CTI'),
(70, '51', 17, 'Vault', 'CTI'),
(71, '52', 1, 'Storage Room', 'CTI'),
(72, '53', 1, 'Conference Room', 'CTI'),
(73, '54', 3, 'Conference Room', 'CTI'),
(74, '55', 1, 'Conference Room', 'CTI'),
(75, '56', 0, 'Vault', 'CTI'),
(76, '57', 1, 'Storage Room', 'CTI'),
(77, '58', 1, 'Co-Working Space', 'CTI'),
(78, '59', 1, 'Conference Room', 'CTI'),
(82, '61', 1, 'Asst. Prof. John Richard Esguerra', 'CTI'),
(83, '61', 2, 'Conference Room', 'CTI'),
(84, '62', 1, 'Conference Room', 'CTI'),
(85, '63', 1, 'Mr. Red Tarcelo', 'CTI'),
(86, '64', 1, 'Ms. Honey Lyn Tirador', 'CTI'),
(87, '65', 4, 'Storage Room', 'CTI'),
(88, '66', 9, 'Conference Room', 'CTI'),
(89, '67', 2, 'Engr. Lovely Barbosa', 'CTI'),
(90, '67', 2, 'Ms. Honey Lyn A. Tirador', 'CTI'),
(91, '67', 2, 'Conference Room', 'CTI'),
(92, '68', 1, 'Conference Room', 'CTI'),
(93, '69', 1, 'Asst. Prof. John Richard Esguerra', 'CTI'),
(94, '69', 1, 'Khristia Tresvalles', 'CTI'),
(95, '69', 1, 'Ralph Aguilar', 'CTI'),
(96, '69', 1, 'Mr. Red Tarcelo', 'CTI'),
(97, '69', 1, 'Ms. Jecamarie Pasay', 'CTI'),
(98, '70', 2, 'Conference Room', 'CTI'),
(99, '71', 2, 'Storage Room', 'CTI'),
(100, '72', 1, 'Storage Room', 'CTI'),
(101, '73', 1, 'Storage Room', 'CTI'),
(103, '75', 4, 'Conference Room', 'CTI'),
(104, '76', 1, ' Engr. Lovely Barbosa', 'CTI'),
(105, '76', 1, ' Mr. John Paul Heje', 'CTI'),
(106, '76', 2, ' Vault', 'CTI'),
(107, '77', 8, 'Conference Room', 'CTI'),
(108, '78', 1, 'Vault', 'CTI'),
(109, '79', 5, 'Conference Room', 'CTI'),
(110, '79', 3, 'Storage Room', 'CTI'),
(111, '80', 3, 'Storage Room', 'CTI'),
(112, '81', 1, 'Storage Room', 'CTI'),
(113, '82', 1, 'Software', 'CTI'),
(114, '83', 1, 'Conference Room', 'CTI'),
(115, '83', 1, 'SD Card c/o Emman of ROBIN borrowed for SCAN Program', 'CTI'),
(116, '84', 1, 'Vault', 'CTI'),
(117, '84', 1, 'Ms. Jecamarie V. Pasay', 'CTI'),
(118, '85', 1, 'Storage Room', 'CTI'),
(119, '86', 1, 'Storage Room', 'CTI'),
(120, '87', 3, 'Storage Room', 'CTI'),
(121, '88', 2, 'Storage Room', 'CTI'),
(122, '89', 1, 'Ms. Neres Repollo', 'CTI'),
(123, '89', 1, 'Jecamarie Pasay', 'CTI'),
(124, '90', 1, 'Conference Room', 'CTI'),
(125, '91', 3, 'Vault', 'CTI'),
(126, '92', 1, 'Conference Room', 'CTI'),
(127, '93', 1, 'Engr. Lovely Barbosa,', 'CTI'),
(128, '93', 1, 'Ms. Honey Lyn Tirador', 'CTI'),
(129, '93', 1, 'Ms. Jecamarie Pasay', 'CTI'),
(130, '93', 2, 'Conference Room', 'CTI'),
(133, '95', 2, 'Conference Room', 'CTI'),
(134, '96', 1, 'Engr. Lovely Barbosa', 'CTI'),
(135, '96', 2, 'Conference Room', 'CTI'),
(136, '97', 1, 'CoWorking Space', 'CTI'),
(137, '97', 1, 'Conference Room', 'CTI'),
(138, '98', 1, 'Vault', 'CTI'),
(139, '99', 5, 'Vault', 'CTI'),
(140, '100', 1, 'Ms. Honey Lyn Tirador', 'CTI'),
(141, '101', 1, 'Ms. Jecamarie V. Pasay', 'CTI'),
(142, '101', 1, 'Engr. Lovely Barbosa', 'CTI'),
(143, '102', 1, 'Conference Room', 'CTI'),
(144, '102', 1, 'Co-Working Space', 'CTI'),
(145, '103', 1, 'Conference Room', 'CTI'),
(146, '104', 1, 'Mr. Red Tarcelo', 'CTI'),
(147, '105', 1, 'Ms. Honey Lyn Tirador', 'CTI'),
(148, '105', 1, 'Conference Room', 'CTI'),
(149, '106', 3, 'Vault', 'CTI'),
(150, '107', 16, 'Conference Room', 'CTI'),
(151, '107', 1, 'Ms. Jecamarie Pasay', 'CTI'),
(152, '108', 1, 'Ms. Jecamarie V. Pasay', 'CTI'),
(153, '108', 1, 'Asst. Prof. John Richard Esguerra', 'CTI'),
(154, '108', 1, 'Ms. Lovely Barbosa', 'CTI'),
(155, '108', 1, 'Ms. Marielle Rosales', 'CTI'),
(156, '108', 1, 'Engr. John Paul Heje', 'CTI'),
(157, '109', 1, 'Ms. Lovely Barbosa', 'CTI'),
(158, '109', 1, 'Ms. Laisa', 'CTI'),
(159, '109', 1, 'Fatima Rosales', 'CTI'),
(160, '109', 1, 'Ms. Honey Lyn Tirador', 'CTI'),
(161, '109', 1, 'Asst. Prof. John Richard Esguerra', 'CTI'),
(162, '109', 1, 'Engr. Neres Repollo', 'CTI'),
(163, '109', 1, 'Jecamarie Pasay', 'CTI'),
(173, '35', 1, 'CTI', 'CTI'),
(174, '35', 1, 'Vault', 'CTI'),
(175, '35', 1, 'Ground Flr', 'CTI'),
(176, '35', 1, 'Receiving Area', 'CTI'),
(177, '112', 1, 'OVPRDES', 'CTI'),
(180, '113', 1, 'DTC', 'CTI'),
(181, '1', 2, 'Co-Working Space', 'CTI'),
(182, '1', 2, 'DTC', 'CTI'),
(183, '3', 1, 'DTC', 'CTI'),
(184, '3', 1, 'Co-Working Space', 'CTI'),
(185, '114', 1, 'DTC', 'CTI'),
(186, '115', 1, 'STEER HUB', 'CTI'),
(187, '116', 1, 'OVPRDES', 'CTI'),
(191, '21', 11, 'Co-Working Space', 'CTI'),
(192, '21', 3, 'DTC', 'CTI'),
(193, '16', 2, 'DTC', 'CTI'),
(194, '16', 4, 'Outside Office', 'CTI'),
(195, '120', 1, 'KIST', 'CTI'),
(196, '118', 1, 'PEZABSUSEZI', 'CTI'),
(197, '118', 1, 'KIST', 'CTI'),
(198, '18', 1, 'OVPRDES', 'CTI'),
(199, '18', 1, 'Co-Working Space', 'CTI'),
(200, '22', 8, 'AVR', 'CTI'),
(201, '22', 16, 'FabLab', 'CTI'),
(203, '122', 1, 'Office of VP Albert', 'CTI'),
(204, '123', 1, 'ESRC', 'CTI'),
(205, '119', 2, 'ESRC', 'CTI'),
(206, '117', 4, 'Locators Space', 'CTI'),
(207, '121', 1, 'ESRC', 'CTI'),
(208, '124', 1, 'ESRC', 'CTI'),
(209, '125', 1, 'DTC', 'CTI'),
(210, '126', 1, 'STEER HUB', 'CTI'),
(211, '127', 0, 'ESRC', 'CTI'),
(212, '128', 1, 'Engr. Albertson Amante', 'CTI'),
(221, '60', 1, 'Ms. Jecamarie Pasay', 'CTI'),
(222, '60', 1, 'Ms. Honey Lyn Tirador', 'CTI'),
(223, '60', 1, 'Mr. Red Tarcelo', 'CTI'),
(224, '60', 1, 'SIMULATION LAB', 'CTI'),
(225, '60', 1, 'GIS', 'CTI'),
(226, '60', 1, 'CTI', 'CTI'),
(227, '60', 2, 'PEZABSUSEZI', 'CTI'),
(228, '60', 2, 'KIST', 'CTI'),
(229, '60', 6, 'GADC', 'CTI'),
(230, '60', 2, 'OVPRDES', 'CTI'),
(231, '60', 2, 'ESRC', 'CTI'),
(232, '129', 1, 'ESRC', 'CTI'),
(233, '74', 1, 'Storage Room', 'CTI'),
(234, '74', 1, 'OVPRDES', 'CTI'),
(235, '130', 1, 'CTI', 'CTI'),
(236, '130', 1, 'GADC', 'CTI'),
(237, '131', 1, 'STEER HUB', 'CTI'),
(238, '132', 1, 'OVPRDES', ''),
(239, '133', 1, 'OVPRDES', ''),
(240, '94', 1, 'M.s Bonzai', 'CTI'),
(241, '94', 1, 'Mr. Apollo Malaluan', 'CTI'),
(242, '94', 1, 'Ms. Honey Lyn Tirador', 'CTI'),
(243, '94', 1, 'Engr. Neres Repollo', 'CTI'),
(244, '134', 1, 'ESRC', 'CTI'),
(245, '135', 1, 'Engr. Albertson Amante', 'CTI'),
(246, '136', 1, 'Mhagie De Chavez', 'CTI'),
(247, '136', 1, 'John Paul Heje', 'CTI'),
(248, '137', 1, 'DTC', 'CTI'),
(249, '138', 1, 'ESRC', 'CTI'),
(250, '139', 1, 'ESRC', 'CTI'),
(251, '140', 3, 'ESRC', 'CTI'),
(252, '141', 1, 'ESRC', 'CTI'),
(253, '142', 2, 'ESRC', 'CTI'),
(254, '143', 2, 'ESRC', 'CTI'),
(255, '144', 1, 'ESRC', 'CTI'),
(256, '145', 1, 'ESRC', 'CTI'),
(257, '146', 1, 'ESRC', 'CTI'),
(258, '147', 2, 'ESRC', 'CTI'),
(259, '148', 1, 'ESRC', 'CTI'),
(260, '149', 1, 'ESRC', 'CTI'),
(261, '150', 1, 'ESRC', 'CTI'),
(262, '151', 1, 'ESRC', 'CTI'),
(263, '152', 1, 'ESRC', 'CTI'),
(264, '153', 1, 'ESRC', 'CTI'),
(265, '154', 1, 'ESRC', 'CTI'),
(266, '155', 1, 'AUTOMATIC MOTORS', 'CTI'),
(267, '156', 1, 'ESRC', 'CTI'),
(268, '157', 1, 'ESRC', 'CTI'),
(269, '158', 1, 'ESRC', 'CTI'),
(270, '159', 8, 'ESRC', 'CTI'),
(271, '160', 1, 'ESRC', 'CTI'),
(272, '161', 1, 'ESRC', 'CTI'),
(273, '162', 1, 'ESRC', 'CTI'),
(274, '163', 3, 'ESRC', 'CTI'),
(275, '164', 1, 'ESRC', ''),
(276, '165', 1, 'ESRC', 'CTI'),
(277, '166', 1, 'ESRC', 'CTI'),
(278, '167', 1, 'ESRC', 'CTI'),
(279, '168', 1, 'ESRC', 'CTI'),
(280, '169', 1, 'ESRC', 'CTI'),
(281, '170', 1, 'ESRC', 'CTI'),
(282, '171', 1, 'ESRC', 'CTI'),
(283, '172', 1, 'ESRC', 'CTI'),
(284, '173', 1, 'ESRC', 'CTI'),
(285, '174', 1, 'ESRC', 'CTI'),
(286, '175', 6, 'ESRC', 'CTI'),
(287, '176', 1, 'ESRC', 'CTI'),
(288, '177', 1, 'CTI', 'CTI'),
(289, '178', 1, 'ESRC', 'CTI'),
(290, '179', 1, 'ESRC', 'CTI'),
(291, '180', 2, 'ESRC', 'CTI'),
(292, '181', 2, 'ESRC', 'CTI'),
(293, '182', 1, 'ESRC', 'CTI'),
(294, '183', 1, 'ESRC', 'CTI'),
(295, '184', 1, 'ESRC', 'CTI'),
(296, '185', 1, 'ESRC', 'CTI');

-- --------------------------------------------------------

--
-- Table structure for table `personels`
--

CREATE TABLE `personels` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `position` varchar(99) NOT NULL,
  `location` varchar(90) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `personels`
--

INSERT INTO `personels` (`id`, `name`, `position`, `location`) VALUES
(1, 'Asst. Prof. John Richard Esguerra', 'Center Head', 'CTI'),
(2, 'Ms. Jecamarie Pasay', 'Faculty with Special Assignment', 'CTI'),
(3, 'Ms. Honey Lyn Tirador', 'University Research Associate', 'CTI'),
(4, 'Ms. Lovely Barbosa', 'Project Assistant II', 'CTI'),
(5, 'Mr. Red Tarcelo', 'Project Assistant II', 'CTI');

-- --------------------------------------------------------

--
-- Table structure for table `sponsors`
--

CREATE TABLE `sponsors` (
  `id` int(11) NOT NULL,
  `company` varchar(90) NOT NULL,
  `sponsors` varchar(90) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sponsors`
--

INSERT INTO `sponsors` (`id`, `company`, `sponsors`) VALUES
(1, 'CTI', 'DOST PCIEERD - TBI 4.0 Year 2'),
(2, 'CTI', 'CHED IDIG - TechHub'),
(3, 'CTI', 'STF'),
(4, 'CTI', 'DOST PCIEERD - Establishment of BatStateU CTI'),
(5, 'CTI', 'DOST CALABRZON - RIIC Calabarzon Year 1'),
(6, 'CTI', 'DOST PCIEERD - TBI 4.0 Year 1'),
(7, 'CTI', 'RDC Website and Walkthrough Development'),
(9, 'CTI', 'PMO'),
(16, 'CTI', 'N/A'),
(17, 'CTI', 'RTF'),
(21, 'CTI', 'MDS');

-- --------------------------------------------------------

--
-- Table structure for table `state`
--

CREATE TABLE `state` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `state`
--

INSERT INTO `state` (`id`, `name`) VALUES
(1, 'Working'),
(2, 'Defective'),
(3, 'Donate');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `code`
--
ALTER TABLE `code`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `defective`
--
ALTER TABLE `defective`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`item_id`),
  ADD UNIQUE KEY `item_id` (`item_id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ownership`
--
ALTER TABLE `ownership`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personels`
--
ALTER TABLE `personels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sponsors`
--
ALTER TABLE `sponsors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `state`
--
ALTER TABLE `state`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `code`
--
ALTER TABLE `code`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `defective`
--
ALTER TABLE `defective`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=258;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `ownership`
--
ALTER TABLE `ownership`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=297;

--
-- AUTO_INCREMENT for table `personels`
--
ALTER TABLE `personels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `sponsors`
--
ALTER TABLE `sponsors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `state`
--
ALTER TABLE `state`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
