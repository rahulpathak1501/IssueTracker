//project.js

const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  issues: [{ type: mongoose.Schema.Types.ObjectId, ref: "Issue" }],
});

module.exports = mongoose.model("Project", projectSchema);
