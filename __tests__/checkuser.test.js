const app = require("../app");
const request = require(`supertest`);
const { Volunteer, Orphan, Admin, Match, Orphanage } = require("../models");
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
let AdminData = require("../data/admin.json").map((el) => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
  el.password = createHashPassword(`${el.password}`);
  el.role = "admin";
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
let AdminTest = {
  email: "lanny@mail.com",
  password: 123456,
};

let VolunteerToken;
let OrphanToken;
let adminToken;

beforeAll(async () => {
  await queryInterface.bulkInsert("Orphanages", OrphanageData, {});
  await queryInterface.bulkInsert("Admins", AdminData, {});
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
  VolunteerToken = signPayloadToToken(payload);
  let adminLogin = await Admin.findOne({
    where: {
      email: AdminTest.email,
    },
  });
  let payloadAdmin = {
    id: adminLogin.id,
    role: adminLogin.role,
  };
  adminToken = signPayloadToToken(payloadAdmin);
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
  await queryInterface.bulkDelete("Admins", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

//! Match route
describe("Check User Login Routes Test", () => {
  //! Create a match
  describe("GET /checkUser/ - Check User Login", () => {
    test("200 Volunteer - check user login success", () => {
      return request(app)
        .get("/checkUser/")
        .set("access_token", VolunteerToken)
        .then((result) => {
          expect(result.status).toBe(200);
          expect(result.body).toBeInstanceOf(Object);
          expect(result.body).toHaveProperty("id");
          expect(result.body).toHaveProperty("email", "lanny@gmail.com");
          expect(result.body).not.toHaveProperty("password");
          expect(result.body).toHaveProperty("fullName", "Lanny Alfiani");
          expect(result.body).toHaveProperty("imageUrl");
          expect(result.body).toHaveProperty("linkedinUrl");
          expect(result.body).toHaveProperty("curriculumVitae");
          expect(result.body).toHaveProperty("verified");
          expect(result.body).toHaveProperty("role", "volunteer");
          expect(result.body).toHaveProperty("lastEducation");
          expect(result.body).toHaveProperty("matchStatus");
        });
    });
  });
  describe("GET /checkUser/ - Check User Login", () => {
    test("200 Admin - check user login success", () => {
      return request(app)
        .get("/checkUser/")
        .set("access_token", adminToken)
        .then((result) => {
          expect(result.status).toBe(200);
          expect(result.body).toBeInstanceOf(Object);
          expect(result.body).toHaveProperty("id");
          expect(result.body).toHaveProperty("email", "lanny@mail.com");
          expect(result.body).not.toHaveProperty("password");
          expect(result.body).toHaveProperty("role", "admin");
        });
    });
  });
  describe("GET /checkUser/ - Check User Login", () => {
    test("200 Orphan - check user login success", () => {
      return request(app)
        .get("/checkUser/")
        .set("access_token", OrphanToken)
        .then((result) => {
          expect(result.status).toBe(200);
          expect(result.body).toBeInstanceOf(Object);
          expect(result.body).toHaveProperty("email", "el@gmail.com");
          expect(result.body).not.toHaveProperty("password");
          expect(result.body).toHaveProperty("fullName", "Eleven");
          expect(result.body).toHaveProperty(
            "imageUrl",
            "https://res.cloudinary.com/dnp1u4pgv/image/upload/v1667943273/RumahSandar/Orphans/el_astf74.webp"
          );
          expect(result.body).toHaveProperty("OrphanageId", 1);
          expect(result.body).toHaveProperty("matchStatus", "notMatch");
          expect(result.body).toHaveProperty("verified", true);
          expect(result.body).toHaveProperty("role", "orphan");
        });
    });
  });
  ///////////////////////////////////////////////////////////////
  describe("GET /studypair/ - Check User Study Pair", () => {
    test("200 Volunteer - check user Pair success", () => {
      return request(app)
        .get("/checkUser/studypair")
        .set("access_token", VolunteerToken)
        .then((result) => {
          expect(result.status).toBe(200);
          expect(result.body).toBeInstanceOf(Array);
        });
    });
  });
  describe("GET /studypair/ - Check User Study Pair", () => {
    test("200 Orphan - check user Pair success", () => {
      return request(app)
        .get("/checkUser/studypair")
        .set("access_token", OrphanToken)
        .then((result) => {
          expect(result.status).toBe(200);
          expect(result.body).toBeInstanceOf(Array);
        });
    });
  });
  describe("GET /studypair/ - Check User Study Pair", () => {
    test("200 Admin - check user Pair success", () => {
      return request(app)
        .get("/checkUser/studypair")
        .set("access_token", adminToken)
        .then((result) => {
          expect(result.status).toBe(200);
          expect(result.body).toBeInstanceOf(Array);
        });
    });
  });
});
