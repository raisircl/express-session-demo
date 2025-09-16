In Express.js, middleware are functions that sit between the request and the response.
They can:

Run code.

Modify the request (req) or response (res) objects.

End the request-response cycle.

Or pass control to the next middleware with next().
Basics Structure
//syntax
function myMiddleware(req, res, next) {
  console.log("Middleware executed!");
  next(); // pass control to next middleware/route
}

Short Example
const express = require("express");
const app = express();

// Custom middleware
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
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

Key Points

Middleware is executed in order of declaration.

If you don’t call next(), the request will hang.


