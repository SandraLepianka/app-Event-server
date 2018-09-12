var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const upload = require('../config/multer');

// const Event = require('../models/event-model');

/* GET = EVENT LIST. */

router.get('/events', (req, res, next) => {
  Event.find({}, (err, events) => {
    if (err) {return res.json(err)}

    return res.json(events);
  }); 
});

// /* CREATE  A NEW EVENT. */ NOTES!!!!!!! COMMENTED TO TEST ALAN NOTES BELOW

// router.post('/', upload.single('file'), function(req, res) {
//   const event = new Event({
//     genre: req.body.genre,
//     name: req.body.name,
//     specs: JSON.parse(req.body.specs) || [],
//     image: `/uploads/${req.file.filename}
//     
//   });

//   theEvent.save((err) => {
//     if (err) {
//       return res.send(err);
//     }

//     return res.json({
//       message: 'A new EVENT has been created!',
//       phone: phone
//     });
//   });
// });

  // /* CREATE a new Phone. */ ALAN GITHUB
  router.post('/events', (req, res, next) => {
    const theEvent = new Event({
      genre: req.body.genre,
      name: req.body.name,
      specs: req.body.specs,
      image: req.body.image || '',
    });
  
    theEvent.save()
    .then(theEvent => {
      res.json({
        message: 'A new event has been created !',
        id: theEvent._id
      });
    })
    .catch(error => next(error));
  });

  /* GET A SINGLE EVENT */
router.get('/events/:id', (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Event.findById(req.params.id)
  .then(theEvent => {
      res.json(theEvent);
  })
  .catch(error => next(error));
});

/* EDIT AN EVENT. */
router.put('/events/:id', (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  const updates = {
    genre: req.body.genre,
    name: req.body.name,
    specs: req.body.specs,
    image: req.body.image, 
  };

  Event.findByIdAndUpdate(req.params.id, updates)
  .then(event => {
    res.json({
      message: 'Event list updated successfully'
    });
  }) 
  .catch(error => next(error));     
});

/* DELETE AN EVENT. */
router.delete('/events/:id', (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Event.remove({ _id: req.params.id })
  .then(message => {
    return res.json({
      message: 'Event has been removed!'
    });
  })
  .catch(error => next(error));
});


module.exports = router;