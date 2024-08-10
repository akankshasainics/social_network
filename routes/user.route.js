const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller");
const {createUserValidator} = require("../validators/userValidator")
const {validate} = require("../middlewares/validationMiddleware")

router.post('/', createUserValidator, validate, userController.createUser);

module.exports = router;