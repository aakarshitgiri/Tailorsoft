const mongoose = require("mongoose");

//user Schema
const profileSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 3,
  },
  lastname: {
    type: String,
    required: true,
    minlength: 3,
  },
  city: {
    type: String,
    required: true,
    minlength: 3,
  },
  age: {
    type: String,
    minlength: 3,
  },
  about: {
    type: String,
    minlength: 3,
  },
  // profilePic: String,
});

// user model
module.exports = mongoose.model("Profiles", profileSchema);
