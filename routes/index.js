const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/private', (req, res, next) => {
  res.render('private');
});

router.get('/event', (req, res, next) => {
  res.render('event');
});
router.get('/event-add', (req, res, next) => {
  res.render('private');
});

module.exports = router;
