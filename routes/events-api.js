var express = require('express');
var router = express.Router();

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
     type: req.body.type,
      name: req.body.name,
      image: req.body.image || '',
      details: req.body.details
      
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
router.get('/phones/:id', (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Phone.findById(req.params.id)
  .then(thePhone => {
      res.json(thePhone);
  })
  .catch(error => next(error));
});

/* EDIT AN EVENT. */
router.put('/phones/:id', (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  const updates = {
    brand: req.body.brand,
    name: req.body.name,
    specs: req.body.specs,
    image: req.body.image
  };

  Phone.findByIdAndUpdate(req.params.id, updates)
  .then(phone => {
    res.json({
      message: 'Phone updated successfully'
    });
  }) 
  .catch(error => next(error));     
});

/* DELETE AN EVENT. */
router.delete('/phones/:id', (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Phone.remove({ _id: req.params.id })
  .then(message => {
    return res.json({
      message: 'Phone has been removed!'
    });
  })
  .catch(error => next(error));
});


module.exports = router;