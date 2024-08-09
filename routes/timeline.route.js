const express = require('express');
const router = express.Router();
const { authenticateUser} = require("../middlewares/authMiddleware");
const timelineController = require("../controllers/timeline.controller");

router.get('/', authenticateUser,  timelineController.getTimelinePosts);

module.exports = router;