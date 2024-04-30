const mongoose = require("mongoose");
const User = require("../models/user");
const Project = require("../models/project");
const Issue = require("../models/issue");

async function initializeDatabase() {
  await mongoose.connect("mongodb://localhost:27017/bug_tracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await mongoose.connection.dropCollection("users");

  // Insert dummy data for each collection
  const user = new User({
    username: "JohnDoe",
    email: "john@example.com",
    password: "hashedPassword",
  });
  await user.save();

  await mongoose.connection.dropCollection("projects");

  const project = new Project({
    name: "Sample Project",
    description: "A sample project",
    author: user._id,
  });
  await project.save();

  const issue = new Issue({
    title: "Sample Issue",
    description: "A sample issue",
    labels: ["bug"],
    priority: "high",
    severity: "high",
    projectId: project._id,
    author: user._id,
  });
  await issue.save();

  console.log("Dummy data inserted successfully.");

  mongoose.connection.close();
}

initializeDatabase();
