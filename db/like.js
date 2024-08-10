const Like = require('../models/likeModel');

const addLikeOnPost = async (data, session) => {
    return await Like.create([data], {session: session});
}

const findOneLike = async (query = {}) => {
    return await Like.findOne({ ...query })
}

module.exports = {
    addLikeOnPost,
    findOneLike
}