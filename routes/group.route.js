const express = require('express');
const router = express.Router();
const { authenticateUser} = require("../middlewares/authMiddleware");
const groupController = require("../controllers/group.controller");
const {createGroupValidator} = require("../validators/groupValidator")
const {objectIdValidator} = require("../validators/customValidator")
const {validate} = require("../middlewares/validationMiddleware")

router.post('/', authenticateUser, createGroupValidator, validate, groupController.createGroup);
router.get('/', authenticateUser, groupController.getGroupList);
router.post('/:groupId/join', authenticateUser,  objectIdValidator('groupId'), validate, groupController.joinGroup);
router.get('/:groupId/posts', authenticateUser, objectIdValidator('groupId'), validate, groupController.getPosts)

module.exports = router;