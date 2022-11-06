const app = require("../app");
const request = require("supertest");
const { Volunteer, Admin, Orphan, Match, sequelize } = require("../models");
const { createHashPassword } = require("../helpers/helpers");
const { queryInterface } = sequelize;

beforeAll(async () => {
  try {
    const admin = await Admin.create({
      email: "lanny@mail.com",
      password: createHashPassword("123456"),
      role: "admin",
    });

    await queryInterface.bulkInsert(
      "Volunteers",
      [
        {
          email: "volunteer1@mail.com",
          password: "123456",
          fullName: "volunteer1",
          imageUrl: "https://test.jpg",
          linkedinUrl: "test.com",
          curriculumVitae: "url.com",
          lastEducation: "SMA",
          createdAt: new Date(),
          updatedAt: new Date(),
          role: "volunteer",
          verified: false,
          matchStatus: "notMatch",
        },
      ],
      {}
    );
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  await Admin.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Volunteer.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("Admin Routes Test", () => {
  describe("POST /admin/login - admin login", () => {
    test("200 Success login - should return access_token", (done) => {
      request(app)
        .post("/admin/login")
        .send({
          email: "lanny@mail.com",
          password: "123456",
        })
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
        .post("/admin/login")
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
    test("404 Failed login - should return error if email is null", (done) => {
      request(app)
        .post("/admin/login")
        .send({
          password: "salahpassword",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(404);
          expect(body).toHaveProperty("message", "All Field Required ");
          return done();
        });
    });

    test("404 Failed login - should return error if password is null", (done) => {
      request(app)
        .post("/admin/login")
        .send({
          email: "hello@mail.com",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(404);
          expect(body).toHaveProperty("message", "All Field Required ");
          return done();
        });
    });
  });
});
