CREATE DATABASE skillsource_db;

USE skillsource_db;

CREATE TABLE messages (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  text varchar(250),
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  username varchar(20),
  roomname varchar(20)
);

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username varchar(20)
);
