# Rule Engine API

## Overview

This project implements a simple rule engine in Node.js that can parse and evaluate complex rule strings and user defined functions into Abstract Syntax Trees (ASTs). It supports logical operations like `AND`, `OR` and can handle custom rule definitions.

## Features

- Parsing rule strings into tokens
- Generating AST from tokens
- Handling logical operations (`AND`, `OR`)
- Support for custom user-defined functions in rules (optional)
- RESTful API to create and evaluate rules
- Error handling for invalid rule strings or data formats (e.g., missing operators,invalid comparisons).
- Validations for attributes to be part of a catalog.
- Modification of existing rules using additional functionalities within rules/modify. This involve changing operators, operand values, or adding/removing sub-expressions within the AST.
- Extended the system to support user-defined functions within the rule language for advanced conditions.

## Technologies Used

- Node.js
- Express.js (for API routing)
- Docker (for containerizing the app)

## Directory Structure

```
rule-engine-node/
├── app.js                    # Main entry point of the application
├── routes/
│   └── ruleRoutes.js         # API route definitions for rule operations
└── controllers/
    └── ruleController.js     # Core logic for rule parsing, combination, and evaluation
    └── ruleEngine.js         # Core logic for user defined function parsing, combination, and evaluation
```
## Setup Instructions

### Prerequisites
Make sure you have Node.js installed.

1. **Clone the repository**:
   git clone [https://github.com/arbindras/rule-engine-api.git](https://github.com/arbindras/rule-engine-api.git)
   cd rule-engine-api
2. **Install dependencies**:
      `npm install`
3. **Run the application**:
      `npm start`
4. Access the API: Open your browser or Postman and navigate to http://localhost:3000.

## API Endpoints
  - POST /api/rules/create: Creates a rule from a rule string.
  - POST /api/rules/evaluate: Evaluates a rule against provided data.
  - POST /api/rules/modify: Modify a rule.
  - POST /api/rules/evalfunction: Evaluates a rule against user defined function..
## Images of Testing on POSTMAN
1. Create a Rule    ![Screenshot 2024-10-26 152049](https://github.com/user-attachments/assets/d281fa05-5276-4330-83e9-8e7890f5dc10)

2. Evaluate a Rule    ![Screenshot 2024-10-26 152234](https://github.com/user-attachments/assets/0c482505-5f4e-4300-a652-f999fdde694e)

3. Modify Rule    ![Screenshot 2024-10-26 152437](https://github.com/user-attachments/assets/5f5d342e-8856-491d-a9d8-9bad8e2b935a)

4. Error Handling    ![Screenshot 2024-10-26 152541](https://github.com/user-attachments/assets/9a75446b-e6ef-4101-b9c5-20baae26d65b)

5. Evaluating the user defined function    ![Screenshot 2024-10-26 153835](https://github.com/user-attachments/assets/490ceed7-5e57-4ea5-a8da-c039078736ee)
