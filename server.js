const inquirer = require('inquirer');
const cTable = require('console.table');
const express = require('express');
const table = cTable.getTable;


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
    
  });
// ask main questions
const promptUser = () => {
  inquirer.prompt([
   {
     type: 'list',
     name: 'workTable',
     message: "What would you like to do?",
     choices: ['View all departments', 'View all roles', 'View all employees', 
     'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],  
   
   }])
   .then(response => {
       switch (response.workTable) {
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
       };
      });
};
//view departments
const showDepartments = () => {
  console.log('Viewing departments...\n'); 
  connection.query("SELECT * FROM department", function(err, res) {
   if(err) throw err;
   console.table(res); 
 })
}
//view roles
const showRoles = () => {
  console.log('Viewing roles...\n');  
  connection.query("SELECT * FROM role", function(err,res) {
  if(err) throw err;
  console.table(res);
})
}
//view list of employees
const showEmployees = () => {
  console.log('Viewing employee information...\n');
  var query = `SELECT e.id, e.first_name, e.last_name, r.title,d.name AS department, r.salary, m.id
  FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON d.id = r.department_id LEFT JOIN employee m ON m.id = e.manager_id`      
   connection.query(query, (err, res) => {
    if(err) throw err;
    console.table(res);    
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
  console.log("Adding a department...\n"); 
  var query = `INSERT INTO department (name) VALUES ( ? )`;
  connection.query(query, answer.department, function (err, res){
    if(err) throw err;
    
    console.table(res.affectedRows + ' Department added!\n');
    
  });
});
};
//  ADD ROLE NEEDS WORK1111111111111111111111111
const addRole = () => {
  inquirer.prompt([
    {    
      type: 'input',
      name: 'title',            
      message: "Enter the role name", 
    },
    {
     type: 'number',
     name: 'salary',            
     message: "Enter the salary for the role", 
    },
    {
     type: 'input',
     name: 'department',            
     message: "Enter the department for the role", 
    }
   ])  
   .then(function (answer) { 
    console.log("Adding a role...\n"); 
    var query = `INSERT INTO role (title, salary, department) VALUES (?, ?, ?)`;
    connection.query(query, {
      title: `${answer.title}`,
      salary: `${answer.salary}`,
      department: `${answer.department}`
    },
      answer.role, function (err, res){
      if(err) throw err;
      
      console.table(res.affectedRows + ' role added!\n');
      
    });
  });
  }; 
//ADD EMPLOYEE NEEDS WORK
  const addEmployee = () => {
   inquirer.prompt([
  {
   type: 'input',
   name: 'first_name',   //name         
   message: "Enter the employee's first name:", 
  },
  {
   type: 'input', // number
   name: 'last_name', //id
   message: "Enter the employee's last name:",
  },
  {
    type: 'input',//link
    name: 'role',//email
    message: "Enter the employee's role:",
  },
  {
    type: 'input',//number
    name: 'boss',//office
    message: "Enter the employee's manager:",
  }
])   
.then(function (answer) { 
  console.log("Adding an employee...\n"); 
  var query = `INSERT INTO employee (first_name, last_name, role, manager) VALUES (?, ?, ?, ?)`;
  connection.query(query, {
    first_name: `${answer.first_name}`,
    last_name: `${answer.last_name}`,
    role: `${answer.role}`,
    manager: `${answer.boss}`
  },
    answer.role, function (err, res){
    if(err) throw err;
    
    console.table(res.affectedRows + ' employee added!\n');
    
  });
});
};   
  const updateEmployee = () => {
   
    console.log('Choose an employee...\n'); 
    connection.query("SELECT * (first_name, last_name) FROM employee", function(err, res) {
     if(err) throw err;
     console.table(res); 
   })
  }
  
  app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });  

  promptUser();