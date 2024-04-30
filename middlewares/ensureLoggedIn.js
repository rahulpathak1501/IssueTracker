//ensureLoggedIn.js

const express = require("express");

const ensureLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // Continue to the next middleware or route handler
  } else {
    // Redirect or send an error response if the user is not logged in
    console.log("Error in logged in");
    res.status(401).json({ error: "Unauthorized" });
  }
};
module.exports = ensureLoggedIn;
