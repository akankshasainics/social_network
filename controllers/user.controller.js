const { createSocialUser, findOneUser } = require("../dataAccess/userAccess")
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
            throw new Error("Email already exists");
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
        next(new ApiError(err.message, 400));
    }
};

module.exports = {
    createUser
}