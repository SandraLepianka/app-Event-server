var express = require('express');
var router = express.Router();
const upload = require('../config/multer');

const Event = require('../models/event-model');

/* GET = EVENT LIST. */

router.get('/events', (req, res, next) => {
  Event.find(eventsList)
  .then(eventsList => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(eventsList);
  })
  .catch(error => next(error));
});

/* CREATE  A NEW EVENT. */
router.post('/events', (req, res, next) => {
    const theEvent = new Event({
      genre: req.body.genre,
      name: req.body.name,
      info: req.body.info,
      image: '',
    });

    theEvent.save()
    .then(theEvent => {
      res.json({
        message: 'New Event created!',
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
    image: req.body.image,
    info: req.body.info,
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