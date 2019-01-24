const app = require("../../");
const session = require("supertest-session");

describe("Controller function to check if user exists", () => {
  let testSession = null;

  beforeEach(done => {
    testSession = session(app);
    testSession
      .post("/user/register")
      .send({
        username: "dhuber666",
        email: "dhuber666@gmail.com",
        password: "asfsdf4441!!!"
      })
      .set("Accept", "application/json")
      .end(err => {
        done();
      });
  });

  it("should return with 400 and that the user already exists", done => {
    testSession = session(app, {
      before: req => {
        req.set("cookie", null);
      }
    });
    testSession
      .post("/user/register")
      .send({
        username: "dhuber666",
        email: "dhuber666@gmail.com",
        password: "asfsdf4441!!!"
      })
      .set("Accept", "application/json")

      .expect(400, '"User is already existing in the database"', done);
  });
});

describe("Controller function to check if the user is signed in already", () => {
  let testSession = null;
  beforeEach(done => {
    testSession = session(app);
    testSession
      .post("/user/register")
      .send({
        username: "dhuber666",
        email: "dhuber666@gmail.com",
        password: "asfsdf4441!!!"
      })
      .set("Accept", "application/json")
      .end(done);
  });
  it("should return with a 400 status code when user is already signed in", done => {
    testSession
      .post("/user/register")
      .send({
        username: "dhuber666",
        email: "dhuber666@gmail.com",
        password: "asfsdf4441!!!"
      })
      .expect(400, '"User is already signed in"', done);
  });
});
