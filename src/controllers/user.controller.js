const express = require("express");
const router = express.Router();

const {
  createUser,
  userCreationForm,
  loginForm,
  loginUser,
  logoutUser,
} = require("../services/user.service");

router.get("/sign-in", userCreationForm);
router.post("/sign-in", createUser);
router.get("/login", loginForm);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

module.exports = router;
