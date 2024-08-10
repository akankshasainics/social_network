const { validationResult} = require('express-validator');

/**
 * validate request
 * send errors in res if not valid request
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    next()
}

module.exports = {
    validate
}