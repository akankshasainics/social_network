const Like = require('../models/likeModel');

const addLikeOnPost = async(data) => {
    return await Like.create(data);
}

const findOneLike = async(query = {}) => {
    return await Like.findOne({...query})
}

module.exports  = {
    addLikeOnPost,
    findOneLike
}