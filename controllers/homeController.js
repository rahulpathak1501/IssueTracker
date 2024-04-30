//homeController.js

const Project = require("../models/project");

exports.getHome = async (req, res) => {
  try {
    const projects = await Project.find().populate("author"); // Populate author details
    res.render("homepage", { projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching projects." });
  }
};
