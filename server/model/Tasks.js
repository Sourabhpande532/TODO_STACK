const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "AsanaProject" },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "AsanaTeam" },
  owners: [
    { type: mongoose.Schema.Types.ObjectId, ref: "AsanaUser", required: true },
  ],
  tags: [{ type: String }], //arry of  tags
  timeToComplete: { type: Number, required: true },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Completed", "Blocked"],
    default: "To Do",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// auto update the 'updatedAt' fields whenever the ddo cument is updated
taskSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("AsanaTask", taskSchema);
