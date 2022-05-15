const { render } = require("../app");
const User = require("../models/userModel");
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
    });
  }
};
exports.create = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
    });
  }
};
exports.login = async (req, res, next) => {
  try {
    const newUser = await User.find(req.body);
    if (newUser) {
      res.render("admin");
    }
    res.redirect("/admin");
  } catch (err) {
    res.status(400).json({
      status: "fail",
    });
  }
};
