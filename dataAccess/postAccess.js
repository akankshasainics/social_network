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

module.exports = {
    createSocialPost,
    updateSocialPost
}