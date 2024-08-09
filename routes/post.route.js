const express = require('express');
const router = express.Router();
const { authenticateUser} = require("../middlewares/authMiddleware");
const postController = require("../controllers/post.controller");

router.post('/', authenticateUser, postController.createPost);
router.post('/:postId/like', authenticateUser, postController.likePost);
//router.post('/:postId/comments', authenticateUser, postController.commentOnPost)

module.exports = router;