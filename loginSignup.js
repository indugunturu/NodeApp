const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

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
});

// Sign Up (Create a new customer)
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Hash the password before storing it
 // const hashedPassword = await bcrypt.hash(password, 4);

  const query = 'INSERT INTO customers (name, email, password) VALUES (?, ?, ?)';
  const values = [name, email, password];

//   db.query(query, values, (err) => {
//     if (err) {
//       console.error('Error signing up: ' + err);
//       res.status(500).json({ message: 'Error signing up' });
//       return;
//     }
//     res.status(200).json({ message: 'Signup successful' });
//   });
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database: ' + err);
      return;
    }
    console.log('Connected to the database');
    const query = "INSERT INTO customers (name, email,password) VALUES ('indu', 'indugunturu12@gmail.com', '1234')";
  
    db.query(query, function (err, result) {
        if (err) throw err;
        console.log("signup");
        res.status(200).json({ message: 'Signup successful' });
      });
  });
});

// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    const query = 'SELECT * FROM customers WHERE email = ?';
    const values = [email];
    db.connect((err) => {
        if (err) {
          console.error('Error connecting to the database: ' + err);
          return;
        }
        console.log('Connected to the database');
        db.query(query, function (err, results)  {
            if (err) {
              console.error('Error logging in: ' + err);
              res.status(500).json({ message: 'Error logging in' });
              return;
            }
        
            if (results.length === 0) {
              res.status(401).json({ message: 'Email not found' });
              return;
            }
        
            const customer = results[0];
            const passwordMatch =  bcrypt.compare(password, customer.password);
        
            if (passwordMatch) {
              res.status(200).json({ message: 'Login successful' });
            } else {
              res.status(401).json({ message: 'Incorrect password' });
            }
          });

    });
    // end
  
    // db.query(query, values, async (err, results) => {
    //   if (err) {
    //     console.error('Error logging in: ' + err);
    //     res.status(500).json({ message: 'Error logging in' });
    //     return;
    //   }
  
    //   if (results.length === 0) {
    //     res.status(401).json({ message: 'Email not found' });
    //     return;
    //   }
  
    //   const customer = results[0];
    //   const passwordMatch = await bcrypt.compare(password, customer.password);
  
    //   if (passwordMatch) {
    //     res.status(200).json({ message: 'Login successful' });
    //   } else {
    //     res.status(401).json({ message: 'Incorrect password' });
    //   }
    // });
  });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
