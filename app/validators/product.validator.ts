import { body } from 'express-validator';

export const loginSchema = [
    body('email', 'Email is required').isString().isEmail(),
    body('password', 'password is required').isString().isLength({ min: 6 }),
]

export const registrationSchema = [
    body('is_customer', 'Is customer is required').isBoolean().withMessage('Should be Boolean'),
    body('phone', 'Phone is required').isString().withMessage('Should be string'),
    body('type', 'Type is required').isString().withMessage('Should be string'),
    body('email', 'Email is required').isString().isEmail().withMessage('Email formate is wrong'),
    body('name', 'Name is required').isString().isLength({ min: 3 })
    .withMessage('must be at least 3 chars long'),
    body('password', 'password is required').isString().withMessage('Should be String').isLength({ min: 6 }).withMessage('must be at least 6 chars long'),
];

export const updateProductSchema = [
    body('name', 'Product name is required').isString(),
    body('price', 'Price is required').isString(),
    body('description', 'Description is required').isString(),
    body('status', 'Status is required').isString(),
];
