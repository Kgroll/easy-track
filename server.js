const inquirer = require('inquirer');
const consoleT = require('console.table');
const express = require('express');

/*
_____   ___   _____ __   __         _____ ______   ___   _____  _   __
|  ___| / _ \ /  ___|\ \ / /        |_   _|| ___ \ / _ \ /  __ \| | / /
| |__  / /_\ \\ `--.  \ V /  ______   | |  | |_/ // /_\ \| /  \/| |/ / 
|  __| |  _  | `--. \  \ /  |______|  | |  |    / |  _  || |    |    \ 
| |___ | | | |/\__/ /  | |            | |  | |\ \ | | | || \__/\| |\  \
\____/ \_| |_/\____/   \_/            \_/  \_| \_|\_| |_/ \____/\_| \_/
*/
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  // Your MySQL username
  user: 'root',
  // Your MySQL password
  password: 'Kris10Gr0ller',
  database: 'easytrack_db'
});


  connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
   promptUser(); 
  });
// ask main questions
function promptUser () {
  inquirer.prompt(
   {
     type: 'list',
     name: 'workTable',
     message: "What would you like to do?",
     choices: ['View all departments', 'View all roles', 'View all employees', 
     'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit'],  
   
   })
   .then(function ({workTable}) {
       switch (workTable) {
      case "View all departments":
         showDepartments();
         break;
      case "View all roles":
          showRoles();
          break;
      case "View all employees":
        showEmployees();
        break;
      case "Add a department":
        addDepartment();
        break;
      case "Add a role":
        addRole();
        break;
      case "Add an employee":
        addEmployee();
        break;
      case "Update an employee role":
        updateEmployee();
        break; 
        
        default:
          console.log("Goodbye!");
          process.exit();
       };
      });
};
//view departments
const showDepartments = () => {
  console.log('Viewing departments...\n'); 
  connection.query("SELECT * FROM department", function(err, res) {
   if(err) throw err;
   console.table(res); 
   console.log("Departments viewed\n");

   promptUser();
 });
};
//view roles
const showRoles = () => {
  console.log('Viewing roles...\n');  
  connection.query("SELECT * FROM role", function(err,res) {
  if(err) throw err;
  console.table(res);
  console.log("Roles viewed\n");

  promptUser();
});
};
//view list of employees
const showEmployees = () => {
  console.log('Viewing employee information...\n');
  var query = `SELECT e.id, e.first_name, e.last_name, r.title,d.name AS department, r.salary, m.id
  FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON d.id = r.department_id LEFT JOIN employee m ON m.id = e.manager_id`      
   connection.query(query, (err, res) => {
    if(err) throw err;
    console.table(res); 
    console.log("Employees viewed");
    
    promptUser();
  });
};
//add a department
const addDepartment = () => {
  inquirer.prompt([
    {    
    type: 'input',
    name: 'department',            
    message: "Enter the department name", 
  } 
  ])
  .then(function (answer) { 
 
  var query = `INSERT INTO department (name) VALUES ( ? )`;
  connection.query(query, answer.department, 
    function (err, res){
    if(err) throw err;    
    
  console.table(res.affectedRows + ' Department added!\n');  
  
  promptUser(); 
  });
});
};

//  add role
const addRole = () => {
  inquirer.prompt([
    {    
      type: 'input',
      name: 'title',            
      message: "Enter the role title", 
    },
    {
     type: 'number',
     name: 'salary',            
     message: "Enter the salary for the role", 
    },
    {
     type: 'number',
     name: 'department_id',            
     message: "Choose the department id number for the role (between 1 and 4)", 
     
    
    }
   ])  
   .then(function (answer) { 
    var query = `INSERT INTO role (title, salary, department_id) VALUES ('${answer.title}', '${answer.salary}','${answer.department_id}')`;
    connection.query(query, 
      function (err, res) {
        if(err) throw err;
        
       
        console.table(res.affectedRows + ' Role added!\n');
        
        promptUser();
    });
  });
};             
  

//add employee
  const addEmployee = () => {
   inquirer.prompt([
  {
   type: 'input',
   name: 'first_name',         
   message: "Enter the employee's first name:", 
  },
  {
   type: 'input', 
   name: 'last_name', 
   message: "Enter the employee's last name:",
  },
  {
    type: 'number',
    name: 'role_id',
    message: "Enter the employee's role id number:",
  },
  {
    type: 'number',
    name: 'manager_id',
    message: "Choose the employee's manager id number if appllicable",
    
  }
])   
.then(function (answer) { 
  var query =`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.first_name}','${answer.last_name}','${answer.role_id}','${answer.manager_id}')`;
  connection.query(query, 
 function (err, res) {  
    if(err) throw err;
    
    console.table(res.affectedRows + ' employee added!\n');    
    
    promptUser();
 });

});
  }
    
// Update employee roles

const updateEmployee = function () {
  let employeeName;
  let employees;
  let employeeNames;
  connection.query(
    `SELECT e.id, e.first_name, e.last_name, CONCAT(e.first_name, ' ', e.last_name) as full_name, e.role_id, r.title
    FROM employee e
    INNER JOIN role r
      ON e.role_id = r.id`,
    function (err, res) {
      if (err) throw err;
      console.log("res: ", res);
      employees = res;
      employeeNames = res.map((employee) => employee.full_name);
      inquirer
        .prompt([
          {
            name: "employee",
            type: "list",
            message: "Which employee would you like to update?",
            choices: employeeNames,
          },
        ])
        .then(function (response) {
          let roles = [
            ...new Set(employees.map((employee) => employee.title)),
          ].sort();
          employeeName = response.employee;
          console.log("employeeName: ", employeeName);
          inquirer
            .prompt([
              {
                name: "role",
                type: "list",
                message: `What role would you like to assign to ${employeeName}?`,
                choices: roles,
              },
            ])
            .then(function (response) {
              let employeeRole = employees.find(
                (employee) => employee.title === response.role
              );
              let employeeId = employees.find(employee => employee.full_name === employeeName);
              console.log("response.role: ", response.role);
              // create sql statement as a string template literal
              var sqlQuery = `UPDATE employee SET role_id = ${employeeRole.role_id} WHERE id = ${employeeId.id}`; //this is the sql that is sent to the database
              console.log("sqlQuery: ", sqlQuery);
              connection.query(sqlQuery, function (err, res) {
                //connect to database and pass through the query made above
                if (err) throw err;
               // viewAllEmployees();
                promptUser();
                console.log( `${employeeName} role is now ${response.role}`);
              });
          });
      });
  });
};

  app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
