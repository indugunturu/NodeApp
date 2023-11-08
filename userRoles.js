const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Configure MySQL connection
var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234@Indu",
    database: "mynodeass"
  });

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: '1234',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport with a local strategy for authentication
passport.use(
  new LocalStrategy((username, password, done) => {
    db.query(
      'SELECT * FROM users WHERE username = ?',
      [username],
      (err, results) => {
        if (err) return done(err);
        if (results.length === 0) return done(null, false);
        const user = results[0];
        if (user.password !== password) return done(null, false);
        return done(null, user);
      }
    );
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) return done(err);
    const user = results[0];
    done(null, user);
  });
});

// Middleware for checking roles
function requireRole(role) {
  return (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.status(403).send('Access Denied');
    }
  };
}

// Login route
app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })
);

// Dashboard route accessible only to users with the 'USER' role
app.get('/dashboard', requireRole('USER'), (req, res) => {
  res.send(`Welcome to the Dashboard, ${req.user.username}`);
});

// Admin route accessible only to users with the 'ADMIN' role
app.get('/admin', requireRole('ADMIN'), (req, res) => {
  res.send(`Welcome to the Admin Panel, ${req.user.username}`);
});

// Logout route
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/login', (req, res) => {
  res.send('Please log in.');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
