DROP TABLE IF EXISTS `audit_iprecord`;
CREATE TABLE `audit_iprecord` (
  `login_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `charid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
