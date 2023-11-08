const mysql = require('mysql2');

// Create a database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234@Indu",
    database: "mynodeass"
  });
// Connect to the database
db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database: ' + err);
      return;
    }
    console.log('Connected to the database');
    // const query = "INSERT INTO customers (name, address,email,password, role) VALUES ('indu', 'stockholm', 'indugunturu12.com', '1234', 'user')";
  
    // db.query(query, function (err, result) {
    //     if (err) throw err;
    //     console.log("1 record inserted");
    //   });
  });

/// Create (Add a new customer)
function createCustomer(name, address, email, password, role) {
    const query = 'INSERT INTO customers (name, address,email, password, role) VALUES (?, ?, ?, ?, ?)';
    const values = [name, address, email, password, role];
  
    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Error creating a customer: ' + err);
        return;
      }
      console.log('Customer created with ID: ' + results.insertId);
    });
  }
  
  // Read (Retrieve customer information by ID)
  function getCustomerById(customerId) {
    const query = 'SELECT * FROM customers WHERE id = ?';
    const values = [customerId];
  
    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Error fetching customer by ID: ' + err);
        return;
      }
      console.log(results[0]); // Display customer information
    });
  }
  
  // Read (Retrieve customer information by email)
  function getCustomerByEmail(email) {
    const query = 'SELECT * FROM customers WHERE email = ?';
    const values = [email];
  
    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Error fetching customer by email: ' + err);
        return;
      }
      console.log(results[0]); // Display customer information
    });
  }
  
//   // Update (Modify customer information)
  function updateCustomer(customerId, name, address, phone) {
    const query = 'UPDATE customers SET name = ?, address = ?, email = ? WHERE id = ?';
    const values = [name, address, phone, customerId];
  
    db.query(query, values, (err) => {
      if (err) {
        console.error('Error updating customer: ' + err);
        return;
      }
      console.log('Customer updated successfully');
    });
  }
  
//   // Delete (Remove a customer by ID)
  function deleteCustomerById(customerId) {
    const query = 'DELETE FROM customers WHERE id = ?';
    const values = [customerId];
  
    db.query(query, values, (err) => {
      if (err) {
        console.error('Error deleting customer by ID: ' + err);
        return;
      }
      console.log('Customer deleted successfully');
    });
  }
  
//   // Delete (Remove a customer by email)
  function deleteCustomerByEmail(email) {
    const query = 'DELETE FROM customers WHERE email = ?';
    const values = [email];
  
    db.query(query, values, (err) => {
      if (err) {
        console.error('Error deleting customer by email: ' + err);
        return;
      }
      console.log('Customer deleted successfully');
    });
  }
  
  // Close the database connection when done
  function closeDatabaseConnection() {
    db.end();
  }
  
  module.exports = {
    createCustomer,
    getCustomerById,
    getCustomerByEmail,
    updateCustomer,
    deleteCustomerById,
    deleteCustomerByEmail,
    closeDatabaseConnection,
  };