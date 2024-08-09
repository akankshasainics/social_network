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

const findUsersTimelinePosts = async(data) => {
    const {userId, skip, limit} = data;
    return await User.aggregate([
        {
           $match: {
            _id: userId
           } 
        },
        {
            $lookup: {
                from: 'posts',
                localField: 'joined_groups',
                foreignField: 'group_id',
                as: 'posts'
            }
        },
        {
            $unwind: '$posts'
        },
        {
            $replaceRoot: {newRoot: '$posts'}
        },
        {
            $lookup: {
                from: 'groups',
                localField: 'group_id',
                foreignField: '_id',
                as: 'groups'
            }
        },
        {
            $unwind: '$groups'
        },
        {
            $lookup: {
                from: 'users',
                localField: 'author_id',
                foreignField: '_id',
                as: 'users'
            }
        },
        {
            $unwind: '$users'
        },
        {
            $addFields: {
                author_name: {
                    $concat: [
                        "$users.first_name", " ", "$users.last_name"]
                },          
                group_name: "$groups.name"
            }
        },
        {
            $project: {
                title: 1,
                content: 1,
                author_name: 1,
                group_name: 1,
                likes_count: 1,
                comments_count: 1,
                created_at: 1
            }
        },
        {
            $sort: {
                created_at: -1
            }
        },
        {
            $skip: skip
        },
        {
            $limit: limit
        }
    ])
}

module.exports = {
    createSocialUser,
    findOneUser,
    addGroup,
    findUsersTimelinePosts,
}