const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table')



const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'M!tongasa1',
        database: 'department_db'
    });

db.connect(err => {
    if (err) {
        throw err;
    } else {
        console.log('connected');

    }

    promptOptions();
})

const promptOptions = () => {
    inquirer.prompt([
        {
            type: "list",
            name: 'choices',
            message: 'what would you like to do?',
            choices: [
                'view all departments',
                'view all roles',
                'view all employees',
                'add department',
                'add role',
                'add employee',
                'update employee role',
                'no action '

            ],
            name: 'promptOptions'
        }
    ])
        .then((options) => {
            switch (options.promptOptions) {
                case 'view all departments':
                    viewDepartments();
                    break;

                case 'view all roles':
                    viewRoles();
                    break;
                case 'view all employees':
                    viewEmployees();
                    break;
                case 'add department':
                    addDepartment();
                    break;
                case 'add role':
                    addRole();
                    break;
                case 'add employee':
                    addEmployee();
                    break;
                case 'update employee':
                    updateEmployee();
                    break;

                default:
                    promptOptions();
                    break
            }
        })
};

const viewDepartments = () => {
    console.log('viewing all departments...');

    db.query(`SELECT * FROM department`,
        function (err, results) {
            console.table(results)
            promptOptions()
        }
    );
    
};
const viewRoles = () => {
    console.log('viewing all roles...\n');

    db.query(`SELECT * FROM role`,
        function (err, results) {
            console.table(results)




             promptOptions()



        }
    );
   
};
const viewEmployees = () => {
    console.log('viewing all employees...\n');

    db.query(`SELECT * FROM employee`,
        function (err, results) {
            console.table(results)
             promptOptions()
        }
    );
   
};



const addDepartment = () => {
    console.log('please add department');
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDept',
            message: 'what department do you want to add?',
            validate: addDept => {
                if (addDept) {
                    return true;
                } else {
                    console.log('enter a department')
                    return false
                }
            }
        }
    ])
        .then(res => {
            const { addDept } = res;
            db.promise()
                .query(`INSERT INTO department (department_name) VALUES (?)`, addDept)
                .then(() => console.log(`added ${addDept} to db`))
        }).then(() => promptOptions())
};

const addRole = () => {
    console.log('please add a role');
    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'what role do you want to add?',
            validate: role => {
                if (role) {
                    return true;
                } else {
                    console.log('enter a role')
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'what is the salary for this role?',
            validate: salary => {
                if (salary) {
                    return true;
                } else {
                    console.log('enter a salry for this role')
                    return false
                }
            }
        }
    ])
        .then(res => {
            const { role, salary } = res;
            db.promise()
                .query(`SELECT * FROM department `)
                .then(([rows]) => {
                    const allDepartments = rows;
                    const departmentchoices = allDepartments.map(({ department_id, department_name }) => ({
                        name: department_name,
                        value: department_id
                    }));
                    inquirer.prompt(
                        {
                            type: 'list',
                            name: 'departmentId',
                            message: 'what department does this role belong to?',
                            choices: departmentchoices,

                        })
                        .then(response => {
                            console.log(response);
                            db.promise()
                                .query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`, [role, salary, response.departmentId])
                                .then(() => console.log('YOUR ROLE HAS BEEN ADDED'))
                                .then(() => promptOptions())

                        })

                })
        })
};

const addEmployee = () => {
    console.log('add an employee');

    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'what is the employees first name?',
            validate: firstName => {
                if (firstName) {
                    return true;
                } else {
                    console.log('enter a first name ')
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'what is the employees lastname?',
            validate: lastName => {
                if (lastName) {
                    return true;
                } else {
                    console.log('enter a last name ')
                    return false
                }
            }
        },
    ]).then(res => {
        const { firstName, lastName } = res;
        let roleId;

        db.promise()
            .query(`SELECT * FROM role`)
            .then(([rows]) => {
                const roleChoices = rows.map(({ role_id, title }) => ({
                    name: title,
                    value: role_id
                }));

                inquirer.prompt(
                    {
                        type: 'list',
                        name: 'roleId',
                        message: 'what is the employees role',
                        choices: roleChoices,
                        validate: roleId => {
                            if (roleId) {
                                return true;
                            } else {
                                console.log('enter a role')
                                return false
                            }
                        }
                    }
                )
                    .then(res => {
                        roleId = res.roleId;
                        db.promise().query(`SELECT * FROM employee`)
                            .then(([rows]) => {
                                const allEmployees = rows;
                                const managerChoices = allEmployees.filter(e => !e.manager_id).map(({ first_name, last_name, employee_id }) => ({
                                    name: `${first_name} ${last_name} `,
                                    value: employee_id
                                }));
                                inquirer.prompt({
                                    type: 'list',
                                    name: 'managerId',
                                    message: 'who is the employees manager?',
                                    choices: managerChoices
                                })
                            }).then(response => {
                                const managerId = response;
                                db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, [firstName, lastName, roleId, managerId])
                                    .then(() => console.log('Employee added'))
                                    .then(() => promptOptions())
                            })
                    })
            })
    });

se
}
const updateEmployee = () => {
    console.log('update employee');
    inquirer.prompt([
        {
            type: 'list',
            message: 'which employee will you update?',
            choices: [
                "Samuel",
                "jennifer",
                "joan",
                "gaga",
                "madonna",
                "bruno",
                "michael",
                "jennifer",

            ],
            name: 'employeeUpdate'
        },
        {
            type: 'list',
            message: 'which role will the employee be assigned?',
            choices: [
                "Sales manager",
                "accountant",
                "caretring lead",
                "server",
                "lead chef",
                "lead cook",
                "human resources director",
                "human resources manager",
            ],
            name: 'newEmployeeRole'
        }
    ])
        .then(res => {
            db.query(
                `UPDATE employee SET first_name = ? WHERE employee_id = ?`, [res.employeeUpdate, res.newEmployeeRole]
            )
        })
        .then(() => promptOptions())
}
















