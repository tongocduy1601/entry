-- create user table --
--   this.firstName = user.firstName;
--   this.lastName = user.lastName;
--   this.email = user.email;
--   this.createdAt = new Date();
--   this.updatedAt = new Date();
--   this.role = user.role;

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  loginId VARCHAR(255) NOT NULL,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL,
  role VARCHAR(255) NOT NULL
);

INSERT INTO user (loginId,firstName, lastName, email,password, createdAt, updatedAt, role)
VALUES ("admin",'admin', 'admin', 'admin@gamil.com',"$2a$10$Ye8mH1e.Uxzi5eRLTlFdiO.8lD72pz/oS/zGB4o.Tj9KsitPjYAgC
", NOW(), NOW(), 'admin');