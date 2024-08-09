const User = require('../models/userModel');
const mongoose = require("mongoose");

const createSocialUser = async(user) => {
    return await User.create(user);
}

const findOneUser = async(query = {}) => {
    return await User.findOne(query);
}

const addGroup = async(userId, groupId, session = null) => {
    return await User.updateOne(
    {
       _id: userId
    },{
        $push: {joined_groups: groupId}
    }).session(session);
}

module.exports = {
    createSocialUser,
    findOneUser,
    addGroup
}