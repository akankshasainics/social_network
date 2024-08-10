const { createSocialUser, findOneUser } = require("../db/user")
const { ApiError } = require('../utils/apiError');
const { encryptText } = require("../utils/encryption");

/**
 * Create user
 * Each user should have unique email
 */
const createUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const duplicateUser = await findOneUser({ email: email });
        if (duplicateUser) {
            next(new ApiError("Email already exists", 400))
        }
        const hashPassword = encryptText(password);
        const user = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password_hash: hashPassword
        }
        await createSocialUser(user);
        res.status(201).json({
            status: 'success',
            data: "User created successfully"
        });
    } catch (err) {
        next(new ApiError(err.message, 500));
    }
};

module.exports = {
    createUser
}