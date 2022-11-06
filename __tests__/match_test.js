const request = require(`supertest`);
const { Volunteer, Orphan, Match, Orphanage, sequelize } = require("../models");
const { queryInterface } = sequelize;
const app = require("../app");
const { bulkSchedule } = require("../helpers/getEach7Day");
const {
  createHashPassword,
  signPayloadToToken,
} = require("../helpers/helpers");

const OrphanagesData = require("../data/orphanages.json").map((el) => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
  return el;
});

const volunteer1 = {
  email: "anonim199619971998@gmail.com",
  password: createHashPassword("12345"),
  fullName: "volunteer1",
  imageUrl: "https://test.jpg",
  linkedinUrl: "test.com",
  curriculumVitae: "url.com",
  lastEducation: "SMA",
  verified: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};
const orphan1 = {
  fullName: "User Test",
  email: "d@gmail.com",
  password: createHashPassword("12345"),
  imageUrl: "test",
  OrphanageId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};
const classCategory = require("../data/classCategory.json").map((el) => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
  return el;
});
let orphanToken = signPayloadToToken({
  id: 1,
  role: "orphan",
},);
let VolunteerToken = signPayloadToToken({
  id: 1,
  role: "volunteer",
});
beforeAll(() => {
  
});

describe("Match Routes Test", () => {
  describe("POST /match/ - create new match", () => {
    test("201 Request Success - should create new match", (done) => {
      request(app)
        .post("/match/")
        .set("access_token", orphanToken)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(201);
          expect(body).toHaveProperty("message", "Create Request Success");
          return done();
        });
    });
  });
});
