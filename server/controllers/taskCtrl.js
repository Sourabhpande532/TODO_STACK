const Task = require("../model/Tasks");

exports.getAllTask = async (req, res) => {
  const { status, team } = req.query;
  let filter = {};
  try {
    if (status) {
      filter.status = status;
    }
    if (team) {
      filter.team = team;
    }
    let tasks = await Task.find(filter)
      .populate("project", "name")
      .populate("team", "name")
      .populate("owners", "name");
    res.json({ success: true, count: tasks.length, data: { tasks } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
