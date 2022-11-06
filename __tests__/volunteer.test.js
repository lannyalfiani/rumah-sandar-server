const request = require(`supertest`)
const { Volunteer, sequelize } = require("../models")
const { queryInterface } = sequelize
const app = require("../app")


afterAll(async () => {
  await Volunteer.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});


const volunteer1 = {
    email: "volunteer12@mail.com",
    password: "123456",
    fullName: "volunteer1",
    imageUrl: "https://test.jpg",
    linkedinUrl : "test.com",
    curriculumVitae : "url.com",
    lastEducation : "SMA"
  };


  describe("Volunteer Routes Test", () => {
    describe("POST /volunteer/register - create new volunteer", () => {
      test("201 Success register - should create new Volunteer", (done) => {
        request(app)
          .post("/volunteer/register")
          .send(volunteer1)
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
          .send({
            password: "qweqwe",
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
  
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "All Field Required");
            return done();
          });
      });


      test("400 Failed register - should return error if fullName is null", (done) => {
        request(app)
          .post("/volunteer/register")
          .send({
            password: "qweqwe",
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
  
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "All Field Required");
            return done();
          });
      });


      test("400 Failed register - should return error if password is null", (done) => {
        request(app)
          .post("/volunteer/register")
          .send({
            email : "test",
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
  
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "All Field Required");
            return done();
          });
      });


      test("400 Failed register - should return error if imageUrl is null", (done) => {
        request(app)
          .post("/volunteer/register")
          .send({
            email : "test",
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
  
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "All Field Required");
            return done();
          });
      });


      test("400 Failed register - should return error if linkedIn is null", (done) => {
        request(app)
          .post("/volunteer/register")
          .send({
            email : "test",
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
  
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "All Field Required");
            return done();
          });
      });


      test("400 Failed register - should return error if curriculumVitae is null", (done) => {
        request(app)
          .post("/volunteer/register")
          .send({
            email : "test",
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
  
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "All Field Required");
            return done();
          });
      });


      test("400 Failed register - should return error if lastEducation is null", (done) => {
        request(app)
          .post("/volunteer/register")
          .send({
            email : "test",
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
          .post("/volunteer/register")
          .send(volunteer1)
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
          .post("/volunteer/register")
          .send({
            email: "volunteer12",
            password: "123456",
            fullName: "volunteer1",
            imageUrl: "https://test.jpg",
            linkedinUrl : "test.com",
            curriculumVitae : "url.com",
            lastEducation : "SMA"
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
  
    describe("POST /volunteer/login - volunteer login", () => {
      test("200 Success login - should return access_token", (done) => {
        request(app)
          .post("/volunteer/login")
          .send(volunteer1)
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
    });
  });
  











