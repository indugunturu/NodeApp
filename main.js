// create connection to mysql
var mysql = require('mysql');
const CURD = require('./customerCURDoperations');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234@Indu",
  database: "mynodeass"
});

// create db
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     con.query("CREATE DATABASE mynodedb", function (err, result) {
//       if (err) throw err;
//       console.log("Database created");
//     });
//   });

// create table with columns
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    // var sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255), address VARCHAR(255), email VARCHAR(255), password VARCHAR(255), role VARCHAR(255))";
    // con.query(sql, function (err, result) {
    //   if (err) throw err;
    //   console.log("Table created");
    // });
    CURD.createCustomer('indugunturu', 'linkoping', 'indu12@gmail.com', '1234', 'admin');
//     CURD.createCustomer('indu', 'stockholm', 'indugunturu@gmail.com');
//     CURD.getCustomerByEmail('indugunturu12@gmail.com');
//     CURD.getCustomerById('1');
//     CURD.deleteCustomerByEmail('indugunturu12@gmail.com');
//     CURD.deleteCustomerById('2');
// CURD.closeDatabaseConnection();
  });