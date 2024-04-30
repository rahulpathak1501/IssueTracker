//routes/index.js

const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const projectsController = require("../controllers/projectsController");
const issuesController = require("../controllers/issuesController");
const authController = require("../controllers/authController");
const ensureLoggedIn = require("../middlewares/ensureLoggedIn");

// Home page
router.get("/", homeController.getHome);

// Projects routes
router.get("/projects", projectsController.getAllProjects);
router.get("/projects/:projectId", projectsController.getProjectDetails);
// router.post("/projects/new", projectsController.createProject); // Protected route
router.post("/projects", projectsController.createProject);
router.get("/projects/new", projectsController.createProjectForm);

// Issues routes
router.get("/projects/:projectId/issues", issuesController.getAllIssues);
router.get(
  "/projects/:projectId/issues/:issueId",
  issuesController.getIssueDetails
);
router.post("/projects/:projectId/issues", issuesController.createIssue); // Protected route
router.get(
  "/projects/:projectId/issues/new",
  issuesController.renderNewIssueForm
);

// Authentication routes
router.post("/register", authController.register);
router.post("/login", authController.login); // Redirect to protected route
router.get("/logout", authController.logout);

// Define protected routes middleware
// const ensureLoggedIn = require("../middlewares/ensureLoggedIn");

// Apply middleware to protect routes
// router.post("/projects", ensureLoggedIn); // Protect project creation
router.post("/projects", projectsController.createProject);
router.post("/projects/:projectId/issues", ensureLoggedIn); // Protect issue creation

module.exports = router;
