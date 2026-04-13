const Task = require("../model/Tasks");

exports.getAllTask = async (req, res) => {
  try {
  } catch (error) {}
};

exports.createTask = async (req, res) => {
  try {
    const tasks = new Task(req.body);
    const newTask = await tasks.save();
    res.status(201).json({ success: true, data: { task: newTask } });
  } catch (error) {
    console.error(error.message, "creating task");
    res
      .status(500)
      .json({ success: false, message: "Internal creating task error" });
  }
};
