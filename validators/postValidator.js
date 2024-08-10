const { body } = require('express-validator');
const {isValidObjectId, objectIdValidator} = require("../validators/customValidator")


const createPostValidator = [
    body('title')
        .notEmpty()
        .withMessage('title is required'),
    body('content')
        .notEmpty()
        .withMessage('content is required'),
    body('groupId')
        .custom(isValidObjectId)
        .withMessage('groupId is not valid')
];

const addCommentValidator = [
    body('text')
        .notEmpty()
        .withMessage('text is required'),
    objectIdValidator('postId') 
];

module.exports = {
    createPostValidator,
    addCommentValidator
}

