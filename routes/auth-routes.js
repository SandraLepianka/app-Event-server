const express = require('express');
// const authRoutes = express.Router();
const passport = require('passport');
// const ensureLogin = require("connect-ensure-login");

const User = require('../models/user-model');
const authRoutes = express.Router();

// BCrypy encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;



//===============SIGNUP=================== TESTED 
authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/signup", {
  errorMessage: "Please enter a username and a password to sign up"
  });
  return;
  }

  User.findOne({ "username": username })
  .then(user => {
    if (user !== null) {
        res.render("auth/signup", {
          errorMessage: "The username you enter has an account, please go to login."
        });
        return;
      }
  
      const salt     = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
  
      const newUser = User({
        username,
        password: hashPass
      });
      
      newUser.save((err) => {
        if (err) {
          res.render("auth/signup", { message: "Something went wrong" });
        } else {
          res.redirect("/private");
        }
      });
    })
    .catch(error => {
      next(error);
    });
  });

//       newUser.save()
//       .then(user => {
//         res.redirect("/private");
//       });
//   })
//   .catch(error => {
//       next(error);
//   });
// });

//===================LOGIN==================TESTED
authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login");
});

authRoutes.post("/login", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/login", {
      errorMessage: "Indicate a username and a password to sign up"
    });
    return;
  }

  User.findOne({ "username": username }, (err, user) => {
      if (err || !user) {
        res.render("auth/login", {
          errorMessage: "The username has not been found, please sign up"
        });
        return;
      }
      if (bcrypt.compareSync(password, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        res.redirect("/private");
      } else {
        res.render("auth/login", {
          errorMessage: "Incorrect password"
        });
      }
  });
});

//=======================LOGOUT============TESTED 
authRoutes.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    // cannot access session here
    res.redirect("/login");
  });
});

module.exports = authRoutes;

// ==========SIGNUP================


// authRoutes.post('/signup', (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;
  
//     if (!username || !password) {
//       res.status(400).json({ message: 'Please provide both a username and password' });
//       return;
//     }

//     // if (username === "" || password === "") {
//     //   res.render("auth/signup", { message: "Enter username and password" });
//     //   return;
//     // }

//     User.findOne({ username }, '_id', (err, foundUser) => {
//       if (foundUser) {
//         res.status(400).json({ message: 'The username already exists' });
//         return;
//       }
  
    
//     // User.findOne({ username })
//     // .then(user => {
//     //   if (user !== null) {
//     //     res.render("auth/signup", { message: "The username already exists" });
//     //     return;
//     //   }
  

// const salt     = bcrypt.genSaltSync(bcryptSalt);
// const hashPass = bcrypt.hashSync(password, salt);
      
//       const newUser = new User({
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
// // comment to test
//           res.status(200).json(req.user);
//         });
//       });
//     });
//   });

// authRoutes.post('/login', (req, res, next) => {
//   passport.authenticate('local', (err, theUser, failureDetails) => {
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
// // We are now logged in (notice req.user)
//        res.status(200).json(req.user);
//       });
//     })(req, res, next);
//   });

//   authRoutes.post('/logout', (req, res, next) => {
//     req.logout();
//     res.status(200).json({ message: 'Success' });
//   });

//   authRoutes.get('/loggedin', (req, res, next) => {
//     if (req.isAuthenticated()) {
//       res.status(200).json(req.user);
//       return;
//     }
  
//     res.status(403).json({ message: 'Unauthorized' });
//   });
//   authRoutes.get('/private', (req, res, next) => {
//     if (req.isAuthenticated()) {
//       res.json({ message: 'This is a private message' });
//       return;
//     }
  
//     res.status(403).json({ message: 'Unauthorized' });
//   });
    
  
//   //     newUser.save((err) => {
//   //       if (err) {
//   //         res.render("auth/signup", { message: "Something went wrong" });
//   //       } else {
//   //         res.redirect("/private");
//   //       }
//   //     });
//   //   })
//   //   .catch(error => {
//   //     next(error);
//   //   });
//   // });

//   //LOGIN ROUTE ===

// authRoutes.get("/login", (req, res, next) => {
//     res.render("auth/login", { "message": req.flash("error") });
//   });
  
//   authRoutes.post("/login", passport.authenticate("local", 
//   {
//     successRedirect: "/private",
//     failureRedirect: "auth/login",
//     failureFlash: true,
//     passReqToCallback: true
//   }));
  
//   authRoutes.post("/login", (req, res, next) => {
//     const username = req.body.username;
//     const password = req.body.password;
  
//     if (username === "" || password === "") {
//       res.render("auth/login", {
//         errorMessage: "Indicate a username and a password to sign up"
//       });
//       return;
//     }
  
//     User.findOne({ "username": username }, (err, user) => {
//         if (err || !user) {
//           res.render("/login", {
//             errorMessage: "The username doesn't exist, please signup"
//           });
//           return;
//         }
//         if (bcrypt.compareSync(password, user.password)) {
//           // Save the login in the session!
//           req.session.currentUser = user;
//           res.redirect("/private");
//         } else {
//           res.render("auth/login", {
//             errorMessage: "Incorrect password"
//           });
//         }
//         authRoutes.get("/private", ensureLogin.ensureLoggedIn(), (req, res) => {
//           res.render("private", { user: req.user });
//         });
  
//         authRoutes.get("/logout", (req, res) => {
//           req.logout();
//           res.redirect("/");
//         });
  
//     });
//   });


 