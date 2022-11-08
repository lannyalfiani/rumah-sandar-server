const request = require(`supertest`);
const { Volunteer, Orphan, sequelize } = require("../models");
const CloudinaryCloud = require("../helpers/CloudinaryCloud")
const { queryInterface } = sequelize;
const app = require("../app");
const { createHashPassword } = require("../helpers/helpers");

beforeEach(() => {
  // jest.restoreAllMocks()
  jest.spyOn(CloudinaryCloud, "uploadImageVolunteer").mockResolvedValue("img.png")
  jest.spyOn(CloudinaryCloud, "uploadCV").mockResolvedValue("cv.pdf")
})

afterEach(() => {
  jest.restoreAllMocks()
})

const volunteer1 = [
  {
    email: "volunteer12@mail.com",
    password: "123456",
    fullName: "volunteer1",
    // imageUrl: "https://test.jpg",
    linkedinUrl: "test.com",
    // curriculumVitae: "url.com",
    lastEducation: "SMA",
    verified: true
  }
]

let dataSeed = volunteer1.map(el => {
  el.createdAt = new Date()
  el.updatedAt = new Date()
  el.password = createHashPassword(`${el.password}`)
  return el
})

beforeAll(async () => {

  try {
    await queryInterface.bulkInsert(`Volunteers`, dataSeed, {});
  } catch (error) {
    console.log(error);
  }
})


afterAll(async () => {
  await Volunteer.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await Orphan.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});



