const express = require("express");
const app = express.Router();
const {createTeam,getAllTeam} = require("../controllers/teamCtrl")

app.post('/',createTeam)
app.post('/',getAllTeam)
module.exports = app;