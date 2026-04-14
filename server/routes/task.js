const express = require("express");
const app = express.Router();
const { createTask, getAllTask } = require("../controllers/taskCtrl");
const auth = require("../middleware/auth");
app.get("/filter/task",auth,getAllTask)
app.post("/add/task", auth, createTask);
module.exports = app;
