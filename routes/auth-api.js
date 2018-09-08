const express    = require('express');
const passport   = require('passport');


// Our user model
const User       = require('../models/user-model');

const authRoutes = express.Router();

// BCrypy encrypt passwords
const bcrypt     = require('bcrypt');
const bcryptSalt     = 10;

//SIGNUP=======================================
authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).json({ message: 'Provide username and password' });
    return;
  }

  User.findOne({ username }, '_id', (err, foundUser) => {
    if (foundUser) {
      res.status(400).json({ message: 'The username already exists' });
      return;
    }

    const salt     = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const theUser = new User({
      username,
      password: hashPass
    });

    theUser.save((err) => {
      if (err) {
        res.status(400).json({ message: 'Something went wrong' });
        return;
      }

      req.login(theUser, (err) => {
        if (err) {
          res.status(500).json({ message: 'Something went wrong' });
          return;
        }

        res.status(200).json(req.user);
      });
      });
    });
  });

////LOG IN =======================

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

      // We are now logged in (notice req.user)
      res.status(200).json(req.user);
    });
  })(req, res, next);
});

//LOG OUT=====================

authRoutes.post('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Success' });
});

// IS LOGGED IN????????????????

authRoutes.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }

  res.status(403).json({ message: 'Unauthorized' });
});

//PRIVATE ROUTE===============

authRoutes.get('/private', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json({ message: 'This is a private message' });
    return;
  }

  res.status(403).json({ message: 'Unauthorized' });
});

module.exports = authRoutes;



//===============SIGNUP=================== 
// authRoutes.get("/signup", (req, res, next) => {
//   res.render("auth/signup");
// });


// authRoutes.post("/signup", (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   if (username === "" || password === "") {
//     res.render("auth/signup", {
//       errorMessage: "Indicate a username and a password to sign up"
//     });
//     return;
//   }

//   User.findOne({ "username": username })
//   .then(user => {
//     if (user !== null) {
//         res.render("auth/signup", {
//           errorMessage: "The username already exists"
//         });
//         return;
//       }
  
//       const salt     = bcrypt.genSaltSync(bcryptSalt);
//       const hashPass = bcrypt.hashSync(password, salt);
  
//       const newUser = User({
//         username,
//         password: hashPass
//       });
  
//       newUser.save()
//       .then(user => {
//         res.redirect("/");
//       });
//   })
//   .catch(error => {
//       next(error);
//   });
// });

// //===================LOGIN==================TESTED
// authRoutes.get("/login", (req, res, next) => {
//   res.render("auth/login");
// });

// authRoutes.post("/login", (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   if (username === "" || password === "") {
//     res.render("auth/login", {
//       errorMessage: "Indicate a username and a password to sign up"
//     });
//     return;
//   }

//   User.findOne({ "username": username }, (err, user) => {
//       if (err || !user) {
//         res.render("auth/login", {
//           errorMessage: "The username doesn't exist"
//         });
//         return;
//       }
//       if (bcrypt.compareSync(password, user.password)) {
//         // Save the login in the session!
//         req.session.currentUser = user;
//         res.redirect("/");
//       } else {
//         res.render("auth/login", {
//           errorMessage: "Incorrect password"
//         });
//       }
//   });
// });

// //=======================LOGOUT============TESTED 
// authRoutes.get("/logout", (req, res, next) => {
//   req.session.destroy((err) => {
//     // cannot access session here
//     res.redirect("/login");
//   });
// });

// module.exports = authRoutes;





//======================BELOW COMMENTED TO TEST ABOVE ==========


//================SIGNUP======================
// authRoutes.post('/signup', (req, res, next) => {
//     const {username, password} = req.body;
  
//     if (!username || !password) {
//       res.status(400).json({ message: 'Provide username and password ti sign up' });
//       return;
//     }
  
//     User.findOne({ username }, '_id', (err, foundUser) => {
//       if (foundUser) {
//         res.status(400).json({ message: 'The username already exists' });
//         return;
//       }

//       const salt     = bcrypt.genSaltSync(10);
//       const hashPass = bcrypt.hashSync(password, salt);
  
//       const theUser = new User({
//         username,
//         password: hashPass
//       });
  
//       theUser.save((err) => {
//         if (err) {
//           res.status(400).json({ message: 'Something went wrong' });
//           return;
//         }
  
//         req.login(theUser, (err) => {
//           if (err) {
//             res.status(500).json({ message: 'Something went wrong' });
//             return;
//           }
  
//           res.status(200).json(req.user);
//         });
//       });
//     });
//   });
//   //====================LOG IN=============
//   authRoutes.post('/login', (req, res, next) => {
//     passport.authenticate('local', (err, theUser, failureDetails) => {
//       if (err) {
//         res.status(500).json({ message: 'Something went wrong' });
//         return;
//       }
  
//       if (!theUser) {
//         res.status(401).json(failureDetails);
//         return;
//       }
  
//       req.login(theUser, (err) => {
//         if (err) {
//           res.status(500).json({ message: 'Something went wrong' });
//           return;
//         }
  
//         // You are now logged in (notice req.user)
//         res.status(200).json(req.user);
//       });
//     })(req, res, next);
//   });
// //======================LOG OUT=================
// authRoutes.post('/logout', (req, res, next) => {
//     req.logout();
//     res.status(200).json({ message: 'Success' });
//   });
//   // ==========? IS USER LOGGED IN?===========
//   authRoutes.get('/loggedin', (req, res, next) => {
//     if (req.isAuthenticated()) {
//       res.status(200).json(req.user);
//       return;
//     }
//     res.status(403).json({ message: 'Unauthorized' });
//   });

// // LOGGED IN ROUTE = PRIVATE SECRET MESSAGE IF LOGGED IN
// authRoutes.get('/private', (req, res, next) => {
//     if (req.isAuthenticated()) {
//       res.json({ message: 'This is a private message' });
//       return;
//     }
  
//     res.status(403).json({ message: 'Unauthorized' });
//   });

//   module.exports = authRoutes;
  