1. Install session middleware
npm install express-session

2. Configure session in your app.js (or server.js)
const express = require("express");
const session = require("express-session");

const app = express();

app.use(session({
  secret: "mySecretKey",       // Change this to a strong secret
  resave: false,               // Don’t save session if unmodified
  saveUninitialized: true,     // Save new sessions
  cookie: { secure: false }    // true if using HTTPS
}));

3. Store a common variable in session
You can now assign values to req.session in one route and access them in others.
// Example: set a variable
app.get("/set", (req, res) => {
  req.session.commonVar = "Hello, I am shared!";
  res.send("Value stored in session");
});

// Example: get the variable
app.get("/get", (req, res) => {
  res.send(`The shared value is: ${req.session.commonVar}`);
});
4. Using across multiple pages

Any route (or page render) can now access req.session.commonVar:
app.get("/dashboard", (req, res) => {
  res.render("dashboard", { shared: req.session.commonVar });
});

In your EJS template:
<p>Shared value: <%= shared %></p>

-------------------------------------------------------------------
1) Per-user shared data (via session)

Use this when each user should have their own value available on all pages.
Setup
npm i express express-session

// app.js
const express = require("express");
const session = require("express-session");
const app = express();

app.set("view engine", "ejs"); // optional, if you render pages

app.use(session({
  secret: "change-this-to-a-long-random-string",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // set true behind HTTPS + proxy
}));

// (Optional) expose session to views
app.use((req, res, next) => {
  res.locals.sess = req.session;
  next();
});

// Set a per-user value
app.get("/set", (req, res) => {
  req.session.commonVar = req.query.v || "Hello from session!";
  res.send("Session value set.");
});

// Get it on any page/route
app.get("/get", (req, res) => {
  res.send(`Per-user value: ${req.session.commonVar ?? "(not set)"}`);
});

// Clear/destroy session
app.get("/logout", (req, res) => {
  req.session.destroy(() => res.send("Session destroyed."));
});

app.listen(3000, () => console.log("http://localhost:3000"));

In EJS (optional):
<p>Per-user shared value: <%= sess?.commonVar %></p>

