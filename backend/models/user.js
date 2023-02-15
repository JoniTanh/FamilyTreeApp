const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    required: true,
  },
  name: String,
  passwordHash: {
    type: String,
    required: true,
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
