require('dotenv').config();
const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const errorHandler = require('errorhandler');

const isProduction = process.env.NODE_ENV === 'production';

// Initiate app
const app = express();

// Configure app
app.use(cors())
app.use(require('morgan')('dev'))
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: process.env.SESSION_SECRET, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

if(!isProduction) {
  app.use(errorHandler());
}

// Error handlers & middlewares
if(!isProduction) {
  app.use((err, _req, res, _next) => {
    console.error(err)
    res.status(err.status || 500)

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, _req, res, _next) => {
  res.status(err.status || 500)

  res.json({
    errors: {
      message: err.message,
      error: { ...err },
    },
  });
});

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));