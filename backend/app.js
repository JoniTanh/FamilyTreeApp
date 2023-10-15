const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const peopleRouter = require("./controllers/people");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const notesRouter = require("./controllers/notes");
const familytableRouter = require("./controllers/familytables");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const { authRequired } = require("./utils/authRequired");
const path = require("path");

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(express.static("build"));

app.use("/api/login", loginRouter);
app.use("/api/people", authRequired, peopleRouter);
app.use("/api/users", authRequired, usersRouter);
app.use("/api/familytables", authRequired, familytableRouter);
app.use("/api/notes", authRequired, notesRouter);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
