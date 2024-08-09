const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        userId: userId,
        time: Date()
    }
    const token = jwt.sign(data, jwtSecretKey);
    return token;
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
}

module.exports = {generateToken, verifyToken};