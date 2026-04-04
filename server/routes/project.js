const express = require("express");
const app = express.Router();
const { createProject, getAllProject } = require("../controllers/projectCtrl");
const auth = require("../middleware/auth");

app.get("/project", auth, getAllProject);
app.post("/project/add", auth, createProject);

module.exports = app;
