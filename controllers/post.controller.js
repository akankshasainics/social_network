const mongoose = require("mongoose");
const {ApiError} = require("../utils/apiError");
const {createSocialPost} = require("../dataAccess/postAccess")
const {findOneGroup} = require("../dataAccess/groupAccess");

const createPost = async(req, res, next) => {
    try {
        const userId = req.user._id;
        const {groupId, title, content} = req.body;
        const groupExists = await findOneGroup({_id: mongoose.Types.ObjectId.createFromHexString(groupId)});
        if(!groupExists)
        {
            throw new Error("Group associated with Post no longer exists")
        }
        if(!groupExists.members?.find(m => m.member_id.equals(userId)))
        {
            throw new Error("User is not a member of group, Please check.")
        }
        const post = {
            title,
            content,
            author_id: userId,
            group_id: groupId
        }
        await createSocialPost(post);
        res.status(201).json({
            status: "success",
            data: "Post created successfully"
        })
    } catch(error) {
        console.log(error)
        next(new ApiError(error.message, 400))
    }
}


module.exports = {
    createPost
}