const express = require("express");
const router = express.Router();
const { userLogined } = require("../utils/user.util");

const {
  createTodo,
  updateTodo,
  deleteTodo,
  allTodos,
} = require("../controllers/todos.controller");

router.get("/", userLogined, allTodos);
router.post("/create-todo", userLogined, createTodo);
router.get("/update-todo", userLogined, updateTodo);
router.get("/delete-todo", userLogined, deleteTodo);

module.exports = router;
