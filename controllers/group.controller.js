const mongoose = require("mongoose");
const { ApiError } = require("../utils/apiError");
const { createSocialGroup, findOneGroup, findGroups, addMember } = require("../db/group")
const { addGroup, findOneUser } = require("../db/user");
const { findPostsOfGroup } = require("../db/post");

/**
  Create a social group 
 */
const createGroup = async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const user = req.user;
        const { name, description } = req.body;
        const group = {
            name,
            description,
            created_by: user._id,
            members: [
                {
                    member_id: user._id
                }
            ]
        }
        const duplicateExists = await findOneGroup({ name: name });
        if (duplicateExists) {
            next(new ApiError("Group name already exists. Try some another name.", 400))
        }
        const result = await createSocialGroup(group, session);
        await addGroup(user._id, result._id, session);
        res.status(201).json({
            status: 'success',
            data: "Group created successfully"
        });
        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        next(new ApiError(error.message, 400))
    }
    finally {
        await session.endSession();
    }
}

/**
 * get list of all social groups 
 */
const getGroupList = async (req, res, next) => {
    try {
        const list = await findGroups();
        res.status(201).json({
            status: 'success',
            data: list
        });

    } catch (error) {
        next(new ApiError(error.message, 400))
    }
}

/**
* join the group if not already join  
 */
const joinGroup = async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { groupId } = req.params;
        const userId = req.user._id;
        const query = {
            _id: userId,
            joined_groups: { $in: [groupId] }
        }
        const groupExists = await findOneUser(query);
        if (groupExists) {
            next(new ApiError("Group already joined.", 400))
        }
        await addGroup(userId, groupId, session);
        await addMember(groupId, userId, session);
        res.status(200).json({
            status: "success",
            data: "Group joined successfully"
        })
        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        next(new ApiError(error.message, 500))
    }
    finally {
        await session.endSession();
    }
}

/**
 * get posts a group  
 */
const getPosts = async (req, res, next) => {
    try {
        const { groupId } = req.params;
        const { page = 1, limit = 20 } = req.query;
        const group = await findOneGroup({ _id: groupId });
        if (!group) {
            next(new ApiError("Group does not exists", 404))
        }
        const data = {
            skip: (parseInt(page) - 1) * limit,
            limit: parseInt(limit),
            groupId
        }
        const result = await findPostsOfGroup(data);
        res.status(200).json({
            status: "success",
            length: result.length,
            data: result
        })

    } catch (error) {
        next(new ApiError(error.message, 500))
    }
}

module.exports = {
    createGroup,
    getGroupList,
    joinGroup,
    getPosts
}