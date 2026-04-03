const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  status: { type: String, default:'Todo' },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("AsanaProject", ProjectSchema);
