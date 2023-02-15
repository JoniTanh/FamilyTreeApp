const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthPlace: String,
  birthTime: String,
  deathPlace: String,
  deathTime: String,
  deathReason: String,
  godparents: String,
  burialPlot: String,
  burialTime: String,
  lifeStory: String,
  sources: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

mongoose.set("strictQuery", true);

module.exports = mongoose.model("Person", personSchema);
