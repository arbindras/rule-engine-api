// Predefined catalog of valid attributes
const attributeCatalog = ["age", "department", "salary", "experience"];

// Utility to create an AST node
function createNode(type, left = null, right = null, value = null) {
  return { type, left, right, value };
}

// Utility to validate attributes
function validateAttributes(attribute) {
  if (!attributeCatalog.includes(attribute)) {
    throw new Error(
      `Invalid attribute: ${attribute}. Allowed attributes are: ${attributeCatalog.join(
        ", "
      )}`
    );
  }
}

// Parse rule string into AST (mock implementation)
function parseRule(ruleString) {
  // Simple rule parsing for demonstration
  if (!ruleString.includes(">") && !ruleString.includes("==")) {
    throw new Error(
      'Invalid rule: Rule must contain valid operators like ">" or "=="'
    );
  }

  // Example: (age > 30 AND department == 'Sales')
  validateAttributes("age");
  validateAttributes("department");

  return createNode(
    "AND",
    createNode(">", null, null, { field: "age", value: 30 }),
    createNode("==", null, null, { field: "department", value: "Sales" })
  );
}

// Controller to create a rule with error handling
exports.createRule = (req, res) => {
  const { ruleString } = req.body;

  try {
    if (!ruleString) {
      return res.status(400).json({ error: "Rule string is required" });
    }

    // Parse the rule into an AST
    const ruleAST = parseRule(ruleString);

    // Mock saving rule to the database
    res
      .status(201)
      .json({ message: "Rule created successfully", ast: ruleAST });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
// Controller to evaluate a rule with attribute validation
exports.evaluateRule = (req, res) => {
  const { ruleAST, data } = req.body;

  try {
    if (!ruleAST || !data) {
      return res.status(400).json({ error: "Rule AST and data are required" });
    }

    // Check that all data attributes are valid
    for (const key in data) {
      if (!attributeCatalog.includes(key)) {
        throw new Error(`Invalid data attribute: ${key}`);
      }
    }

    // Evaluate the rule (simplified example)
    function evaluateNode(node, data) {
      if (node.type === "AND") {
        return evaluateNode(node.left, data) && evaluateNode(node.right, data);
      } else if (node.type === "OR") {
        return evaluateNode(node.left, data) || evaluateNode(node.right, data);
      } else if (node.type === ">") {
        return data[node.value.field] > node.value.value;
      } else if (node.type === "==") {
        return data[node.value.field] === node.value.value;
      }
      return false;
    }

    const result = evaluateNode(ruleAST, data);

    res.json({ result });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
// Function to modify a rule
exports.modifyRule = (req, res) => {
  const { ruleAST, modification } = req.body;

  try {
    if (!ruleAST || !modification) {
      return res
        .status(400)
        .json({ error: "Rule AST and modification data are required" });
    }

    // Example modification logic (changing operators/values)
    function modifyNode(node, modification) {
      if (node.type === modification.targetNodeType) {
        if (modification.newType) {
          node.type = modification.newType;
        }
        if (modification.newValue) {
          node.value = modification.newValue;
        }
      }

      if (node.left) modifyNode(node.left, modification);
      if (node.right) modifyNode(node.right, modification);
    }

    modifyNode(ruleAST, modification);

    res
      .status(200)
      .json({ message: "Rule modified successfully", modifiedAST: ruleAST });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
