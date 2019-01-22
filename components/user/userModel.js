const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: { type: String, select: false }
});

userSchema.pre("save", function(done) {
  const user = this;

  if (!user.isModified("password")) return done();

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      // Store hash in your password DB.
      user.password = hash;

      done();
    });
  });
});

userSchema.methods.comparePassword = function(password, cb) {
  const user = this;
  // returns true if password matches and false if it doesn't match
  bcrypt
    .compare(password, user.password)
    .then(res => {
      // res === true or false
      cb(null, res);
    })
    .catch(error => cb(error));
};

userSchema.methods.joiValidate = function() {
  console.log(typeof this.username);

  // pull out just the properties that has to be checked (generated fields from mongoose we ignore)
  const { username, email, password } = this;
  const user = { username, email, password };
  const Joi = require("joi");
  const schema = Joi.object().keys({
    username: Joi.string()
      .min(6)
      .max(24)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(8)
      .max(30)
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    _id: Joi.string()
  });

  return Joi.validate(user, schema, { abortEarly: false });
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
