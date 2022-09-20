INSERT INTO department (department_name)
VALUES ("sales"),
       ("catering"),
       ("culinary"),
       ("human resources");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales manager", 4000, 1),
       ("accountant", 3000, 1),
       ("caretring lead", 2000, 2),
       ("server", 1000, 2),
       ("lead chef", 5000, 3),
       ("lead cook", 1000, 3),
       ( "human resources director", 9000, 4),
       ( "human resources manager", 7000, 4);

 INSERT INTO employee (first_name, last_name, role_id,  manager_id)
VALUES ("Samuel","brown", 2, null),
       ("jennifer","michaels", 1, 1),
       ("joan","jet", 4, null),
       ("lady","gaga", 3, 3),
       ("madonna","cicconi", 6, null),
       ("bruno","mars", 5, 5),
       ("michael","jackson", 7, null),
       ("jennifer","lopez", 8, 7),
    
       
