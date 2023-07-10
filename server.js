// Import required packages and modules
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection')
//const routes = require('./controllers');

// Set up the Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Set up the session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

// Set up the Handlebars engine
//app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
//app.set('view engine', 'handlebars');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
//app.use(routes);

// Start the server

// Sync db
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Come check the funk at http://localhost:${PORT}`));
  });