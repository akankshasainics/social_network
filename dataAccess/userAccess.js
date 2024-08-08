const User = require('../models/userModel');

const createSocialUser = async(user) => {
    return await User.create(user);
}

const findOneUser = async(query = {}) => {
    return await User.findOne(query);
}

module.exports = {
    createSocialUser,
    findOneUser
}