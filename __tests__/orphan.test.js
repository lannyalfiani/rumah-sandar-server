const app = require("../app");
const request = require("supertest");
const { Orphan, sequelize } = require("../models");
const CloudinaryCloud = require("../helpers/CloudinaryCloud");
const { createHashPassword } = require("../helpers/helpers");
const { queryInterface } = sequelize;
// require('dotenv').config();

const cloudinary = require("cloudinary")
jest.mock('cloudinary')

beforeEach(() => {
  cloudinary.v2.uploader.upload.mockResolvedValue({
    url: "imgOpr.png"
  })
})

const OrphanagesData = require("../data/orphanages.json").map((el) => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
  return el;
});

afterEach(() => {
  jest.restoreAllMocks()
})

const orphanData = [
  {
    email: "orphan21@gmail.com",
    password: 123456,
    fullName: "Adik Baik",
    imageUrl: "img.img",
    "OrphanageId": 1,
    verified: true
  }
]

let dataSeeding = orphanData.map(el => {
  el.password = createHashPassword(`${el.password}`)
  el.createdAt = new Date();
  el.updatedAt = new Date();
  return el
})

beforeAll(async () => {
  await queryInterface.bulkInsert(`Orphanages`, OrphanagesData, {});
  await queryInterface.bulkInsert(`Orphans`, dataSeeding, {});
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

describe("Orphan Routes Test", () => {
  describe("POST /orphan/register - create new user", () => {
    test("201 Success register - should create new User", (done) => {

      request(app)
        .post("/orphan/register")
        .field("email", "user.test@mail.com")
        .field("password", "123456")
        .field("fullName", "volunteer1")
        .field("OrphanageId", 1)
        .attach('imageUrl', "data/hacktiv8-1.png")
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
        .field("email", "")
        .field("password", "123")
        .field("fullName", "volunteer1")
        .field("OrphanageId", 1)
        .attach('imageUrl', "data/hacktiv8-1.png")
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Email required");
          return done();
        });
    });

    test("400 Failed register - should return error if email already exists", (done) => {
      request(app)
        .post("/orphan/register")
        .field("email", "orphan21@gmail.com")
        .field("password", "123456")
        .field("fullName", "volunteer1")
        .field("OrphanageId", 1)
        .attach('imageUrl', "data/hacktiv8-1.png")
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
        .field("email", "user.test")
        .field("password", "123456")
        .field("fullName", "volunteer1")
        .field("OrphanageId", 1)
        .attach('imageUrl', "data/hacktiv8-1.png")
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Wrong format");
          return done();
        });
    });

    test("400 Failed register - should return error if password less 5 char", (done) => {
      request(app)
        .post("/orphan/register")
        .field("email", "user.test@mail.com")
        .field("password", "123")
        .field("fullName", "volunteer1")
        .field("OrphanageId", 1)
        .attach('imageUrl', "data/hacktiv8-1.png")
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Password must be at least 5 character");
          return done();
        });
    });

    test("400 Failed register - should return error when faileed upload", (done) => {
      cloudinary.v2.uploader.upload.mockRejectedValue(new Error("Uploading file failed"))
      request(app)
        .post("/orphan/register")
        .field("email", "user.test@mail.com")
        .field("password", "123456")
        .field("fullName", "volunteer1")
        .field("OrphanageId", 1)
        .attach('imageUrl', "data/hacktiv8-1.png")
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(422);
          expect(body).toHaveProperty("message", "Uploading file failed");
          return done();
        });
    });


  });

  describe("POST /orphan/login - user login", () => {
    test("200 Success login - should return access_token", (done) => {
      request(app)
        .post("/orphan/login")
        .send({
          email: "orphan21@gmail.com",
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

    test("401 Failed login - should return error verify test", (done) => {
      request(app)
        .post("/orphan/login")
        .send({
          email: "user.test@mail.com",
          password: "salahpassword",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "You are not verified");
          return done();
        });
    });

    test("401 Failed login - should return error if wrong password/email", (done) => {
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

    test("401 Failed login - should return error if email is null", (done) => {
      request(app)
        .post("/orphan/login")
        .send({
          password: "salahpassword",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "All Field Required ");
          return done();
        });
    });

    test("401 Failed login - should return error if password is null", (done) => {
      request(app)
        .post("/orphan/login")
        .send({
          email: "hello@mail.com",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "All Field Required ");
          return done();
        });
    });
  });


});
