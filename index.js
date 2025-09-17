const express = require("express");
const session = require("express-session");

//create object
const app = express();

// Custom middleware
function logger(req, res, next) {
  console.log(`logger middleware: ${req.method} ${req.url}`);
  next(); // move to next middleware or route
}

// Apply middleware globally
app.use(logger);

app.use(session({
  secret: "my-rai-session-sec",       // Change this to a strong secret
  resave: false,               // Don’t save session if unmodified
  saveUninitialized: true,     // Save new sessions
  cookie: { secure: false }    // true if using HTTPS
}));

// Route
app.get("/", (req, res) => {
  req.session.commonVar = "Hello, I am shared!";
  res.send("Hello from Home!");
});

app.get("/about", (req, res) => {
  res.send(`About Page. Session Value is ${req.session.commonVar}`);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
