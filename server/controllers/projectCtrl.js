const Project = require("../model/Project");

exports.getAllProject = async (req, res) => {
  try {
    const project = await Project.find();
    res.status(200).json({ success: true, project });
  } catch (error) {
    console.error("server error", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server get all project error" });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    if (!name || !description || !status) {
      return res.status(400).json({ message: "missing required fields." });
    }
    const project = await Project.create({ name, description, status });
    res.status(201).json({ success: true, message: "Added project", project });
  } catch (error) {
    console.error("server error", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server get all project error" });
  }
};
