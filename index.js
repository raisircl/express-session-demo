const express = require("express");

//create object
const app = express();

// Custom middleware
function logger(req, res, next) {
  console.log(`logger middleware: ${req.method} ${req.url}`);
  next(); // move to next middleware or route
}

// Apply middleware globally
app.use(logger);

// Route
app.get("/", (req, res) => {
  res.send("Hello from Home!");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
