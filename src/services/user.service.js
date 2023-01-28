const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const generate_jwt = (user_id) => {
  const token = jwt.sign({ id: user_id }, JWT_SECRET);
  return token;
};

const createUser = async (req, res) => {
  let { full_name, email, password } = req.body;
  try {
    let user = await User.create({
      full_name: full_name,
      email: email,
      password: password,
    });

    let token = generate_jwt(user.id);
    res.cookie("jwt-token", token);

    res.redirect("/todos");
  } catch (e) {
    console.error(e.message);
    res.redirect("/sign-in");
  }
};

const userCreationForm = (_, res) => {
  res.render("user-creation-form");
};

const loginForm = (_, res) => {
  res.render("login-form");
};

const loginUser = async (req, res) => {
  let { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) res.redirect("/login");

    let isMatch = await user.comparePassword(password);
    if (!isMatch) res.redirect("/login");
    let token = generate_jwt(user.id);
    res.cookie("jwt-token", token);

    return res.redirect("/todos");
  } catch (e) {
    console.log(e);
  }
  res.redirect("/login");
};

const logoutUser = (req, res) => {
  res.cookie("jwt-token", "");
  res.redirect("/login/");
};

module.exports = {
  createUser,
  userCreationForm,
  loginForm,
  loginUser,
  logoutUser,
};
