const app = require("../app");
const request = require("supertest");
const { Orphan, sequelize } = require("../models");
const CloudinaryCloud = require("../helpers/CloudinaryCloud");
const { queryInterface } = sequelize;

const OrphanagesData = require("../data/orphanages.json").map((el) => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
  return el;
});

beforeAll(async () => {
  await queryInterface.bulkInsert(`Orphanages`, OrphanagesData, {});
});

beforeEach(() => {
  jest.restoreAllMocks()
})

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

      jest.spyOn(CloudinaryCloud, "uploadImageOrphan").mockResolvedValue("imgOpr.png")

      request(app)
        .post("/orphan/register")
        // .send(orphan1)
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

    test("400 Failed register - should return error if email is already exists", (done) => {
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
  });

  describe("POST /orphan/login - user login", () => {
    test("200 Success login - should return access_token", (done) => {
      request(app)
        .post("/orphan/login")
        .send({
          email: "user.test@mail.com",
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


    // test("401 Failed login - should return error wrong password", (done) => {
    //   request(app)
    //     .post("/orphan/login")
    //     .send({
    //       email: "user.test@mail.com",
    //       password: "salahpassword",
    //     })
    //     .end((err, res) => {
    //       if (err) return done(err);
    //       const { body, status } = res;

    //       expect(status).toBe(401);
    //       expect(body).toHaveProperty("message", "Invalid Email/Password");
    //       return done();
    //     });
    // });





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


    // describe("GET /orphan/:id", () => {
    //   describe("Success attempt", () => {
    //       it("Should return status code 200", async () => {
    //         const response = await request(app)
    //           .get("/orphan/1")
    //         expect(response.status).toBe(200);
    //         expect(response.body).toHaveProperty("id", expect.any(Number));
    //       });
    
    //   });
    //   describe("Failed attempt", () => {
    //       it("Should return status code 401", async () => {
    //         const response = await request(app)
    //           .get("/orphan/1")
    //         expect(response.status).toBe(401);
    //         expect(response.body).toHaveProperty("message", "Unauthorized");
    //     });
    //     describe("Content not found", () => {
    //       it("Should return status code 404", async () => {
    //         const response = await request(app)
    //           .get("/orphan/100")
    //         expect(response.status).toBe(404);
    //         expect(response.body).toHaveProperty("message", "Content Not Found");
    //       });
    //     });
    //   });
    // });





  });
});
