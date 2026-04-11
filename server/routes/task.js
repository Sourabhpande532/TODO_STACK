const express = require("express");
const app = express.Router();
const {createTask,getAllTask} = require("../controllers/taskCtrl")
module.exports = app;
