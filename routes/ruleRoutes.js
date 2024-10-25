const express = require("express");
const {
  createRule,
  evaluateRule,
  modifyRule,
} = require("../controllers/ruleController");
const { parseRule, evaluateFunction } = require("../controllers/ruleEngine");

const router = express.Router();

// Route to create a rule
router.post("/create", createRule);

// Route to evaluate a rule
router.post("/evaluate", evaluateRule);

// Route to modify an existing rule
router.post("/modify", modifyRule);

// POST to create and evaluate rule
router.post("/evalfunction", (req, res) => {
  const { ruleString, data } = req.body;

  // Validate that ruleString and data are present
  if (!ruleString) {
    return res
      .status(400)
      .json({ error: "Missing ruleString in the request body" });
  }
  if (!data || typeof data !== "object") {
    return res
      .status(400)
      .json({ error: "Invalid or missing data in the request body" });
  }

  try {
    // Parse the rule string into an AST
    const ast = parseRule(ruleString);

    // Evaluate the rule with the provided data
    const result = evaluateFunction(ast, data);

    return res.json({ result });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
