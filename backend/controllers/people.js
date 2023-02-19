const peopleRouter = require("express").Router();
const Person = require("../models/person");

peopleRouter.get("/", async (req, res) => {
  const people = await Person.find({}).lean();
  res.json(people);
});

peopleRouter.get("/:id", async (req, res) => {
  const person = await Person.findById(req.params.id).lean();
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

peopleRouter.post("/", async (req, res) => {
  const body = req.body;

  const person = new Person({
    nickname: body.nickname,
    firstNames: body.firstNames,
    lastName: body.lastName,
    family: body.family,
    birthPlace: body.birthPlace,
    birthTime: body.birthTime,
    deathPlace: body.deathPlace,
    deathTime: body.deathTime,
    deathReason: body.deathReason,
    godparents: body.godparents,
    baptismDay: body.baptismDay,
    burialPlot: body.burialPlot,
    burialTime: body.burialTime,
    lifeStory: body.lifeStory,
    sources: body.sources,
  });

  const savedPerson = await person.save();
  res.status(201).json(savedPerson);
});

peopleRouter.delete("/:id", async (req, res) => {
  console.log(req.params);
  await Person.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

// app.put 3C/4B end /:id

module.exports = peopleRouter;
