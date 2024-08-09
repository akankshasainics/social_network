const { default: mongoose } = require('mongoose');
const Post = require('../models/postModel');

const createSocialPost = async(post) => {
    return await Post.create(post);
}

const updateSocialPost = async(postId, update) => {
    return await Post.updateOne({
        _id: postId
    }, {
        ...update
    });
}

const findOnePost = async(query = {}) => {
    return await Post.findOne(query);
}

const findPostsOfGroup = async(data) => {
    const {groupId, limit, skip} =  data;
    return await Post.aggregate([
        {
            $match: {
                group_id: mongoose.Types.ObjectId.createFromHexString(groupId)
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'author_id',
                foreignField: '_id',
                as: "users"
            }
        },
        {
            $unwind: "$users"
        },
        {
            $addFields: {
                author_name: {
                    $concat: ["$users.first_name", " ", "$users.last_name"]
                }
            }
        },
        {
            $project: {
                title: 1,
                content: 1,
                likes_count: 1,
                comments_count: 1,
                created_at: 1,
                author_name: 1
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
    createSocialPost,
    updateSocialPost,
    findOnePost,
    findPostsOfGroup
}