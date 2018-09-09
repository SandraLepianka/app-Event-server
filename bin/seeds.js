const mongoose = require('mongoose');
const Event = require('../models/event-model');

const dbName = 'explorer-blog';
// mongoose.connect(process.env.MONGODB_URI);
mongoose.connect(`mongodb://localhost/event-server`);

const event = [
  {
    type: "Art and Fashion",
    name: "CA Bacardi Night of Art & Fashion",
    image: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F49125914%2F130801460505%2F1%2Foriginal.jpg?w=1000&auto=compress&rect=0%2C8%2C498%2C249&s=0eed391aa7a9a0868fc1e285171d3a6c.jpg",
    details: [
        "Kick off the 25th Anniversary of Dress for Success Miami",
        "Location: American Museum of the Cuban Diaspora",
        "Celebrate Celia Cruz in a preview of 'Celia Forever'"
    ]
  },
  {
    type: "Yoga Sessions",
    name: "lululemon Yoga",
    image: "",
    details: [
        "Location: Brickell City Center Store",
        "Time: 10:00 am"
    ]
  },
];

  Event.create(event, (err) => {
    if (err) { throw(err); }
    console.log(`Created ${event.length} event`);
    mongoose.connection.close();
  });
