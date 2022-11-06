const app = require("../app");
const request = require("supertest");
const { Orphan, sequelize } = require("../models");
const { queryInterface } = sequelize;

const OrphanagesData = require("../data/orphanages.json").map((el) => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
  return el;
});

beforeAll(async () => {
  await queryInterface.bulkInsert(`Orphanages`, OrphanagesData, {});
});

afterAll(async () => {
  await queryInterface.bulkDelete(`Orphanages`, null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

  await Orphan.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

const orphan1 = {
  fullName: "User Test",
  email: "user.test@mail.com",
  password: "usertest",
  imageUrl: "test",
  OrphanageId: 1,
};

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
          expect(body).toHaveProperty("message", "Register Success");
          return done();
        });
    });

    test("400 Failed register - should return error if email is null", (done) => {
      request(app)
        .post("/orphan/register")
        .send({
          fullName: "User Test",
          password: "usertest",
          email:'' ,
          imageUrl: "test",
          OrphanageId: 1,
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "All Field Required");
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
          expect(body).toHaveProperty("message", "email already been used");
          return done();
        });
    });

    test("400 Failed register - should return error if wrong email format", (done) => {
      request(app)
        .post("/orphan/register")
        .send({
          fullName: "User Test",
          email: "email",
          password: "usertest",
          imageUrl: "test",
          OrphanageId: 1,
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Wrong format");
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
          expect(body).toHaveProperty("message", "Invalid Email/Password");
          return done();
        });
    });
  });
});
