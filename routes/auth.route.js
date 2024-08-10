const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth.controller");
const {loginValidator} = require("../validators/authValidator")
const {validate} = require("../middlewares/validationMiddleware")

router.post('/login', loginValidator, validate, authController.loginUser);

module.exports = router;