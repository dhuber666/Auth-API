const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
require("dotenv").config();
const userRoutes = require("./components/user").userRoutes;
const mongoose = require("mongoose");

const app = express();

const { PORT, MONGO_URI } = process.env;

app.use(
  session({
    secret: "abcF55ss!11",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 2 }
  })
);

app.use(bodyParser.json());

app.use("/user", userRoutes);

mongoose.Promise = Promise;
mongoose.connect(
  MONGO_URI,
  { useNewUrlParser: true }
);

module.exports = app;

if (!module.parent) {
  app.listen(PORT, () => console.log("Server listening on PORT ", PORT));
}
