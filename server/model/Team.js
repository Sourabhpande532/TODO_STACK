const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    member: [{ type: mongoose.Schema.Types.ObjectId, ref: "AsanaUser" }],
  },
  { timestamps: true },
);
module.exports = mongoose.model("AsanaTeam", teamSchema);
