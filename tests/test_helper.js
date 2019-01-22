//inside tests/test_helper.js
require("dotenv").config();
require("../components/user/userModel.test");

const { MONGO_URI } = process.env;

const mongoose = require("mongoose");
//tell mongoose to use es6 implementation of promises
mongoose.Promise = global.Promise;

before(done => {
  mongoose.connect(
    MONGO_URI,
    { useNewUrlParser: true }
  );
  mongoose.connection
    .once("open", () => done())
    .on("error", error => {
      console.warn("Error : ", error);
    });
});

//Called hooks which runs before something.
beforeEach(done => {
  mongoose.connection.collections.users.drop(() => done());
});
