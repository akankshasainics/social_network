const Group = require('../models/groupModel');

const createSocialGroup = async(group, session = null) => {
    return await Group.create(group);
}

const findOneGroup = async(query = {}) => {
    return await Group.findOne(query)
}

const findGroups = async() => {
    return await Group.aggregate([
        {
            $addFields: {
                member_count: {
                    $size: "$members"
                }
            }
        },
        {
            $project: {
                name: 1,
                description: 1,
                member_count: 1,
                created_at: 1
            }
        },
        {
            $sort:  {
                created_at: -1
            }
        }
    ]);
}

const addMember = async(groupId, userId, session = null) => {
    return await Group.updateOne({
        _id: groupId
    }, {
        $push: {members: {member_id: userId}}
    })
}

module.exports = {
    createSocialGroup,
    findOneGroup,
    findGroups,
    addMember
}