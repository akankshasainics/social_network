const { body } = require('express-validator');

const createUserValidator = [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('firstName')
        .notEmpty()
        .withMessage('First Name is required'),
    body('lastName')
        .notEmpty()
        .withMessage('Last Name is required'),
];

module.exports = {
    createUserValidator
}
