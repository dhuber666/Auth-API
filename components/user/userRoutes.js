const userController = require("./userController");
const User = require("./userModel");

module.exports = (function() {
  const router = require("express").Router();

  router.post(
    "/register",
    userController.isAlreadyLoggedIn,
    userController.isAlreadyExisting,
    userController.registerUser
  );

  router.get("/me", (req, res) => {
    res.json("Hello from me");
  });

  return router;
})();
