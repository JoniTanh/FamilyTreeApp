const mongoose = require("mongoose");

const familytableSchema = new mongoose.Schema({
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },
  mother: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },
  father: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },
  spouse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
    },
  ],
  spouseMother: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },
  spouseFather: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },
  lifeStory: String,
  sources: String,
});

familytableSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

mongoose.set("strictQuery", true);

module.exports = mongoose.model("Familytable", familytableSchema);
