require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors');
const Users = require('./models/user-model');
const Events = require('./models/event-model');
var eventsApi = require('./routes/events-api');
const multer = require('multer');

const authRoutes = require('./routes/auth-routes');

const passport   = require('passport');

mongoose.Promise = Promise;
mongoose
.connect('mongodb://localhost/event-server', {useMongoClient: true})
// .connect(process.env.MONGODB_URI, {useMongoClient: true})
//  .connect(`mongodb://localhost/${process.env.MONGODB_URI}`, {useMongoClient: true})
  // .connect('mongodb://localhost/event-server', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();
app.use(cors());

// // Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: "event-server",
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 600000000 },
  store: new MongoStore({
  mongooseConnection: mongoose.connection,
  ttl: 24 * 60 * 60 // 1 day
})
}));

app.use(passport.initialize());
app.use(passport.session());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

hbs.registerPartials(__dirname + '/views/partials');

// default value for title local
app.locals.title = 'Events';

const index = require('./routes/index');

app.use('/', index);
app.use('/', authRoutes);
app.use('/api', eventsApi);

app.use((req, res, next) => {
  res.sendfile(__dirname + '/public/index.html');
});


module.exports = app;
