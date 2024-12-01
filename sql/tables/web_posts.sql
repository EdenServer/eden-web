DROP TABLE IF EXISTS `web_posts`;
CREATE TABLE `web_posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `author_id` int(10) unsigned NOT NULL,
  `date` timestamp NOT NULL,
  `author` varchar(16) NOT NULL,
  `title` varchar(100) NOT NULL,
  `markdown` TEXT NOT NULL,
  `expiration` timestamp,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
