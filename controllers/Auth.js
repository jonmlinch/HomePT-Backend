// load environmental variables
require('dotenv').config;
// load web framework
const express = require('express');
// load token functionality for frontend/backend communciation
const jwt = require('jsonwebtoken');
// load models/index.js for all models in database
const db = require('../models');
// load router to export routes to /index.js
const router = express.Router();

// endpoint for logging in users
router.post('/login', (req, res) => {
  // look for user in database
  db.User.findOne({ email: req.body.email })
    .then(user => {
      // check if user was found
      if(!user) {
        return res.status(403).send('That email is not registered');
      }
      // verify password
      if (!user.authenticated(req.body.password)) {
        // password failed authentication
        return res.status(401).send('Invalid credentials');
      }
      // user logged in, generate token
      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
        // provide user with a 1 week login
        expiresIn: 60 * 60 * 24 * 7
      });
      // send token to the frontend
      res.send({ token });
    })
    .catch(err => {
      console.log('err logging in user:', err);
      return res.status(503).send('Internal error');
    });
});

module.exports = router;
