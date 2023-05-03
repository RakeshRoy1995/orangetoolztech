"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenVarify = exports.tokenRefreshor = exports.tokenGenerator = exports.hashPassword = void 0;
/**
 * authentication strategy
 *
 *
 */
var secretOrKey = require('./passport-strategy').jwtOptions.secretOrKey;
var jwt = require('jsonwebtoken');
const TOKEN_EXPIRE = process.env.TOKEN_EXPIRE;
const hashPassword = function (password, salt) {
    var crypto = require('crypto');
    return crypto.createHmac('sha512', salt).update(password).digest('hex');
};
exports.hashPassword = hashPassword;
const tokenGenerator = function (payload) {
    delete payload['password'];
    delete payload['token'];
    return jwt.sign(payload, secretOrKey, { expiresIn: TOKEN_EXPIRE });
};
exports.tokenGenerator = tokenGenerator;
const tokenRefreshor = function (token) {
    var payload = jwt.verify(token, secretOrKey);
    delete payload.iat;
    delete payload.exp;
    delete payload.nbf;
    delete payload.jti;
    return jwt.sign(payload, secretOrKey, { expiresIn: TOKEN_EXPIRE });
};
exports.tokenRefreshor = tokenRefreshor;
const tokenVarify = function (token) {
    try {
        var payload = jwt.verify(token, secretOrKey);
        return payload;
    }
    catch (error) {
        return error;
    }
};
exports.tokenVarify = tokenVarify;
