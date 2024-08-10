const mongoose = require("mongoose");
const {param} = require('express-validator');

const isValidObjectId = (value) => {
    return mongoose.Types.ObjectId.isValid(value);
}

const objectIdValidator =  (paramName) => [
    param(paramName)
        .custom(isValidObjectId)
        .withMessage(`${paramName} is not valid`)
]

module.exports = {
    objectIdValidator,
    isValidObjectId
}