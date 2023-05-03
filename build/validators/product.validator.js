"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.registrationSchema = exports.loginSchema = void 0;
const express_validator_1 = require("express-validator");
exports.loginSchema = [
    (0, express_validator_1.body)('email', 'Email is required').isString().isEmail(),
    (0, express_validator_1.body)('password', 'password is required').isString().isLength({ min: 6 }),
];
exports.registrationSchema = [
    (0, express_validator_1.body)('is_customer', 'Is customer is required').isBoolean().withMessage('Should be Boolean'),
    (0, express_validator_1.body)('phone', 'Phone is required').isString().withMessage('Should be string'),
    (0, express_validator_1.body)('type', 'Type is required').isString().withMessage('Should be string'),
    (0, express_validator_1.body)('email', 'Email is required').isString().isEmail().withMessage('Email formate is wrong'),
    (0, express_validator_1.body)('name', 'Name is required').isString().isLength({ min: 3 })
        .withMessage('must be at least 3 chars long'),
    (0, express_validator_1.body)('password', 'password is required').isString().withMessage('Should be String').isLength({ min: 6 }).withMessage('must be at least 6 chars long'),
];
exports.updateProductSchema = [
    (0, express_validator_1.body)('name', 'Product name is required').isString(),
    (0, express_validator_1.body)('price', 'Price is required').isString(),
    (0, express_validator_1.body)('description', 'Description is required').isString(),
    (0, express_validator_1.body)('status', 'Status is required').isString(),
];
