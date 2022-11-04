const app = require("../app");
const request = require("supertest");
const { Orphan, Orphanage } = require("../models");

const orphan1 = {
  email: "user.test@mail.com",
  name: "User Test",
  password: "usertest",
};

// afterAll(done => {
//     Orphan.destroy({ truncate: true, cascade: true, restartIdentity: true})
//     .then(_ => {
//       return Hero.destroy({ truncate: true, cascade: true, restartIdentity: true})
//     })
//     .then(_ => {
//       return MyHero.destroy({ truncate: true, cascade: true, restartIdentity: true})
//     })
//     .then(_ => {
//       done();
//     })
//     .catch(err => {
//       done(err);
//     });
// });

describe("Orphan Routes Test", () => {
  describe("POST /orphan/register - create new user", () => {
    test("201 Success register - should create new User", (done) => {
      request(app)
        .post("/orphan/register")
        .send(orphan1)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(201);
          expect(body).toHaveProperty("id", expect.any(Number));
          expect(body).toHaveProperty("email", orphan1.email);
          return done();
        });
    });

    test("400 Failed register - should return error if email is null", (done) => {
      request(app)
        .post("/orphan/register")
        .send({
          password: "qweqwe",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Email is required");
          return done();
        });
    });

    test("400 Failed register - should return error if email is already exists", (done) => {
      request(app)
        .post("/orphan/register")
        .send(orphan1)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Email must be unique");
          return done();
        });
    });

    test("400 Failed register - should return error if wrong email format", (done) => {
      request(app)
        .post("/orphan/register")
        .send({
          email: "random",
          name: "Sample User",
          password: "qweqwe",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Invalid email format");
          return done();
        });
    });
  });

  describe("POST /orphan/login - user login", () => {
    test("200 Success login - should return access_token", (done) => {
      request(app)
        .post("/orphan/login")
        .send(orphan1)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(200);
          expect(body).toHaveProperty("access_token", expect.any(String));
          return done();
        });
    });

    test("401 Failed login - should return error", (done) => {
      request(app)
        .post("/orphan/login")
        .send({
          email: "hello@mail.com",
          password: "salahpassword",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Invalid email/password");
          return done();
        });
    });
  });
});
