const School = require("../models/schoolModel");
const fs = require("fs");

var repFindLike = function (obj) {
  Object.keys(obj).forEach(function (key) {
    obj[key] = new RegExp(`${obj[key]}`, "i");
  });
  return obj;
};

exports.create = async (req, res) => {
  const school = await new School({ ...req.body, images: req.file.filename });
  school.save((err) => {
    if (err) {
      res.json({ message: err.message, type: "danger" });
    } else {
      req.session.message = {
        type: "success",
        message: "Trường đã thêm thành công!",
      };
      res.redirect("/");
    }
  });
};
exports.findById = (req, res) => {
  School.findById(req.params.id, (err, school) => {
    if (err || !school) {
      res.redirect("/school");
    } else {
      res.render("show", {
        title: `${school.name}`,
        school: school,
      });
    }
  });
};
exports.add_school = (req, res) => {
  res.render("add", { title: "Thêm sinh viên" });
};
exports.search_school = (req, res) => {
  const newObj = repFindLike({ ...req.body });
  School.find(newObj).exec((err, schools) => {
    if (!schools.length) {
      res.render("search", {
        message: "Trường không tìm thấy",
        title: "Search School",
      });
    } else {
      res.render("search", {
        schools: schools,
        title: "Search School",
      });
    }
  });
};
exports.show_school = (req, res) => {
  let id = req.params.id;
  School.findById(id, (err, school) => {
    if (err || !school) {
      res.redirect("/school");
    } else {
      res.render("show", {
        title: "Edit School",
        school: school,
      });
    }
  });
};
exports.edit_school = (req, res) => {
  let id = req.params.id;
  School.findById(id, (err, school) => {
    if (err || !school) {
      res.redirect("/school");
    } else {
      res.render("edit", {
        title: "Edit School",
        school: school,
      });
    }
  });
};
exports.findAll = (req, res) => {
  School.find().exec((err, schools) => {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.render("index", {
        title: "School Page",
        schools: schools,
      });
    }
  });
};
exports.update = (req, res) => {
  let id = req.params.id;
  let new_image = "";
  if (req.file) {
    new_image = req.file.filename;
    try {
      fs.unlinkSync("../public/uploads" + req.body.old_filename);
    } catch (err) {
      console.log(err);
    }
  } else {
    new_image = req.body.old_filename;
  }
  School.findByIdAndUpdate(id, req.body, (err, result) => {
    if (err) {
      res.json({ message: err.message, type: "danger" });
    } else {
      req.session.message = {
        type: "success",
        message: "Sinh viên đã sửa đổi!",
      };
      res.redirect("/school");
    }
  });
};
exports.delete = (req, res) => {
  let id = req.params.id;
  School.findByIdAndRemove(id, (err, result) => {
    if (result.image != "") {
      try {
        fs.unlinkSync("../public/uploads/" + result.image);
      } catch (err) {
        console.log(err);
      }
    }
    if (err) {
      res.json({ message: err.message });
    } else {
      req.session.message = {
        type: "info",
        message: "Sinh viên đã xóa!",
      };
      res.redirect("/school");
    }
  });
};