describe("Volunteer Routes Test", () => {
  describe("POST /volunteer/register - create new volunteer", () => {
    test("201 Success register - should create new Volunteer", (done) => {

      request(app)
        .post("/volunteer/register")
        .field("email", "volunteer122222@mail.com")
        .field("password", "123456")
        .field("fullName", "volunteer1")
        .field("linkedinUrl", "test.com")
        .field("lastEducation", "sma")
        .attach("imageUrl", "data/hacktiv8-1.png")
        .attach("curriculumVitae", "data/hacktiv8-1.png")
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          console.log(body)
          console.log(status);
          expect(status).toBe(201);
          expect(body).toHaveProperty("message", "Register Success");
          return done();
        });
    });

    test("201 Success register for Not Verified - should create new Volunteer", (done) => {

      request(app)
        .post("/volunteer/register")
        .field("email", "volunteer580@mail.com")
        .field("password", "12345")
        .field("fullName", "volunteer1")
        .field("linkedinUrl", "test.com")
        .field("lastEducation", "sma")
        .attach("imageUrl", "data/hacktiv8-1.png")
        .attach("curriculumVitae", "data/hacktiv8-1.png")
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
        .post("/volunteer/register")
        .field("email", "")
        .field("password", "123456")
        .field("fullName", "volunteer1")
        .field("linkedinUrl", "test.com")
        .field("lastEducation", "sma")
        .attach("imageUrl", "data/hacktiv8-1.png")
        .attach("curriculumVitae", "data/hacktiv8-1.png")
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Email required");
          return done();
        });
    });

    test("400 Failed register - should return error if fullName is null", (done) => {
      jest
        .spyOn(CloudinaryCloud, "uploadImageVolunteer")
        .mockResolvedValue("img.png");
      jest.spyOn(CloudinaryCloud, "uploadCV").mockResolvedValue("cv.pdf");
      request(app)
        .post("/volunteer/register")
        .field("email", "volunteer12@mail.com")
        .field("password", "123456")
        .field("fullName", "")
        .field("linkedinUrl", "test.com")
        .field("lastEducation", "sma")
        .attach("imageUrl", "data/hacktiv8-1.png")
        .attach("curriculumVitae", "data/hacktiv8-1.png")
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Full Name required");
          return done();
        });
    });

    test("400 Failed register - should return error if password is null", (done) => {

      request(app)
        .post("/volunteer/register")
        .field("email", "volunteer12@mail.com")
        .field("password", "")
        .field("fullName", "volunteer1")
        .field("linkedinUrl", "test.com")
        .field("lastEducation", "sma")
        .attach("imageUrl", "data/hacktiv8-1.png")
        .attach("curriculumVitae", "data/hacktiv8-1.png")
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Password required");
          return done();
        });
    });

    test("401 Failed register - should return error if imageUrl is null", (done) => {
      request(app)
        .post("/volunteer/register")
        .field("email", "volunteer12@mail.com")
        .field("password", "123456")
        .field("fullName", "volunteer1")
        .field("linkedinUrl", "test.com")
        .field("lastEducation", "sma")
        .attach("imageUrl", "")
        .attach("curriculumVitae", "data/hacktiv8-1.png")

        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "All Field Required ");
          return done();
        });
    });

    test("400 Failed register - should return error if linkedIn is null", (done) => {
      request(app)
        .post("/volunteer/register")
        .field("email", "volunteer12@mail.com")
        .field("password", "123456")
        .field("fullName", "volunteer1")
        .field("linkedinUrl", "")
        .field("lastEducation", "sma")
        .attach("imageUrl", "data/hacktiv8-1.png")
        .attach("curriculumVitae", "data/hacktiv8-1.png")

        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Linkedin Url required");
          return done();
        });
    });

    test("401 Failed register - should return error if curriculumVitae is null", (done) => {
      request(app)
        .post("/volunteer/register")
        .field("email", "volunteer12@mail.com")
        .field("password", "123456")
        .field("fullName", "volunteer1")
        .field("linkedinUrl", "test.com")
        .field("lastEducation", "sma")
        .attach("imageUrl", "")
        .attach("curriculumVitae", "data/hacktiv8-1.png")

        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "All Field Required ");
          return done();
        });
    });

    test("400 Failed register - should return error if lastEducation is null", (done) => {
      request(app)
        .post("/volunteer/register")
        // .send({
        //   email: "test",
        // })
        .field("email", "volunteer12@mail.com")
        .field("password", "123456")
        .field("fullName", "volunteer1")
        .field("linkedinUrl", "test.com")
        .field("lastEducation", "")
        .attach("imageUrl", "data/hacktiv8-1.png")
        .attach("curriculumVitae", "data/hacktiv8-1.png")
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Last Education required");
          return done();
        });
    });

    test("400 Failed register - should return error if email is already exists", (done) => {
      request(app)
        .post("/volunteer/register")
        .field("email", "volunteer12@mail.com")
        .field("password", "123456")
        .field("fullName", "volunteer1")
        .field("linkedinUrl", "test.com")
        .field("lastEducation", "sma")
        .attach("imageUrl", "data/hacktiv8-1.png")
        .attach("curriculumVitae", "data/hacktiv8-1.png")
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "email already been used");
          return done();
        });
    });

    test("400 Failed register - should return error if password less than 5 char", (done) => {
      request(app)
        .post("/volunteer/register")
        .field("email", "volunteer@hhdh.cjjj")
        .field("password", "123")
        .field("fullName", "volunteer1")
        .field("linkedinUrl", "test.com")
        .field("lastEducation", "sma")
        .attach("imageUrl", "data/hacktiv8-1.png")
        .attach("curriculumVitae", "data/hacktiv8-1.png")
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toHaveProperty(
            "message",
            "Password must be at least 5 character"
          );
          return done();
        });
    });

    test("400 Failed register - should return error if wrong email format", (done) => {
      request(app)
        .post("/volunteer/register")
        .field("email", "volunteer")
        .field("password", "123456")
        .field("fullName", "volunteer1")
        .field("linkedinUrl", "test.com")
        .field("lastEducation", "sma")
        .attach("imageUrl", "data/hacktiv8-1.png")
        .attach("curriculumVitae", "data/hacktiv8-1.png")
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Wrong format");
          return done();
        });
    });
  });

  describe("POST /volunteer/login - volunteer login", () => {
    test("200 Success login - should return access_token", (done) => {
      request(app)
        .post("/volunteer/login")
        .send({
          email: "volunteer12@mail.com",
          password: "123456",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          console.log(res.body)
          expect(status).toBe(200);
          expect(body).toHaveProperty("access_token", expect.any(String));
          return done();
        });
    });

    test("401 Failed login - should return error", (done) => {
      request(app)
        .post("/volunteer/login")
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
        .post("/volunteer/login")
        .send({
          email: "",
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
        .post("/volunteer/login")
        .send({
          email: "hello@mail.com",
          password: "",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "All Field Required ");
          return done();
        });
    });
    test("401 Failed login - should return You are not verified", (done) => {
      request(app)
        .post("/volunteer/login")
        .send({
          email: "volunteer580@mail.com",
          password: "12345",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "You are not verified");
          return done();
        });
    });
  });
});
