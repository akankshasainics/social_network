const {ApiError} = require("../utils/apiError");
const mongoose = require("mongoose");
const {verifyToken} = require("../utils/jwt");
const {findOneUser} = require("../dataAccess/userAccess");

const authenticateUser = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token)
    {
        return next(new ApiError('Token not found. Please add token to get access.', 401))
    }
    try {
        const decodedData = verifyToken(token);
        const user = await findOneUser({_id: decodedData.userId});
        if(!user) 
        {
            return next(new ApiError('User does not exists', 401))
        }
        req.user = user;
        next();
    }
    catch(error)
    {
        return next(new ApiError('Invalid token', 401));
    }
}

module.exports = {authenticateUser}