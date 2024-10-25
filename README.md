# Rule Engine API

## Overview

This project implements a simple rule engine in Node.js that can parse and evaluate complex rule strings into Abstract Syntax Trees (ASTs). It supports logical operations like `AND`, `OR` and can handle custom rule definitions.

## Features

- Parsing rule strings into tokens
- Generating AST from tokens
- Handling logical operations (`AND`, `OR`)
- Support for custom user-defined functions in rules (optional)
- RESTful API to create and evaluate rules

## Technologies Used

- Node.js
- Express.js (for API routing)
- Docker (for containerizing the app)
- Mocha & Chai (for testing)

## Directory Structure

```bash
├── node_modules
├── src
│   ├── ast.js         # AST creation logic
│   ├── parser.js      # Rule parsing and token generation
│   ├── server.js      # Main application logic, API setup
├── test
│   └── parser.test.js # Test cases for rule parser
├── Dockerfile         # Docker setup
├── README.md          # Documentation
├── package.json       # Dependencies and scripts
└── package-lock.json  # Version-lock file
