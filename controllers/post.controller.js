const mongoose = require("mongoose");
const { ApiError } = require("../utils/apiError");
const { createSocialPost, findOnePost, updateSocialPost } = require("../dataAccess/postAccess")
const { findOneGroup } = require("../dataAccess/groupAccess");
const { findOneLike, addLikeOnPost } = require("../dataAccess/likeAccess");
const { addComment } = require("../dataAccess/commentAccess");

/**
 * create Post in a group   
 */
const createPost = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { groupId, title, content } = req.body;
        const groupExists = await findOneGroup({ _id: mongoose.Types.ObjectId.createFromHexString(groupId) });
        if (!groupExists) {
            throw new Error("Group associated with Post no longer exists")
        }
        if (!groupExists.members?.find(m => m.member_id.equals(userId))) {
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
    } catch (error) {
        console.log(error)
        next(new ApiError(error.message, 400))
    }
}

/**
 * like the post if not already liked
 */
const likePost = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { postId } = req.params;
        const post = await findOnePost({ _id: postId });
        if (!post) {
            throw new Error("Post does not exists")
        }
        const query = {
            post_id: postId,
            user_id: userId
        }
        const likeExists = await findOneLike(query);
        if (likeExists) {
            throw new Error("You already liked the post")
        }
        const update = {
            $inc: { likes_count: 1 }
        }
        await updateSocialPost(postId, update);
        await addLikeOnPost(query);
        res.status(200).json({
            status: "success"
        })
    } catch (error) {
        console.log(error);
        next(new ApiError(error.message, 400))
    }
}

/**
 * Comment on a post 
 */
const commentOnPost = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { postId } = req.params;
        const post = await findOnePost({ _id: postId });
        if (!post) {
            throw new Error("Post does not exists")
        }
        const comment = {
            text: req.body.text,
            post_id: postId,
            author_id: userId
        }
        await addComment(comment)
        const update = {
            $inc: { comments_count: 1 }
        }
        await updateSocialPost(postId, update);
        res.status(201).json({
            status: "success",
            data: "Comment added successfully"
        })
    } catch (error) {
        next(new ApiError(error.message, 400));
    }
}


module.exports = {
    createPost,
    likePost,
    commentOnPost
}