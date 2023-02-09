const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  birthPlace: String,
  birthTime: String,
  deathPlace: String,
  deathTime: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    console.log(returnedObject);
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
