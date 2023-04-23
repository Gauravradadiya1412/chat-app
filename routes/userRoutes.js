const express = require("express");
const router = express.Router();

//import user controller
const userController = require("../controllers/user")

router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;