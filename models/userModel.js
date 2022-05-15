const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true,
    validate: [validator.isEmail, "Vui lòng nhập email."],
  },
  password: {
    type: String,
    require: true,
    trim: true,
    minlength: 6,
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (val) {
        return val === this.password;
      },
    },
  },
});

module.exports = mongoose.model("User", userSchema);
