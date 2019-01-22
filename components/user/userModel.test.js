const assert = require("assert");
const User = require("./userModel");
const chai = require("chai");

describe("Creating documents", () => {
  let newUser = null;
  beforeEach(done => {
    newUser = new User({
      username: "dhube",
      email: "dhuber666@gmail.com",
      password: "mypassword"
    });
    newUser.save().then(() => done());
  });
  it("creates a new user", done => {
    assert(!newUser.isNew); // if saved to db it's not new
    done();
  });

  it("stores the password as salt and not plain text", done => {
    assert(newUser.password !== "mypassword");

    done();
  });

  it("returns true or false when hashed password and plain text password will be compared", done => {
    const passwordMatches = newUser.comparePassword(
      "mypassword",
      (err, res) => {
        assert(res === true);
        done();
      }
    );
  });

  it("should throw an error if validation fails", done => {
    const invalidUser = new User({
      username: "bobad",
      email: "test@gmail.com",
      password: "test123!!!adsfasdf"
    });
    const { error } = invalidUser.joiValidate();
    assert(error);
    done();
  });
});
