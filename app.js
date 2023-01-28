const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_CONNECTION_STRING = "mongodb://127.0.0.1/myTodo";

const controllers = require("./src/controllers");
const middlewares = require("./src/middlewares");

// Using Cors
app.use(cors());

// Setting Cookie Parser to read and set cookies
app.use(cookieParser());
// suthentication middleware
app.use(middlewares.auth_middleware)
// Using body-parser to read parameters from request body
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Setting Template Engine to EJS
const Templates_DIR = path.join(__dirname, "src/views");
app.set("views", Templates_DIR);
app.set("view engine", "ejs");
// Using Morgan Logger
app.use(middlewares.morganLogger.production);
app.use(middlewares.morganLogger.dev);

// Static and Media Paths
app.use("/static", express.static(__dirname + "/static"));
app.use("/media", express.static(__dirname + "/media"));

// All Urls
app.use("/", controllers.user_controller);
app.use("/todos", controllers.todo_controller);

// Connecting Databse (MongoDB) And Startting app
mongoose.set("strictQuery", false);
const main = async () => {
  await mongoose.connect(DB_CONNECTION_STRING);
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

main();
