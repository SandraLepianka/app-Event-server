const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  genre: {
    type: String,
    required: [true, 'The event type is required']
  },
  name: {
    type: String,
    required: [true, 'The event name is required']
  },
  image: {
    type: String, default: ''
  },
  info: {
    type: Array,
    default: []
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;