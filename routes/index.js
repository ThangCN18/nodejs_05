var express = require("express");

var router = express.Router();
var schoolController = require("../controllers/schoolController");
var userController = require("../controllers/userController");

/* GET home page. */
router.get("/", schoolController.findAll);
router.get("/admin", function (req, res) {
  res.render("admin");
});
router.post("/admin", userController.login);
module.exports = router;
