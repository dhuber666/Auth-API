const request = require("supertest");
const app = require("../../");

describe("GET /user/me", () => {
  it("responds with json", done => {
    request(app)
      .get("/user/me")
      .expect("Content-Type", /json/);
    done();
  });
});
