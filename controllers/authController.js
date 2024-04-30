//authController.js

const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.register = async (req, res) => {
  // Validate user input using express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user." });
  }
};

exports.login = passport.authenticate("local", {
  failureRedirect: "/login",
  successRedirect: "/", // Redirect to protected route on successful login
});

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};
