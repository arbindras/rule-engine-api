const NodeType = {
  OPERATOR: "operator",
  OPERAND: "operand",
  FUNCTION: "function",
};

// A simple Node class to represent AST nodes
class ASTNode {
  constructor(type, value = null, left = null, right = null) {
    this.type = type;
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

// Function to convert the tokens into an AST
function combineTokensIntoAST(tokens) {
  if (!tokens || tokens.length === 0) {
    throw new Error("No tokens to build AST");
  }

  let root = null;
  let currentOperatorNode = null;

  // Go through the tokens and build the AST
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.type === "operand") {
      const operandNode = new ASTNode("operand", token.value);

      // If there's no root yet, make this operand the root
      if (!root) {
        root = operandNode;
      } else if (currentOperatorNode) {
        // Attach this operand as the right child of the current operator node
        currentOperatorNode.right = operandNode;
        currentOperatorNode = null; // Reset
      }
    } else if (token.type === "operator") {
      const operatorNode = new ASTNode("operator", token.value);

      // If root exists, the operator becomes the new root
      if (root) {
        operatorNode.left = root;
      }
      root = operatorNode;
      currentOperatorNode = operatorNode; // Track the current operator node
    } else {
      throw new Error("Invalid AST node");
    }
  }

  if (!root) {
    throw new Error("Failed to build AST");
  }

  return root;
}

const functionRegistry = {};

function registerFunction(name, func) {
  functionRegistry[name] = func;
}

// Example: Registering a function
// registerFunction("isSenior", (age) => age > 60);
// registerFunction("hasHighIncome", (income) => income > 100000);

function someParserFunction(ruleString) {
  console.log("Parsing rule string:", ruleString);

  // Updated regex to handle both numbers and strings (e.g., age > 30 and department == 'Sales')
  const operandRegex = /(\w+)\s*(>|>=|<|<=|==)\s*([\'\"]?\w+[\'\"]?|\d+)/;
  const operatorRegex = /\s*(AND|OR)\s*/;

  const tokens = [];
  let currentPosition = 0;

  while (currentPosition < ruleString.length) {
    // Try to match operand (e.g., age > 30)
    const operandMatch = ruleString.slice(currentPosition).match(operandRegex);

    if (operandMatch) {
      console.log("Matched operand:", operandMatch[0]);

      // Push the operand as a token to the tokens array
      tokens.push({
        type: "operand",
        value: {
          field: operandMatch[1],
          operator: operandMatch[2],
          value: isNaN(operandMatch[3])
            ? operandMatch[3].replace(/['"]/g, "")
            : parseInt(operandMatch[3], 10),
        },
      });

      // Move currentPosition ahead by the length of the matched operand
      currentPosition += operandMatch[0].length;

      // Now we expect an operator (AND/OR)
      const operatorMatch = ruleString
        .slice(currentPosition)
        .match(operatorRegex);

      if (operatorMatch) {
        console.log("Matched operator:", operatorMatch[0]);

        // Push the operator as a token to the tokens array
        tokens.push({
          type: "operator",
          value: operatorMatch[1],
        });

        // Move currentPosition ahead by the length of the matched operator
        currentPosition += operatorMatch[0].length;
      }
    } else {
      console.error("Failed to parse rule at position:", currentPosition);
      throw new Error("Failed to parse rule: invalid format");
    }
  }

  return combineTokensIntoAST(tokens);
}

function parseRule(ruleString) {
  try {
    const ast = someParserFunction(ruleString);

    if (!ast || typeof ast !== "object") {
      throw new Error("Parsed AST is invalid or empty");
    }

    return ast;
  } catch (error) {
    console.error("Rule Parsing Error: ", error.message);
    throw new Error("Failed to parse rule string: " + error.message);
  }
}

function evaluateFunction(node, data) {
  if (!node) {
    throw new Error("Invalid AST node");
  }

  switch (node.type) {
    case NodeType.OPERATOR:
      const leftResult = evaluateFunction(node.left, data);
      const rightResult = evaluateFunction(node.right, data);

      if (node.value === "AND") {
        return leftResult && rightResult;
      } else if (node.value === "OR") {
        return leftResult || rightResult;
      } else {
        throw new Error(`Unknown operator: ${node.value}`);
      }

    case NodeType.OPERAND:
      const { field, operator, value } = node.value;
      // Check if the field exists in the data
      if (!(field in data)) {
        throw new Error(`Missing required field: ${field}`);
      }
      const fieldValue = data[field];

      switch (operator) {
        case ">":
          return fieldValue > value;
        case ">=":
          return fieldValue >= value;
        case "<":
          return fieldValue < value;
        case "<=":
          return fieldValue <= value;
        case "==":
          return fieldValue == value; // Double equals to handle both number and string comparison
        default:
          throw new Error(`Unknown comparison operator: ${operator}`);
      }

    case NodeType.FUNCTION:
      const functionName = node.value.functionName;
      const args = node.value.args.map((arg) => data[arg] || arg); // Handle function arguments with data values

      if (typeof customFunctions[functionName] === "function") {
        return customFunctions[functionName](...args);
      } else {
        throw new Error(`Unknown function: ${functionName}`);
      }

    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
}

module.exports = {
  parseRule,
  evaluateFunction,
  registerFunction,
};
