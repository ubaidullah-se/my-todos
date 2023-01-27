const express = require("express");
const router = express.Router();
const { createTodo, allTodos } = require("../controllers/todos-controller");

router.get("/create-todo", createTodo);
router.get("/", allTodos);

module.exports = router;
