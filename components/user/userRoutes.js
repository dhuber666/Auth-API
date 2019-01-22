module.exports = (function() {
  const router = require("express").Router();

  router.post("/register", (req, res) => {
    const { id } = res.cookie;

    // first we look if the user is alreay authenticated
    if (id) {
      res.status(200).json("User is already signed in");
      return;
    }
    // TODO: then we check for validation

    // then we check if the user is already in the database

    // then we create the user in the database and returning it excluding password
  });

  router.get("/me", (req, res) => {
    res.json("Hello from me");
  });

  return router;
})();
