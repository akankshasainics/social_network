const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller");
const { createUserValidator } = require("../validators/userValidator")
const { validate } = require("../middlewares/validationMiddleware")

// Route to create a user
router.post('/', createUserValidator, validate, userController.createUser);

module.exports = router;