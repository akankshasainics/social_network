const express = require('express');
const router = express.Router();
const { authenticateUser} = require("../middlewares/authMiddleware");
const postController = require("../controllers/post.controller");
const {createPostValidator, addCommentValidator} = require("../validators/postValidator")
const {objectIdValidator} = require("../validators/customValidator");
const {validate} = require("../middlewares/validationMiddleware");

router.post('/', authenticateUser, createPostValidator, validate, postController.createPost);
router.post('/:postId/like', authenticateUser, objectIdValidator('postId'), validate, postController.likePost);
router.post('/:postId/comments', authenticateUser, addCommentValidator, validate, postController.commentOnPost)

module.exports = router;