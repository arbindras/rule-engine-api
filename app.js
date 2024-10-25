const express = require("express");
const bodyParser = require("body-parser");
const ruleRoutes = require("./routes/ruleRoutes");

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use rule routes
app.use("/api/rules", ruleRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Rule Engine API!");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
