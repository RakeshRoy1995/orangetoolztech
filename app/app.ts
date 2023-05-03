var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
require('dotenv').config()

const { connectDB } = require("./config/db.config");


import indexRouter from "./routers/api.routes";
import frontRouter from "./routers/front.routes";
import helmet from "helmet";


var app = express();
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(helmet.xssFilter());
app.use(cors())
connectDB()

app.use('/api', indexRouter);
app.use('/', frontRouter);

// catch 404 and forward to error handler
app.use(function(req:any, res:any, next:any) {
  next(createError(404));
});

// error handler
app.use(function(err:any, req:any, res:any, next:any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({ status: false , err: err});
});

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(`Server running in port --> ${PORT}`)
);
