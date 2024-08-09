const Comment = require('../models/commentModel');

const addComment = async(data, seesion = null) => {
    return await Comment.create(data);
}

module.exports = {
    addComment
}