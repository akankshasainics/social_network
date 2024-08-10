const { ApiError } = require("../utils/apiError");
const { verifyToken } = require("../utils/jwt");
const { findOneUser } = require("../dataAccess/userAccess");
const { findOnePost } = require("../dataAccess/postAccess");

/**
 * authenticate user based on JWT token
 * add user to req on successful verification
 */
const authenticateUser = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new ApiError('Token not found. Please add token to get access.', 401))
    }
    try {
        const decodedData = verifyToken(token);
        const user = await findOneUser({ _id: decodedData.userId });
        if (!user) {
            return next(new ApiError('User does not exists', 401))
        }
        req.user = user;
        next();
    }
    catch (error) {
        return next(new ApiError('Invalid token', 401));
    }
}

/**
 * check if user is authorized to perform operation on a post
 */
const authorizeUser = async (req, res, next) => {
    try {
        const { joined_groups } = req.user;
        const { postId } = req.params;
        const post = await findOnePost({ _id: postId });
        if (!post) {
            return next(new ApiError('Post does not found.', 404))
        }
        if (!joined_groups.find(g => g.equals(post.group_id))) {
            return next(new ApiError('User is not authorized to perform operation in this group.', 401))
        }
        next();
    } catch (error) {
        return next(new ApiError())
    }
}

module.exports = { authenticateUser, authorizeUser }