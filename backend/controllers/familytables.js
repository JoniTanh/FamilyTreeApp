const familytableRouter = require("express").Router();
const Familytable = require("../models/familytable");
const Person = require("../models/person");

familytableRouter.get("/", async (req, res) => {
  const familytables = await Familytable.find({})
    .lean()
    .populate("person mother father spouse children spouseMother spouseFather");
  res.json(familytables);
});

familytableRouter.get("/:id", async (req, res) => {
  const familytable = await Familytable.findById(req.params.id)
    .lean()
    .populate("person mother father spouse children spouseMother spouseFather");
  res.json(familytable);
});

familytableRouter.post("/", async (req, res) => {
  const {
    personId,
    motherId,
    fatherId,
    spouseId,
    childrenIds,
    spouseMotherId,
    spouseFatherId,
    lifeStory,
    sources,
  } = req.body;

  const person = await Person.findById(personId);
  if (!person) {
    return res.status(400).json({ error: "Invalid person ID" });
  }

  let mother, father, spouse, children, spouseMother, spouseFather;

  mother = await Person.findById(motherId);
  father = await Person.findById(fatherId);
  spouse = await Person.findById(spouseId);
  children = await Person.find({ _id: { $in: childrenIds } });
  spouseMother = await Person.findById(spouseMotherId);
  spouseFather = await Person.findById(spouseFatherId);

  const familytable = new Familytable({
    person: person._id,
    mother: mother ? mother._id : undefined,
    father: father ? father._id : undefined,
    spouse: spouse ? spouse._id : undefined,
    children: children ? children.map((child) => child._id) : [],
    spouseMother: spouseMother ? spouseMother._id : undefined,
    spouseFather: spouseFather ? spouseFather._id : undefined,
    lifeStory,
    sources,
  });

  const savedFamilytable = await familytable.save();
  res.json(savedFamilytable);
});

familytableRouter.delete("/:id", async (req, res) => {
  try {
    const deletedFamilytable = await Familytable.findByIdAndDelete(
      req.params.id
    );
    if (!deletedFamilytable) {
      return res.status(404).json({ error: "Family table not found" });
    }
    res.json(deletedFamilytable);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

familytableRouter.put("/:id", async (req, res) => {
  try {
    const {
      personId,
      motherId,
      fatherId,
      spouseId,
      childrenIds,
      spouseMotherId,
      spouseFatherId,
      lifeStory,
      sources,
    } = req.body;

    const person = await Person.findById(personId);
    if (!person) {
      return res.status(400).json({ error: "Invalid person ID" });
    }

    let mother, father, spouse, children, spouseMother, spouseFather;

    mother = await Person.findById(motherId);
    father = await Person.findById(fatherId);
    spouse = await Person.findById(spouseId);
    children = await Person.find({ _id: { $in: childrenIds } });
    spouseMother = await Person.findById(spouseMotherId);
    spouseFather = await Person.findById(spouseFatherId);

    const updatedFamilytable = {
      person: person._id,
      mother: mother ? mother._id : undefined,
      father: father ? father._id : undefined,
      spouse: spouse ? spouse._id : undefined,
      children: children ? children.map((child) => child._id) : [],
      spouseMother: spouseMother ? spouseMother._id : undefined,
      spouseFather: spouseFather ? spouseFather._id : undefined,
      lifeStory,
      sources,
    };

    const updated = await Familytable.findByIdAndUpdate(
      req.params.id,
      updatedFamilytable,
      { new: true }
    )
      .lean()
      .populate(
        "person mother father spouse children spouseMother spouseFather"
      );

    if (!updated) {
      return res.status(404).json({ error: "Family table not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = familytableRouter;
