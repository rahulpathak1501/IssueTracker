//app.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("./models/user"); // Make sure to import your User model
const routes = require("./routes/index"); // Import your routes
// const expressValidator = require("express-validator"); // Import express-validator

const app = express();
const PORT = 3123;

// Connect to MongoDB (make sure your MongoDB server is running)
mongoose.connect("mongodb://localhost:27017/bug_tracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// // Express-validator middleware
// app.use(expressValidator());

// Passport configuration
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user)
          return done(null, false, { message: "Incorrect email or password." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return done(null, false, { message: "Incorrect email or password." });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

app.use(
  expressSession({
    secret: "abcd123@",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({ message: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
