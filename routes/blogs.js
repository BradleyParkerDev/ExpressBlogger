const { v4: uuidv4 } = require("uuid");
var express = require("express");
var router = express.Router();


const blogsController = require('../controllers/blogsController');

// GET All Blog Posts
router.get('/',blogsController.getAllBlogs);
router.post("/create-one", blogsController.createOneBlog);
router.get('/get-one/:id', blogsController.getOneBlog);
router.put("/update-one/:id", blogsController.updateOneBlog);
router.delete("/delete-one/:id", blogsController.deleteOneBlog);

module.exports = router;