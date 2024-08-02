const express = require('express');
const path = require('path');
const auth = require('http-auth');
const { check, validationResult } = require('express-validator');
const Registration = require('../models/Registration'); // Import the model directly

const router = express.Router();

const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd'),
});

// Render the index page
router.get('/', (req, res) => {
  res.render('index', { title: 'Index page' });
});

// Render the registration form
router.get('/register', (req, res) => {
  res.render('register', { title: 'Registration form' });
});

// List all registrants with authentication
router.get('/registrants', basic.check((req, res) => {
  Registration.find()
    .then((registrations) => {
      res.render('registrants', { title: 'Listing registrations', registrations });
    })
    .catch(() => { 
      res.send('Sorry! Something went wrong.'); 
    });
}));

// Handle form submission
router.post('/register', 
  [
    check('name')
      .isLength({ min: 1 })
      .withMessage('! Error: Please enter a name'),
    check('email')
      .isLength({ min: 1 })
      .withMessage('! Error: Please enter an email'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const registration = new Registration(req.body);
      registration.save()
        .then(() => {
          res.render('thankyou', { title: 'Thank you page' });
        })
        .catch((err) => {
          console.log(err);
          res.send('Sorry! Something went wrong.');
        });
    } else {
      res.render('register', { 
        title: 'Registration form',
        errors: errors.array(),
        data: req.body,
      });
    }
  }
);

module.exports = router;
