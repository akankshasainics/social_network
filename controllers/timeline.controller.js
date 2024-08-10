const { ApiError } = require("../utils/apiError");
const { findUsersTimelinePosts } = require("../dataAccess/userAccess");

/**
 * get posts of groups join by the user
 * sorted by newest first 
 */
const getTimelinePosts = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { page = 1, limit = 20 } = req.query;
        const data = {
            userId,
            skip: (parseInt(page) - 1) * parseInt(limit),
            limit: parseInt(limit)
        }
        const result = await findUsersTimelinePosts(data);
        res.status(200).json({
            status: "success",
            length: result.length,
            data: result
        })
    } catch (error) {
        next(new ApiError(error.message, 400))
    }
}

module.exports = {
    getTimelinePosts
}