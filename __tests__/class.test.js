const app = require("../app");
const request = require(`supertest`);
const { Volunteer, Orphan, Match, Orphanage } = require("../models");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const {
  createHashPassword,
  signPayloadToToken,
} = require("../helpers/helpers");

const OrphanageData = require("../data/orphanages.json");
OrphanageData.forEach((el) => {
  el.updatedAt = el.createdAt = new Date();
});
let ClassCategoriesData = require("../data/classCategory.json");
ClassCategoriesData.map((el) => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
});
let VolunteerData = require("../data/volunteer.json").map((el) => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
  el.password = createHashPassword(`${el.password}`);
  el.role = "volunteer";
  el.matchStatus = "notMatch";
  return el;
});
let OrphanData = require("../data/orphan.json").map((el) => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
  el.password = createHashPassword(`${el.password}`);
  el.role = "orphan";
  el.matchStatus = "notMatch";
  return el;
});
let VolunteerTest = {
  email: "lanny@gmail.com",
  password: 12345,
};
let OrphanTest = {
  email: "el@gmail.com",
  password: 12345,
};
let volunteerNotVerified = {
  email: "sungjin@gmail.com",
  password: 12345,
};
let OrphanNotVerified = {
  email: "mike@gmail.com",
  password: 12345,
};

let VolunteerToken;
let OrphanToken;
let VolunteerNotVerifiedToken;
let OrphanNotVerifiedToken;
let VolunteerNotMatchToken;

beforeAll(async () => {
  await queryInterface.bulkInsert("Orphanages", OrphanageData, {});
  await queryInterface.bulkInsert("ClassCategories", ClassCategoriesData, {});
  await queryInterface.bulkInsert("Volunteers", VolunteerData, {});
  await queryInterface.bulkInsert("Orphans", OrphanData, {});

  let findVolunteerLogin = await Volunteer.findOne({
    where: {
      email: VolunteerTest.email,
    },
  });
  let payload = {
    id: findVolunteerLogin.id,
    role: findVolunteerLogin.role,
  };
  VolunteerToken = signPayloadToToken(payload);

  let findVolunteerNotVerifiedLogin = await Volunteer.findOne({
    where: {
      email: volunteerNotVerified.email,
    },
  });
  let VolunteerNotVerifiedPayload = {
    id: findVolunteerNotVerifiedLogin.id,
    role: findVolunteerNotVerifiedLogin.role,
  };
  VolunteerNotVerifiedToken = signPayloadToToken(VolunteerNotVerifiedPayload);

  let findOrphanLogin = await Orphan.findOne({
    where: {
      email: OrphanTest.email,
    },
  });
  let payloadOrphan = {
    id: findOrphanLogin.id,
    role: findOrphanLogin.role,
  };
  OrphanToken = signPayloadToToken(payloadOrphan);

  let findOrphanNotVerifiedLogin = await Orphan.findOne({
    where: {
      email: OrphanNotVerified.email,
    },
  });
  let payloadNotVerifiedOrphan = {
    id: findOrphanNotVerifiedLogin.id,
    role: findOrphanNotVerifiedLogin.role,
  };
  OrphanNotVerifiedToken = signPayloadToToken(payloadNotVerifiedOrphan);
  let Orphan2 = await Orphan.findOne({
    where: {
      email: "max@gmail.com",
    },
  });
  let Orphan2Payload = {
    id: Orphan2.id,
    role: Orphan2.role,
  };
  Orphan2Token = signPayloadToToken(Orphan2Payload);
});
afterAll(async () => {
  await queryInterface.bulkDelete("Classes", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await queryInterface.bulkDelete("Matches", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await queryInterface.bulkDelete("Volunteers", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await queryInterface.bulkDelete("Orphans", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await queryInterface.bulkDelete("ClassCategories", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await queryInterface.bulkDelete("Orphanages", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

//! Match route
describe("Match Routes Test", () => {
  //! Create a match
  describe("POST /match/ - create new match", () => {
    test("201 Request Success - should create new match", (done) => {
      request(app)
        .post("/match/")
        .set("access_token", OrphanToken)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(201);
          expect(body).toHaveProperty("message", "Create Request Success");
          return done();
        });
    });
  });

  //! Approve a match requeest
  describe("PUT /match/1 - Approve a match request", () => {
    test("201 Request Success - Success", () => {
      return request(app)
        .put("/match/1")
        .set("access_token", VolunteerToken)
        .send({
          startDate: "2022-11-07",
          hour: "13:00",
        })
        .then((result) => {
          expect(result.status).toBe(201);
          expect(result.body).toHaveProperty(
            "message",
            "Submit Success, and Schedule has been created"
          );
        });
    });
  });
});

//! Class route
describe("Class Routes Test", () => {
  describe("GET /classes - success with valid volunteer token", () => {
    test("Should return status code 200", () => {
      return request(app)
        .get("/classes")
        .set("access_token", VolunteerToken)
        .then((result) => {
          expect(result.status).toBe(200);
          expect(result.body).toBeInstanceOf(Array);
          expect(result.body).toHaveLength(1);
        });
    });
  });

  describe("GET /classes - success with valid orphan token", () => {
    test("Should return status code 401", () => {
      return request(app)
        .get("/classes")
        .set("access_token", OrphanToken)
        .then((result) => {
          expect(result.status).toBe(200);
          expect(Array.isArray(result.body)).toBeTruthy();
          expect(result.body.length).toBeGreaterThan(0);
        });
    });
  });
});
