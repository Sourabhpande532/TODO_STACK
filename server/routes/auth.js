const express = require("express");
const app = express.Router();

const { signup, signin, getAllUser } = require("../controllers/authCtrl");

app.post("/signup", signup);
app.post("/signin", signin);
app.get("/users",getAllUser)

module.exports = app;
