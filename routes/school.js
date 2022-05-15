const express = require("express");
const router = express.Router();
const schoolController = require("../controllers/schoolController");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

var upload = multer({
  storage: storage,
}).single("images");

router.get("/", schoolController.search_school);
router.get("/add", schoolController.add_school);
router.post("/", schoolController.search_school);
router.post("/add", upload, schoolController.create);

router.get("/:id", schoolController.findById);
router.get("/edit/:id", schoolController.edit_school);
router.post("/update/:id", upload, schoolController.update);
router.get("/delete/:id", schoolController.delete);

module.exports = router;
