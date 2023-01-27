const Todo = require("../models/Todo");

const createTodo = async (req, res) => {
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

const allTodos = async (req, res) => {
  context = {};
  try {
    context.todos = await Todo.find({});
  } catch (e) {
    console.error(e.message);
  }
  res.render("todos", context);
};

const updateTodo = async (req, res) => {
  try {
    let todo = await Todo.findOne({id: req.body.todo_id});
    console.log(todo)
    todo.completed = !todo.completed;
    todo.save();
  } catch (e) {
    console.error(e.message);
  }
  res.redirect("/todos");
};

const deleteTodo = async (req, res) => {
  try {
    await Todo.deleteOne(req.body.todo_id);
  } catch (e) {
    console.error(e.message);
  }
  res.redirect("/todos");
};

module.exports = {
  createTodo,
  allTodos,
  updateTodo,
  deleteTodo,
};
