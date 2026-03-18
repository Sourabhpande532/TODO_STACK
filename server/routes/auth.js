const express = require("express");
const app = express.Router();

const { signup, signin } = require("../controllers/authCtrl");

app.post("/signup", signup);
app.post("/signin", signin);

module.exports = app;
