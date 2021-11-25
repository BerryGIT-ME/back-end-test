import chai from "chai";
import chaiHttp from "chai-http";
import { describe } from "mocha";
import app from "./../index.js";

const should = chai.should();
chai.use(chaiHttp);

// store jwt token to authorize api calls
let token;
chai
  .request(app)
  .post("/api/login")
  .send({ username: "u", password: "p" })
  .end((err, res) => {
    token = res.body.token;
  });

describe("/PATCH patch", () => {
  it("it should return a patched document for valid inputs and authorization", (done) => {
    chai
      .request(app)
      .patch("/api/patch")
      .send({
        data: { baz: "qux", foo: "bar" },
        patch: [{ op: "replace", path: "/baz", value: "boo" }],
      })
      .set({ Authorization: ["bearer", token].join(" ") })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.baz.should.be.eq("boo");
        res.body.foo.should.be.eq("bar");
        done();
      });
  });

  describe("Invalid Inputs test cases", () => {
    it("it should return 401 for unauthoized access", (done) => {
      chai
        .request(app)
        .patch("/api/patch")
        .send({
          data: { baz: "qux", foo: "bar" },
          patch: [{ op: "replace", path: "/baz", value: "boo" }],
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it("it should return 400 for empty data object", (done) => {
      chai
        .request(app)
        .patch("/api/patch")
        .send({
          data: {},
          patch: [{ op: "replace", path: "/baz", value: "boo" }],
        })
        .set({ Authorization: ["bearer", token].join(" ") })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.a("String");
          done();
        });
    });

    it("it should return 400 for missing data object in req body", (done) => {
      chai
        .request(app)
        .patch("/api/patch")
        .send({
          patch: [{ op: "replace", path: "/baz", value: "boo" }],
        })
        .set({ Authorization: ["bearer", token].join(" ") })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("it should return 400 for invalid type in 'data' field", (done) => {
      chai
        .request(app)
        .patch("/api/patch")
        .send({
          data: "Not a valid type",
          patch: [{ op: "replace", path: "/baz", value: "boo" }],
        })
        .set({ Authorization: ["bearer", token].join(" ") })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("it should return 400 for missing patch Array in req body", (done) => {
      chai
        .request(app)
        .patch("/api/patch")
        .send({
          data: { baz: "qux", foo: "bar" },
        })
        .set({ Authorization: ["bearer", token].join(" ") })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("it should return 400 for invalid type in 'patch' field", (done) => {
      chai
        .request(app)
        .patch("/api/patch")
        .send({
          data: { baz: "qux", foo: "bar" },
          patch: "Not a valid type",
        })
        .set({ Authorization: ["bearer", token].join(" ") })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});
