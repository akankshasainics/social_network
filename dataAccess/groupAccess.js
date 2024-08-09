const Group = require('../models/groupModel');

const createSocialGroup = async(group, session = null) => {
    return await Group.create(group);
}

const findOneGroup = async(query = {}) => {
    return await Group.findOne(query)
}

module.exports = {
    createSocialGroup,
    findOneGroup
}