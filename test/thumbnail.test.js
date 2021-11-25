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

describe("/POST resize-thumbnail", () => {
  it("it should return a resized image valid inputs and authorization", (done) => {
    chai
      .request(app)
      .post("/api/resize-thumbnail")
      .send({
        url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      })
      .set({ Authorization: ["bearer", token].join(" ") })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.header("content-type");
        let size = Buffer.byteLength(res.body).toString();
        res.header["content-length"].should.be.eq(size);
        done();
      });
  });

  describe("Invalid input test cases", () => {
    it("it should return a status code of 401 for missing authorization", (done) => {
      chai
        .request(app)
        .post("/api/resize-thumbnail")
        .send({
          url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it("it should return a 400 for empty url strings ", (done) => {
      chai
        .request(app)
        .post("/api/resize-thumbnail")
        .send({
          url: "",
        })
        .set({ Authorization: ["bearer", token].join(" ") })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("it should return a message for missing url field in req body ", (done) => {
      chai
        .request(app)
        .post("/api/resize-thumbnail")
        .set({ Authorization: ["bearer", token].join(" ") })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("it should return 400 for invalid url strings ", (done) => {
      chai
        .request(app)
        .post("/api/resize-thumbnail")
        .send({
          url: "cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
        })
        .set({ Authorization: ["bearer", token].join(" ") })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});
