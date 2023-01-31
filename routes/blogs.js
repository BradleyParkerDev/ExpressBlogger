const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('blogs page');
  res.send(res.json({success: true, route: "blogs", message:"Welcome to the blogs page."}));
});

module.exports = router;
