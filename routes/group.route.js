const express = require('express');
const router = express.Router();
const { authenticateUser} = require("../middlewares/authMiddleware");
const groupController = require("../controllers/group.controller");

router.post('/', authenticateUser, groupController.createGroup);
router.get('/', authenticateUser, groupController.getGroupList);
router.post('/:groupId/join', authenticateUser, groupController.joinGroup);
router.get('/:groupId/posts', authenticateUser, groupController.getPosts)

module.exports = router;