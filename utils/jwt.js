const jwt = require("jsonwebtoken");

/**
 * Generate JWT token using secret key for given userId
 */
const generateToken = (userId) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        userId: userId,
        time: Date()
    }
    const token = jwt.sign(data, jwtSecretKey);
    return token;
}

/**
 * verify JWT token with secret key
 */
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
}

module.exports = { generateToken, verifyToken };