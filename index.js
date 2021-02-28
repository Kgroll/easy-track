const inquirer = require('inquirer');
const fs = require('fs');

// ask questions
const promptUser = () => {
    inquirer.prompt([
     {
       type: 'list',
       name: 'workTable',//employeeType
       message: "What would you like to do?",
       choices: ['View all departments', 'View all roles', 'View all employees', 
       'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],  
       }])
 
     .then(function (response) {
         if (response.workTable === "Add an employee") {
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
      .then(answers => addEmployee(answers));
   }     
   else if (response.workTable === "Add a department") {
     inquirer.prompt([
       {    
       type: 'input',
       name: 'department',            
       message: "Enter the department name", 
     }     
     ])
     .then(answers => addEngineer(answers));
   }
       else if (response.workTable === "Add a role") {
         inquirer.prompt([
           {    
             type: 'input',
             name: 'role',            
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
       };
    })
}       
fs.accessSync('./db/easytrack.db');
promptUser();