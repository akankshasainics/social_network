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

module.exports = {
    createSocialPost,
    updateSocialPost,
    findOnePost
}