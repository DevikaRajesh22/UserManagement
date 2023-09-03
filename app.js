const createError = require('http-errors');
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const methodOverride=require('method-override');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const { flash } = require('express-flash-message');
const adminRouter = require('../Users/router/adminRouter');
const userRouter = require('../Users/router/userRouter');
const nocache = require('nocache');
const app = express();

//connect to database
connectDB();

// view engine setup
app.set('Views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(session({
  secret: "someKey",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, //one week
  }
}));

//flash message
app.use(flash({sessionKeyName:'flashMessage'}));

//for cache
app.use(nocache());

//routes
app.use('/',userRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log('route not found');
  next(createError(404));
});

//handle 404
app.get('*', (req, res) => {
  res.status(404).render('404');
});


module.exports = app;
