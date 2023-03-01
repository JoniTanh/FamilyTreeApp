const notesRouter = require("express").Router();
const Note = require("../models/notes");

notesRouter.get("/", async (req, res) => {
  const notes = await Note.find({});
  res.json(notes);
});

notesRouter.post("/", async (req, res) => {
  const body = req.body;

  const note = new Note({
    text: body.text,
  });

  const savedNote = await note.save();
  res.status(201).json(savedNote);
});

notesRouter.delete("/:id", async (req, res) => {
  await Note.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

module.exports = notesRouter;
