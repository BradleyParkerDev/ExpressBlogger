var express = require("express");
var router = express.Router();
// const { db } = require("../mongo");


const usersController = require('../controllers/usersController');

// GET All Blog Posts
router.get('/message',usersController.message);
router.post("/registration", usersController.registration);
router.post("/login", usersController.login);
module.exports = router;






