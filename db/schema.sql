DROP DATABASE IF EXISTS department_db;
CREATE DATABASE department_db;
USE department_db;show

CREATE TABLE  department(
    department_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL
    );
  
CREATE TABLE role (
      role_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
      title VARCHAR(100) NOT NULL,
      salary DECIMAL NOT NULL,
      department_id INT NOT NULL ,
      CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE CASCADE
      
  );
CREATE TABLE employee (
    Employee_id INT  NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role_id INT NOT NULL ,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(role_id) ON DELETE CASCADE,
    manager_id INT ,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(employee_id) ON DELETE CASCADE

  ) 