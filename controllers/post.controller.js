const mongoose = require("mongoose");
const { ApiError } = require("../utils/apiError");
const {createSocialPost, findOnePost, updateSocialPost} = require("../db/post");
const {findOneGroup} = require("../db/group");
const {findOneLike, addLikeOnPost} = require("../db/like");
const {addComment} = require("../db/comment");

/**
 * create Post in a group   
 */
const createPost = async(req, res, next) => {
    try {
        const userId = req.user._id;
        const {groupId, title, content} = req.body;
        const groupExists = await findOneGroup({_id: mongoose.Types.ObjectId.createFromHexString(groupId)});
        if(!groupExists)
        {
            next(new ApiError("Group associated with Post no longer exists", 404))
        }
        if(!groupExists.members?.find(m => m.member_id.equals(userId)))
        {
            next(new ApiError("User is not a member of group, Please check.", 401))
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
        next(new ApiError(error.message, 500))
    }
}

/**
 * like the post if not already liked
 */
const likePost = async(req, res, next) => {
    const session  = await mongoose.startSession();
    try {
        session.startTransaction();
        const userId = req.user._id;
        const {postId} = req.params;
        const post = await findOnePost({_id: postId});
        if(!post) {
            next(new ApiError("Post does not exists", 404))
        }
        const query = {
            post_id: postId,
            user_id: userId
        }
        const likeExists = await findOneLike(query);
        if(likeExists)
        {
            next(new ApiError("You already liked the post", 400))
        }
        const update = {
            $inc: {likes_count: 1}
        }
        await addLikeOnPost(query, session);
        await updateSocialPost(postId, update, session);
        res.status(200).json({
            status: "success"
        })
        await session.commitTransaction();
    } catch(error) {
        await session.abortTransaction();
        next(new ApiError(error.message, 500))
    }
    finally {
        await session.endSession();
    }
}

/**
 * Comment on a post 
 */
const commentOnPost = async(req, res, next) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const userId = req.user._id;
        const {postId} = req.params;
        const post = await findOnePost({_id: postId});
        if(!post) {
            next(new ApiError("Post does not exists", 404))
        }
        const comment = {
            text: req.body.text,
            post_id: postId,
            author_id: userId
        }
        await addComment(comment, session)
        const update = {
            $inc: {comments_count: 1}
        }
        await updateSocialPost(postId, update, session);
        res.status(201).json({
            status: "success",
            data: "Comment added successfully"
        })
        await session.commitTransaction();
    } catch(error) {
        await session.abortTransaction();
        next(new ApiError(error.message, 500));
    }
    finally {
        await session.endSession();
    }
}


module.exports = {
    createPost,
    likePost,
    commentOnPost
}