const express = require('express');
const router = express.Router();
const { authenticateUser} = require("../middlewares/authMiddleware");
const postController = require("../controllers/post.controller");

router.post('/', authenticateUser, postController.createPost);

module.exports = router;