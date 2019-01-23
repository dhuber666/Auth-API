const assert = require("assert");
const User = require("./userModel");
const userController = require("./userController");

describe("Controller function to check if user exists", () => {
  let newUser;
  beforeEach(done => {
    newUser = new User({
      name: "dominik huber",
      email: "dhuber666@gmail.com",
      password: "Aadsfsdf22!!"
    });
    newUser.save().then(() => done());
  });

  it("should return true if the user exists and false if he doesn't exist", async done => {
    const isExisting = await userController.isAlreadyExisting(newUser._id);
    assert(isExisting === true);
    done();
  });
});
