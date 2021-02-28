


const mysql = require('mysql2');

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
  afterConnection();
});

afterConnection = () => {
  // Write a simple query that will SELECT everything from the 'products' table
  
  connection.query("SELECT * FROM department", function (err, res) {
    if(err) throw err;
    console.log(res);
    
  });
  connection.end();
};




  