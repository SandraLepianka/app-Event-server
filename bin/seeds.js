// const mongoose = require('mongoose');
// const Event = require('../models/event-model');

// const dbName = 'explorer-blog';
// // mongoose.connect(process.env.MONGODB_URI);
// // mongoose.connect(`mongodb://localhost/event-server`);
// mongoose.connect(`mongodb://localhost/${dbName}`);

// const event = [
//   { 
//     genre: "Fashion and Art",
//     name: "CA Bacardi Night of Art & Fashion",
//     image: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F49125914%2F130801460505%2F1%2Foriginal.jpg?w=1000&auto=compress&rect=0%2C8%2C498%2C249&s=0eed391aa7a9a0868fc1e285171d3a6c.jpg",
//     specs: [
//         "Kick off the 25th Anniversary of Dress for Success Miami",
//         "Location: American Museum of the Cuban Diaspora",
//         "Celebrate Celia Cruz in a preview of 'Celia Forever'"
//     ]
//   },
//   {
//     genre: "Health and Wellness",
//     name: "lululemon Yoga",
//     image: "",
//     specs: [
//         "Location: Brickell City Center Store",
//         "Time: 10:00 am"
//     ]
//   },
// {

//         genre: "Fashion and Accessories",
//         name: "Friends Share and Exchange Event",
//         image: "https://c8.alamy.com/comp/P6P9RA/miami-fashion-week-2018-rene-ruiz-runway-featuring-model-where-miami-florida-united-states-when-31-may-2018-credit-johnny-louiswenncom-P6P9RA.jpg",
//         specs: [
//             "Location: Brickell City Center Store",
//             "Time: 10:00 PM"
//         ]
//     },

//   Event.create(events, (err) => {
//     if (err) { throw(err); }
//     console.log(`Created ${event.length} event`);
//     mongoose.connection.close();
//   });
