const User = require("./userModel");

module.exports = {
  isAlreadyLoggedIn: async (req, res, next) => {
    const { userID } = req.session;

    if (userID) {
      res.status(400).json("User is already signed in");
      return;
    }
    next();
  },
  isAlreadyExisting: async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      res.status(400).json("User is already existing in the database");
      return;
    }

    next();
  },
  registerUser: async (req, res, next) => {
    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
      password
    });

    const { userID } = req.session;
    if (!userID) {
      req.session.userID = newUser._id;
    }

    const { error } = newUser.joiValidate();

    if (error) {
      res.status(400).json(error);
      return;
    } else {
      const savedUser = await newUser.save();
      // res.cookie.id = savedUser._id;

      // strip away the password
      const userWithoutPassword = {
        id: savedUser._id,
        email: savedUser.email,
        username: savedUser.username,
        created_at: savedUser.created_at,
        updated_at: savedUser.updated_at
      };
      res.json(userWithoutPassword);
      return;
    }
  }
};
