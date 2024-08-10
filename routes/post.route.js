const express = require('express');
const router = express.Router();
const { authenticateUser, authorizeUser } = require("../middlewares/authMiddleware");
const postController = require("../controllers/post.controller");
const { createPostValidator, addCommentValidator } = require("../validators/postValidator")
const { objectIdValidator } = require("../validators/customValidator");
const { validate } = require("../middlewares/validationMiddleware");

// Route to create a post inside a group
router.post('/', authenticateUser, createPostValidator, validate, postController.createPost);

// Route to like a post
router.post('/:postId/like', authenticateUser, authorizeUser, objectIdValidator('postId'), validate, postController.likePost);

// Route to comment on a post
router.post('/:postId/comments', authenticateUser, authorizeUser, addCommentValidator, validate, postController.commentOnPost)

module.exports = router;