CREATE DATABASE movie_explore;

USE movie_explore;

CREATE TABLE viewers (
	id   INTEGER PRIMARY KEY AUTO_INCREMENT,
	firstName VARCHAR(255) NOT NULL,
	lastName  VARCHAR(255) NOT NULL,
  role  VARCHAR(255) NOT NULL,
  profileImage  VARCHAR(255),
) CHARACTER SET utf8;

SHOW TABLES;

INSERT INTO viewers (firstName, lastName) VALUES("Adi","Pothuri", "admin");
INSERT INTO viewers (firstName, lastName) VALUES("William","Shakespeare", "user");
INSERT INTO viewers (firstName, lastName) VALUES("John","Doe", "user");

SELECT * FROM viewers;