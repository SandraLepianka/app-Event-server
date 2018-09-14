var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const upload = require('../config/multer');
const multer = require('multer');
const Event = require('../models/event-model');

// multer for photo
const myUploader = multer({
  dest: __dirname + "/../public/uploads/"
});


/* GET Events list. */
router.get('/events', (req, res, next) => {
  Event.find()
  .then((eventsList, err) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(eventsList);
  })
  .catch(error => next(error));
});

  // /* CREATE a new Event. */
  router.post('/events', upload.single('eventImg'),function(req, res) {
    console.log('req.file ', req.file);
    // const img = req.file.filename;
    const event = new Event({
      genre: req.body.genre,
      name: req.body.name,
      // image: req.body.img || '',
      specs: req.body.specs,
      // image: `/../public/uploads/${req.file.filename}`,
      // specs: JSON.parse(req.body.specs) || []
      
    });

    if(req.file){
      event.image = '/uploads/' + req.file.filename;
    }
  
    event.save((err) => {
      if (err) {
        return res.send(err);
      }
  
      return res.json(event);
    });
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
    // image: req.body.image, 
  };

  Event.findByIdAndUpdate(req.params.id, updates)
  .then(event => {
    res.json({
      message: `Event list updated successfully with the event ${event._id}`
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
      message: `Event has been removed!`
    });
  })
  .catch(error => next(error));
});

module.exports = router;