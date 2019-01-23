const userController = require("./userController");
const User = require("./userModel");

module.exports = (function() {
  const router = require("express").Router();

  router.post("/register", async (req, res) => {
    const { id } = res.cookie;
    console.log(res.cookie.id);

    // first we look if the user is alreay authenticated
    if (id) {
      res.status(400).json("User is already signed in");
      return;
    }

    // then we check if the user is already in the database
    const isExisting = await userController.isAlreadyExisting(id);
    if (isExisting) {
      res.status(400).json("User is already existing in the database");
      return;
    }

    userController.registerUser(req, res);
  });

  router.get("/me", (req, res) => {
    res.json("Hello from me");
  });

  return router;
})();
