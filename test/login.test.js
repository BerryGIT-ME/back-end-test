import chai from "chai";
import chaiHttp from "chai-http";
import { describe } from "mocha";
import app from "./../index.js";

const should = chai.should();
chai.use(chaiHttp);

describe("/POST login", () => {
  it("it should return a token for valid inputs", (done) => {
    chai
      .request(app)
      .post("/api/login")
      .send({ username: "u", password: "p" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.token.should.be.a("string");
        done();
      });
  });

  describe("Invalid input test cases", () => {
    it("it should return 400 for missing inputs", (done) => {
      chai
        .request(app)
        .post("/api/login")
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("it should return 400 for invalid username", (done) => {
      chai
        .request(app)
        .post("/api/login")
        .send({
          username: 1,
          password: "p",
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("it should return 400 for invalid password", (done) => {
      chai
        .request(app)
        .post("/api/login")
        .send({
          username: "U",
          password: 1,
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("it should return 400 for username/password as empty strings", (done) => {
      chai
        .request(app)
        .post("/api/login")
        .send({
          username: "",
          password: "",
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});
