//routes/user.js

// const router = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");

const express = require("express");
const router = express.Router();

// Registration route
router.post("/register", async (req, res) => {
  // Validate user input
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { username, email, password } = req.body;

  try {
    const user = new User({ username, email, password });
    await user.save();
    res.json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user." });
  }
});

// Login route
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

// Logout route
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
