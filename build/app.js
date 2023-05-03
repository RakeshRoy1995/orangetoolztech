"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config();
const { connectDB } = require("./config/db.config");
const api_routes_1 = __importDefault(require("./routers/api.routes"));
const front_routes_1 = __importDefault(require("./routers/front.routes"));
const helmet_1 = __importDefault(require("helmet"));
var app = express();
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(helmet_1.default.xssFilter());
app.use(cors());
connectDB();
app.use('/api', api_routes_1.default);
app.use('/', front_routes_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500).json({ status: false, err: err });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in port --> ${PORT}`));
