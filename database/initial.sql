CREATE DATABASE Conquer;
USE Conquer;

CREATE TABLE profiles (
	id INT(1) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

INSERT INTO profiles (id, name) VALUES (1, 'Teacher');
INSERT INTO profiles (id, name) VALUES (2, 'Student');


CREATE TABLE people (
	id INT(6) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    profileID INT(2) NOT NULL,
    FOREIGN KEY (profileID) REFERENCES profiles(id)
);

INSERT INTO people (id, name, profileID) VALUES (1, 'Conquer', 1);

CREATE TABLE users (
	id INT(6) AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    personID INT(2) NOT NULL,
    FOREIGN KEY (personID) REFERENCES people(id)
);

INSERT INTO users (id, username, password, personID) VALUES (1, 'conquer', '4784ddfd82e878795dc307378c705890', 1);

CREATE TABLE classes (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(45) NOT NULL,
    teacherID INT NOT NULL,
    FOREIGN KEY (teacherID) REFERENCES users(id)
);

CREATE TABLE classes_students (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    classID INT NOT NULL,
    FOREIGN KEY (classID) REFERENCES classes(id),
    studentID INT NOT NULL,
    FOREIGN KEY (studentID) REFERENCES people(id)
);

