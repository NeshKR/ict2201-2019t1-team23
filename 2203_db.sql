-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2019 at 11:52 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `2203_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `challenge`
--

CREATE TABLE `challenge` (
  `num` int(11) DEFAULT NULL,
  `challenge_name` varchar(50) DEFAULT NULL,
  `challenge_point` int(11) DEFAULT NULL,
  `challenge_description` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `challenge`
--

INSERT INTO `challenge` (`num`, `challenge_name`, `challenge_point`, `challenge_description`) VALUES
(1, 'Daily 10,000 Stepup challenge', 200, 'Walk 10,000 steps daily will earn you 200points!'),
(2, 'QRcode Scanner Fun', 30, 'Scanning 3 QR codes during your first-mile and last-mile destination!'),
(3, 'Complete a route to get points', 50, 'Complete route per 5km that you have completed will earn you 50 points!');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `description` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `title`, `username`, `description`) VALUES
(1, 'blah', 'bid', 'test'),
(4, 'test', 'bid', 'test'),
(5, 'test 123', 'bid', 'testing testing'),
(7, 'testing123', 'zhiying', 'testing123'),
(9, 'hoothoot', 'bid', 'hoothoot'),
(10, 'Test', 'test', 'Hello');

-- --------------------------------------------------------

--
-- Table structure for table `login_account`
--

CREATE TABLE `login_account` (
  `username` varchar(50) NOT NULL,
  `password` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login_account`
--

INSERT INTO `login_account` (`username`, `password`) VALUES
('bid', 'pass'),
('test', 'pass'),
('zhiying', 'password');

-- --------------------------------------------------------

--
-- Table structure for table `map`
--

CREATE TABLE `map` (
  `id` int(11) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `latitude` varchar(30) DEFAULT NULL,
  `longitude` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `map`
--

INSERT INTO `map` (`id`, `name`, `latitude`, `longitude`) VALUES
(1, 'tiong+bahru+plaza', '1.2864195', '103.82706'),
(2, 'bukit+merah+secondary+school', '1.2858957', '103.813113'),
(3, 'plaza+singapura', '1.3001901', '103.8451313'),
(4, 'anchorpoint', '1.2887273', '103.80518'),
(70, 'bukit+merah+central', '1.2837702', '103.8162192'),
(77, 'ikea+alexandra', '1.2880072', '103.8060273'),
(79, 'dawson+place', '1.2925977', '103.8107264'),
(80, 'leng+kee+community+club', '1.2898012', '103.8143356'),
(81, 'gan+eng+seng+primary+school', '1.2857625', '103.8152625'),
(82, 'nanyang', '1.3483099', '103.6831347'),
(83, 'nanyang+poly', '1.3800298', '103.8489499'),
(84, 'ang+mo+kio', '1.3691149', '103.8454342'),
(85, 'changi+airport', '1.3644202', '103.9915308'),
(86, 'yio+chu+kang', '1.3817217', '103.844934');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `username` varchar(50) NOT NULL,
  `nric` varchar(10) DEFAULT NULL,
  `mobile_number` int(11) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `physical_status` varchar(20) DEFAULT NULL,
  `usable_points` int(11) NOT NULL,
  `total_points` int(11) NOT NULL,
  `challenge` varchar(500) DEFAULT NULL,
  `avatar` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`username`, `nric`, `mobile_number`, `email`, `dob`, `gender`, `physical_status`, `usable_points`, `total_points`, `challenge`, `avatar`) VALUES
('bid', 'S9347732D', 81128378, 'zabidmurtada@gmail.com', '1993-12-25', 'male', 'healthy', 1300, 1800, NULL, 'https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png'),
('test', 's9123411t', 81231244, 'asdasda@gmail.com', '2000-11-11', 'male', 'healthy', 100, 1400, NULL, ''),
('zhiying', 's9812345A', 99998888, 'zhiying@gmail.com', '1998-07-11', 'female', 'healthy', 2100, 2500, 'steps challenge', 'https://landofblogging.files.wordpress.com/2014/01/bitstripavatarprofilepic.jpeg?w=300&h=300');

-- --------------------------------------------------------

--
-- Table structure for table `reward`
--

CREATE TABLE `reward` (
  `id` int(11) NOT NULL,
  `reward_name` varchar(50) DEFAULT NULL,
  `reward_point` int(11) DEFAULT NULL,
  `reward_img` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reward`
--

INSERT INTO `reward` (`id`, `reward_name`, `reward_point`, `reward_img`) VALUES
(1, 'Get extra 1GB of data (Singtel User only)', 1000, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3-ap-southeast-1.amazonaws.com%2Fsingsys%2Fimg%2Fclients%2FSingtel.jpg&f=1&nofb=1'),
(2, 'Get a free movie ticket (Shaw Theatre only)', 1200, 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Flobanghub.com%2Fwp-content%2Fthemes%2Fcouponpress%2Fthumbs%2Fthumbs_dir%2FShaw-Theatres-logo1-6iibk5v031wccxabamfqrtzc0mi9o2nrvyngg8u8fve.jpg&f=1&nofb=1'),
(3, 'Get a free gym pass for a day (Community GYM only)', 1400, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.myactivesg.com%2F~%2Fmedia%2FConsumer%2FImages%2FAbout%2520ActiveSG%2FmyActiveSG%2520App%2FActiveSG-app-icon.png%3Fla%3Den&f=1&nofb=1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login_account`
--
ALTER TABLE `login_account`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `map`
--
ALTER TABLE `map`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `reward`
--
ALTER TABLE `reward`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `map`
--
ALTER TABLE `map`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `reward`
--
ALTER TABLE `reward`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
