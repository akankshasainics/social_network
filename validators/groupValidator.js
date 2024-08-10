const { body, param } = require('express-validator');
const { isValidObjectId } = require('./customValidator')

const createGroupValidator = [
    body('name')
        .notEmpty()
        .withMessage('Group Name is required'),
];

const joinGroupValidator = [
    param('groupId')
        .custom(isValidObjectId)
        .withMessage('Group Id is not valid')
]

module.exports = {
    createGroupValidator,
    joinGroupValidator
}
