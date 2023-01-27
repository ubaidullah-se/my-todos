const express = require("express");
const router = express.Router();
const {
  createTodo,
  allTodos,
  todoForm,
} = require("../controllers/todos-controller");

router.get("/", allTodos);
router.get("/create-todo", todoForm);
router.post("/create-todo", createTodo);

module.exports = router;
