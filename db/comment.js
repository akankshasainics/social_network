const Comment = require('../models/commentModel');

const addComment = async (data, session = null) => {
    return await Comment.create([data], {session});
}

module.exports = {
    addComment
}