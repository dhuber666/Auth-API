const User = require("./userModel");

module.exports = {
  isAlreadyExisting: async id => {
    const user = await User.findById(id);

    return !!user;
  },
  registerUser: async (req, res) => {
    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
      password
    });

    const { error } = newUser.joiValidate();

    if (error) {
      res.status(400).json(error);
    } else {
      const savedUser = await newUser.save();
      res.cookie.id = savedUser._id;

      // strip away the password
      const userWithoutPassword = {
        id: savedUser._id,
        email: savedUser.email,
        username: savedUser.username,
        created_at: savedUser.created_at,
        updated_at: savedUser.updated_at
      };
      res.json(userWithoutPassword);
    }
  }
};
