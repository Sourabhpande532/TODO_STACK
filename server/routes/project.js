const express = require("express");
const app = express.Router();
const { createProject, getAllProject } = require("../controllers/projectCtrl");

app.get("/project", getAllProject);
app.post("/project/add", createProject);

module.exports = app;
