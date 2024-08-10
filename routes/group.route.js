const express = require('express');
const router = express.Router();
const { authenticateUser } = require("../middlewares/authMiddleware");
const groupController = require("../controllers/group.controller");
const { createGroupValidator } = require("../validators/groupValidator")
const { objectIdValidator } = require("../validators/customValidator")
const { validate } = require("../middlewares/validationMiddleware")

// Route to create a group
router.post('/', authenticateUser, createGroupValidator, validate, groupController.createGroup);

// Route to get list of all groups
router.get('/', authenticateUser, groupController.getGroupList);

// Route to join a group
router.post('/:groupId/join', authenticateUser, objectIdValidator('groupId'), validate, groupController.joinGroup);

// Route to get posts of a group
router.get('/:groupId/posts', authenticateUser, objectIdValidator('groupId'), validate, groupController.getPosts)

module.exports = router;