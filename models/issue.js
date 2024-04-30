//issue.js

const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  labels: [{ type: String }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["open", "closed", "in progress"],
    default: "open",
  },
  priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
  severity: { type: String, enum: ["low", "medium", "high"], default: "low" },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Issue", issueSchema);
