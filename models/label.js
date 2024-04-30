//label.js

const mongoose = require("mongoose");

const labelSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
});

module.exports = mongoose.model("Label", labelSchema);
