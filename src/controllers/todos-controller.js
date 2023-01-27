const Todo = require("../models/Todo");

const createTodo = async (req, res) => {
  try {
    await Todo.create({
      title: "Create a website",
      description: "lorem ipsum dollar sit",
    });
  } catch (e) {
    console.error(e.message);
  }
  res.render("index");
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
};
