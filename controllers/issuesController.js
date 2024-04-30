//issueController.js

const Issue = require("../models/issue");

exports.renderNewIssueForm = (req, res) => {
  // Render the form for creating a new issue within a project
  res.render("issues/newIssues", { projectId: req.params.projectId });
};

exports.getAllIssues = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    const issues = await Issue.find({ project: projectId }).populate("author");

    if (!issues) {
      return res
        .status(404)
        .json({ message: "No issues found for this project." });
    }

    res.status(200).json({ issues });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching issues." });
  }
};

exports.getIssueDetails = async (req, res) => {
  try {
    const issueId = req.params.issueId;

    if (issueId === "new") {
      // Render the form for creating a new issue within a project
      return res.render("issues/newIssues", {
        projectId: req.params.projectId,
      });
    }

    const issue = await Issue.findById(issueId).populate("author");

    if (!issue) {
      return res.status(404).json({ message: "Issue not found." });
    }

    res.status(200).json({ issue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching issue details." });
  }
};

exports.createIssue = async (req, res) => {
  const projectId = req.params.projectId;
  const { title, description, labels, priority, severity } = req.body;

  // Validate input (use a validation library for better security)
  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Please fill in all required fields." });
  }

  try {
    const newIssue = new Issue({
      title,
      description,
      labels,
      priority,
      severity,
      projectId,
    });

    await newIssue.save();
    res.redirect(`/projects/${projectId}`); // Redirect to project page
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating issue." });
  }
};
