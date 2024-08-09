const express = require('express');
const router = express.Router();
const { authenticateUser} = require("../middlewares/authMiddleware");
const groupController = require("../controllers/group.controller");

router.post('/', authenticateUser, groupController.createGroup);

module.exports = router;