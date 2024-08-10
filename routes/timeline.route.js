const express = require('express');
const router = express.Router();
const { authenticateUser } = require("../middlewares/authMiddleware");
const timelineController = require("../controllers/timeline.controller");

// Route to get posts on timeline of user
router.get('/', authenticateUser, timelineController.getTimelinePosts);

module.exports = router;