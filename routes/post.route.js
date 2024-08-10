const express = require('express');
const router = express.Router();
const { authenticateUser, authorizeUser} = require("../middlewares/authMiddleware");
const postController = require("../controllers/post.controller");
const {createPostValidator, addCommentValidator} = require("../validators/postValidator")
const {objectIdValidator} = require("../validators/customValidator");
const {validate} = require("../middlewares/validationMiddleware");

router.post('/', authenticateUser, createPostValidator, validate, postController.createPost);
router.post('/:postId/like', authenticateUser, authorizeUser, objectIdValidator('postId'), validate, postController.likePost);
router.post('/:postId/comments', authenticateUser, authorizeUser, addCommentValidator, validate, postController.commentOnPost)

module.exports = router;