--  Users table
  CREATE TABLE users (
       id INT NOT NULL AUTO_INCREMENT,
       username CHAR(30) NOT NULL UNIQUE,
       password CHAR (60) NOT NULL,
       active BOOLEAN DEFAULT TRUE,
       PRIMARY KEY (id)
  );

--  Employee table
  CREATE TABLE employees (
       id INT NOT NULL AUTO_INCREMENT,
       birthdate DATE NOT NULL,
       firstname CHAR (30) NOT NULL,
       lastname CHAR (30) NOT NULL,
       gender BOOLEAN NOT NULL,
       hiredate Date NOT NULL,
       PRIMARY KEY (id)
  );

  INSERT INTO users(username, password, active)
  VALUES("john", "3da541559918a808c2402bba5012f6c60b27661c", true);

  INSERT INTO employees(id, birthdate, firstname, lastname, gender, hiredate)
  VALUES
     (10001,'1953-09-02','Georgi','Facello','M','1986-06-26'),
     (10002,'1964-06-02','Bezalel','Simmel','F','1985-11-21'),
     (10003,'1959-12-03','Parto','Bamford','M','1986-08-28'),
     (10004,'1954-05-01','Chirstian','Koblick','M','1986-12-01'),
     (10005,'1955-01-21','Kyoichi','Maliniak','M','1989-09-12'),
     (10006,'1953-04-20','Anneke','Preusig','F','1989-06-02'),
     (10007,'1957-05-23','Tzvetan','Zielinski','F','1989-02-10'),
     (10008,'1958-02-19','Saniya','Kalloufi','M','1994-09-15'),
     (10009,'1952-04-19','Sumant','Peac','F','1985-02-18'),
     (10010,'1963-06-01','Duangkaew','Piveteau','F','1989-08-24'),
     (10011,'1953-11-07','Mary','Sluis','F','1990-01-22'),
     (10012,'1960-10-04','Patricio','Bridgland','M','1992-12-18'),
     (10013,'1963-06-07','Eberhardt','Terkki','M','1985-10-20'),
     (10014,'1956-02-12','Berni','Genin','M','1987-03-11'),
     (10015,'1959-08-19','Guoxiang','Nooteboom','M','1987-07-02'),
     (10016,'1961-05-02','Kazuhito','Cappelletti','M','1995-01-27'),
     (10017,'1958-07-06','Cristinel','Bouloucos','F','1993-08-03'),
     (10018,'1954-06-19','Kazuhide','Peha','F','1987-04-03'),
     (10019,'1953-01-23','Lillian','Haddadi','M','1999-04-30'),
     (10020,'1952-12-24','Mayuko','Warwick','M','1991-01-26');