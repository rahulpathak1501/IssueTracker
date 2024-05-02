//projectController.js
const mongoose = require("mongoose");
const Project = require("../models/project");
const Issue = require("../models/issue");
const Label = require("../models/label");

exports.createProject = async (req, res) => {
  // if (!req.isAuthenticated()) {
  //   return res
  //     .status(401)
  //     .json({ message: "Unauthorized - User not logged in." });
  // }

  const { name, description } = req.body;

  // Validate input (use a validation library for better security)
  if (!name || !description) {
    return res.status(400).json({ message: "Please fill in all fields." });
  }

  try {
    // If projectId is present in the request, update the existing project
    if (req.params.projectId) {
      const projectId = req.params.projectId;

      // Validate if projectId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(projectId)) {
        // Handle the case where projectId is not a valid ObjectId
        return res.status(404).json({ message: "Invalid project ID." });
      }

      const existingProject = await Project.findById(projectId);

      // Validate if the existing project is found
      if (!existingProject) {
        return res.status(404).json({ message: "Project not found." });
      }

      // Update existing project details
      existingProject.name = name;
      existingProject.description = description;

      await existingProject.save();
      res.redirect(`/projects/${projectId}`); // Redirect to project details page
    } else {
      // If projectId is not present, create a new project
      const newProject = new Project({
        name,
        description,
        // author: req.user.id,
      });

      await newProject.save();
      res.redirect("/projects"); // Redirect to projects page
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating/updating project." });
  }
};

exports.createProjectForm = (req, res) => {
  res.render("newProjectForm");
};

exports.getAllProjects = async (req, res) => {
  try {
    // Fetch all projects from the database
    const projects = await Project.find();

    // Send the projects as a JSON response
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getProjectDetails = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    // Validate if projectId is a valid ObjectId
    if (projectId !== "new" && !mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(404).json({ message: "Invalid project ID." });
    }
    console.log(req.query);
    const { labels, author, search } = req.query;

    if (projectId === "new") {
      // Render the form for creating a new project
      const allLabels = await Label.find();
      return res.render("newProjectForm", { allLabels });
    }

    let query = { projectId };

    // Fetch allLabels from your database or another data source
    const allLabels = await Label.find(); // Adjust this based on your data model

    //console.log(allLabels);

    if (labels) {
      query.labels = { $in: labels.split(",") }; // Convert comma-separated string to array
    }

    // Filter by author (assuming `author` field in Issue model)
    if (author) {
      query.author = author;
    }

    // Search by title or description using full-text search
    if (search) {
      query.$text = { $search: search }; // Utilize $text index in MongoDB or full-text search in PostgreSQL
    }

    const project = await Project.findById(projectId);

    // Validate if project is found
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    const issues = await Issue.find(query).populate("author");
    res.render("projectDetails", { project, issues, allLabels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching issues." });
  }
};
