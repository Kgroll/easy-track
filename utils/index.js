const inquirer = require('inquirer');
const fs = require('fs');

// ask questions
const promptUser = () => {
    inquirer.prompt([
     {
       type: 'list',
       name: 'employeeType',
       message: "Please choose the employee type or choose 'All done':",
       choices: ['Manager', 'Engineer', 'Intern', 'All done!'],  
       }])
 
     .then(function (response) {
         if (response.employeeType === "Manager") {
           inquirer.prompt([
     {
               type: 'input',
       name: 'name',            
       message: "Enter the employee's name:", 
     },
     {
       type: 'number',
       name: 'id',
       message: "Enter the employee's id number:",
     },
     {
       type: 'link',
       name: 'email',
       message: "Enter the employee's e-mail address:",
     },
     {
       type: 'number',
       name: 'office',
       message: "Enter the Manager's office number",
     }
   ]) 
      .then(answers => addManager(answers));
   }     
   else if (response.employeeType === "Engineer") {
     inquirer.prompt([
       {    
       type: 'input',
       name: 'name',            
       message: "Enter the employee's name:", 
     },
     {
       type: 'number',
       name: 'id',
       message: "Enter the employee's id number:",
     },
     {
       type: 'link',
       name: 'email',
       message: "Enter the employee's e-mail address:",
     },
     {
       type: 'link',
       name: 'github',
       message: "Enter the Engineer's GitHub username:",
     }
     ])
     .then(answers => addEngineer(answers));
   }
       else if (response.employeeType === "Intern") {
         inquirer.prompt([
           {    
             type: 'input',
             name: 'name',            
             message: "Enter the employee's name:", 
           },
           {
             type: 'number',
             name: 'id',
             message: "Enter the employee's id number:",
           },
           {
             type: 'link',
             name: 'email',
             message: "Enter the employee's e-mail address:",
           },
           {
             type: 'input',
             name: 'school',
             message: "Please enter the Intern's school:",
           }  
        ])
    };
    })
}       
fs.accessSync('./db/easytrack.db');
promptUser();