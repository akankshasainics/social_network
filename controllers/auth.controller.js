const { ApiError } = require('../utils/apiError');
const { encryptText } = require("../utils/encryption");
const { findOneUser } = require("../dataAccess/userAccess");
const { generateToken } = require("../utils/jwt");

/**
Login user on correct email and password input
returns token on success 
 */
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const hashPassword = encryptText(password);
        const query = {
            email: email,
            password_hash: hashPassword
        }
        const user = await findOneUser(query);
        if (!user) {
            return next(new ApiError('Incorrect email or password', 401));
        }
        const token = generateToken(user._id.toString());
        res.status(201).json({
            status: 'success',
            data: {
                token: token
            }
        });
    } catch (err) {
        next(new ApiError(err.message, 400));
    }
};

module.exports = {
    loginUser
}