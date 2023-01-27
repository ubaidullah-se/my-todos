const Todo = require("../models/Todo");

const createTodo = async (req, res) => {
  console.log(req.body);
  try {
    await Todo.create({
      title: req.body.title,
      description: req.body.description,
    });
  } catch (e) {
    console.error(e.message);
  }
  res.redirect("/todos");
};

const todoForm = (_, res) => {
  res.render("create-todo");
};

const allTodos = async (req, res) => {
  context = {};
  try {
    context.todos = await Todo.find({});
  } catch (e) {
    console.error(e.message);
  }
  res.render("all-todos", context);
};

module.exports = {
  createTodo,
  allTodos,
  todoForm,
};
