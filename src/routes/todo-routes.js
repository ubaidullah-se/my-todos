const express = require("express");
const router = express.Router();
const {
  createTodo,
  updateTodo,
  deleteTodo,
  allTodos,
} = require("../controllers/todos-controller");

router.get("/", allTodos);
router.post("/create-todo", createTodo);
router.get("/update-todo", updateTodo);
router.get("/delete-todo", deleteTodo);

module.exports = router;
