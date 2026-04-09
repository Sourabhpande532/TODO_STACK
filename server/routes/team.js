const express = require("express");
const app = express.Router();
const { createTeam, getAllTeam } = require("../controllers/teamCtrl");
const auth = require("../middleware/auth");
app.post("/team/add", auth, createTeam);
app.get("/team", auth, getAllTeam);
module.exports = app;
