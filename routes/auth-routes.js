const express = require('express');
const passport = require('passport');
// const ensureLogin = require("connect-ensure-login");

const User = require('../models/user-model');
const authRoutes = express.Router();

const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;

// ==========SIGNUP================


authRoutes.post('/signup', (req, res, next) => {
  console.log('the body: ', req.body)
const username = req.body.username;
const password = req.body.password;
  
if (!username || !password) {
  res.status(400).json({ message: 'Please provide both a username and A password to signup' });
  return;
}

User.findOne({ username }, '_id', (err, foundUser) => {
  if (foundUser) {
    res.status(400).json({ message: 'The username already exists' });
    return;
}

const salt     = bcrypt.genSaltSync(bcryptSalt);
const hashPass = bcrypt.hashSync(password, salt);
      
const newUser = new User({
    username,
    password: hashPass
});

newUser.save((err) => {
    if (err) {
      res.status(400).json({ message: 'Something went wrong' });
      return;
    }
  
    req.login(newUser, (err) => {
      console.log('whos is user: ', newUser)
      if (err) {
        res.status(500).json({ message: 'Something went wrong' });
        return;
    }
      res.status(200).json(req.user);
      });
    });
  });
});

//==============LOGIN============DO NOT TOUCH -EVERRRRRRR!!!!!

authRoutes.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong' });
      return;
    }
  
    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }
  
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' });
        return;
    }
// CURRENTLY LOGGED IN (as per req.user)
       res.status(200).json(req.user);
      });
    })(req, res, next);
  });

// LOGGED OUT

authRoutes.post('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Success' });
});

// ENSURE USER IS LOGGED IN = 
  // RETURNS (due to isAuth) username or 'message for unauthorized'
authRoutes.get('/loggedin', (req, res, next) => {
  console.log('in logged in user is: ', req.user)
    if (req.isAuthenticated()) {
      res.status(200).json(req.user);
      return;
    }

    res.status(403).json({ message: 'Unauthorized' });
  });

  //GET PRIVATE PAGE
  
  authRoutes.get('/private', (req, res, next) => {
    if (req.isAuthenticated()) {
      res.json({ message: 'This is a private message' });
      return;
    }
  
    res.status(403).json({ message: 'Unauthorized' });
  }); 

module.exports = authRoutes;
