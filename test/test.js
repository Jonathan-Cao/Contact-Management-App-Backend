process.env.NODE_ENV = "test";

// Import app
let app = require("../app.js");
// Import db
let db = require("../db/index.js");

let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

describe("test REST API calls", function () {
  // time to build mongodb binaries
  this.timeout(60000);
  after((done) => {
    db.close();
    done();
  });

  let contactId = "";

  it("successfully gets all contacts", (done) => {
    chai
      .request(app)
      .get("/api/contacts")
      .then((res) => {
        const body = res.body;
        expect(body["data"].length).to.equal(0);
        done();
      })
      .catch((err) => done(err));
  });

  it("successfully adds a contact", (done) => {
    chai
      .request(app)
      .post("/api/contacts")
      .send({
        name: "Jon",
        email: "jon@gmail.com",
        gender: "Male",
        phone: "91234567",
      })
      .then((res) => {
        const body = res.body;
        expect(body["message"]).to.equal("New contact created!");
        expect(body["data"]["name"]).to.equal("Jon");
        expect(body["data"]["email"]).to.equal("jon@gmail.com");
        expect(body["data"]["gender"]).to.equal("Male");
        expect(body["data"]["phone"]).to.equal("91234567");
        contactId = body["data"]["_id"];
        done();
      })
      .catch((err) => done(err));
  });

  it("successfully updates a contact", (done) => {
    chai
      .request(app)
      .put(`/api/contacts/${contactId}`)
      .send({
        phone: "97654321",
      })
      .then((res) => {
        const body = res.body;
        expect(body["message"]).to.equal("Contact Info updated");
        expect(body["data"]["name"]).to.equal("Jon");
        expect(body["data"]["email"]).to.equal("jon@gmail.com");
        expect(body["data"]["gender"]).to.equal("Male");
        expect(body["data"]["phone"]).to.equal("97654321");
        done();
      })
      .catch((err) => done(err));
  });

  it("successfully deletes a contact", (done) => {
    chai
      .request(app)
      .delete(`/api/contacts/${contactId}`)
      .then((res) => {
        const body = res.body;
        expect(body["message"]).to.equal("Contact deleted");
        done();
      })
      .catch((err) => done(err));
  });
});
