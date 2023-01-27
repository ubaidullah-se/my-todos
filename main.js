const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const DB_CONNECTION_STRING = "mongodb://127.0.0.1/myTodo";

const routes = require("./src/routes");
const middlewares = require("./src/middlewares");

// Using Cors
app.use(cors());

// Using body-parser
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Setting Template Engine to EJS
const Templates_DIR = path.join(__dirname, "src/views");
app.set("views", Templates_DIR);
app.set("view engine", "ejs");
// Using Morgan Logger
app.use(middlewares.morganLogger.production);
app.use(middlewares.morganLogger.dev);

// All Urls
app.use("/todos", routes.todos);

// Connecting Databse (MongoDB) And Startting app
mongoose.set("strictQuery", false);
const main = async () => {
  await mongoose.connect(DB_CONNECTION_STRING);
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

main();
