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
  el.verified = true;
  return el;
});
let OrphanData = require("../data/orphan.json").map((el) => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
  el.password = createHashPassword(`${el.password}`);
  el.role = "orphan";
  el.matchStatus = "notMatch";
  el.verified = true;
  return el;
});

let VolunteerTest = {
  email: "volunteer@gmail.com",
  password: 12345,
};
let OrphanTest = {
  email: "orphan@gmail.com",
  password: 12345,
};

let volunteerNotVerified = [
  {
    email: "volunteer2@gmail.com",
    password: 12345,
    fullName: "Kakak Jahat",
    imageUrl:
      "https://res.cloudinary.com/dnp1u4pgv/image/upload/v1667652004/RumahSandar/Volunteer/Images/znaufv0kogporh1svefx.png",
    linkedinUrl: "inilinkedin.com",
    curriculumVitae:
      "https://res.cloudinary.com/dnp1u4pgv/image/upload/v1667652004/RumahSandar/Volunteer/Images/znaufv0kogporh1svefx.png",
    lastEducation: "SMA",
  },
];
volunteerNotVerified.map((el) => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
  el.password = createHashPassword(`${el.password}`);
  el.role = "volunteer";
  el.matchStatus = "notMatch";
  el.verified = false;
  return el;
});

let OrphanNotVerified = [
  {
    email: "orphan2@gmail.com",
    password: 12345,
    fullName: "Adik Baik",
    imageUrl:
      "https://res.cloudinary.com/dnp1u4pgv/image/upload/v1667652004/RumahSandar/Volunteer/Images/znaufv0kogporh1svefx.png",
    OrphanageId: 1,
  },
];
OrphanNotVerified.map((el) => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
  el.password = createHashPassword(`${el.password}`);
  el.role = "orphan";
  el.matchStatus = "notMatch";
  el.verified = false;
  return el;
});

let VolunteerToken;
let OrphanToken;
let VolunteerNotVerifiedToken;
let OrphanNotVerifiedToken;
let VolunteerNotMatchToken;
let Orphan2Token;

beforeAll(async () => {
  await queryInterface.bulkInsert("Orphanages", OrphanageData, {});
  await queryInterface.bulkInsert("ClassCategories", ClassCategoriesData, {});
  await queryInterface.bulkInsert("Volunteers", VolunteerData, {});
  await queryInterface.bulkInsert("Volunteers", volunteerNotVerified, {});
  await queryInterface.bulkInsert("Orphans", OrphanData, {});
  await queryInterface.bulkInsert("Orphans", OrphanNotVerified, {});

  let findVolunteerLogin = await Volunteer.findOne({
    where: {
      email: VolunteerTest.email,
    },
  });
  console.log(findVolunteerLogin);
  let payload = {
    id: findVolunteerLogin.id,
    role: findVolunteerLogin.role,
  };
  VolunteerToken = signPayloadToToken(payload);

  let findVolunteerNotVerifiedLogin = await Volunteer.findOne({
    where: {
      email: volunteerNotVerified[0].email,
    },
  });
  console.log(findVolunteerNotVerifiedLogin);
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
      email: OrphanNotVerified[0].email,
    },
  });
  let payloadNotVerifiedOrphan = {
    id: findOrphanNotVerifiedLogin.id,
    role: findOrphanNotVerifiedLogin.role,
  };
  OrphanNotVerifiedToken = signPayloadToToken(payloadNotVerifiedOrphan);

  let findVolunteerNotMatchLogin = await Volunteer.findOne({
    where: {
      email: "volunteer3@gmail.com",
    },
  });
  let volunteerNotMatchPayload = {
    id: findVolunteerNotMatchLogin.id,
    role: findVolunteerNotMatchLogin.role,
  };
  VolunteerNotMatchToken = signPayloadToToken(volunteerNotMatchPayload);

  let Orphan2 = await Orphan.findOne({
    where: {
      email: "orphan3@gmail.com",
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
// jest.setTimeout(20000); // 1 second
describe("Match Routes Test", () => {
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

  describe("POST /match/ - create new match", () => {
    test("403 Request Failed - Volunteer Login", () => {
      return request(app)
        .post("/match/")
        .set("access_token", VolunteerToken)
        .then((result) => {
          expect(result.status).toBe(403);
          expect(result.body).toHaveProperty("message", "Forbidden");
        });
    });
  });
  describe("POST /match/ - create new match", () => {
    test("400 Request Failed - wrong JWT", () => {
      return request(app)
        .post("/match/")
        .set("access_token", "21231231")
        .then((result) => {
          expect(result.status).toBe(401);
          expect(result.body).toHaveProperty("message", "Unauthorized");
        });
    });
  });
  describe("POST /match/ - create new match", () => {
    test("401 Request Failed - No access_token", () => {
      return request(app)
        .post("/match/")
        .then((result) => {
          expect(result.status).toBe(401);
          expect(result.body).toHaveProperty("message", "Invalid Email/Password");
        });
    });
  });

  describe("POST /match/ - create new match", () => {
    test("401 Request Failed - Orphan Not Verified", () => {
      return request(app)
        .post("/match/")
        .set("access_token", OrphanNotVerifiedToken)
        .then((result) => {
          expect(result.status).toBe(401);
          expect(result.body).toHaveProperty("message", "You are not verified");
        });
    });
  });
  describe("POST /match/ - create new match", () => {
    test("401 Request Failed - Volunteer Not Verified", () => {
      return request(app)
        .post("/match/")
        .set("access_token", VolunteerNotVerifiedToken)
        .then((result) => {
          expect(result.status).toBe(401);
          expect(result.body).toHaveProperty("message", "You are not verified");
        });
    });
  });

  describe("Get /match/ - Fetch All Orphan Request", () => {
    test("200 Fetch Success ", (done) => {
      request(app)
        .get("/match/")
        .set("access_token", VolunteerToken)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(200);
          expect(body).toBeInstanceOf(Array);
          return done();
        });
    });
  });
  describe("Get /match/ - Fetch All Orphan Request", () => {
    test("400 Request Failed - Orphan Login", () => {
      return request(app)
        .get("/match/")
        .set("access_token", OrphanToken)
        .then((result) => {
          expect(result.status).toBe(403);
          expect(result.body).toHaveProperty("message", "Forbidden");
        });
    });
  });
  describe("Get /match/ - Fetch All Orphan Request", () => {
    test("401 Request Failed - Volunteer Not Verified", () => {
      return request(app)
        .get("/match/")
        .set("access_token", VolunteerNotVerifiedToken)
        .then((result) => {
          expect(result.status).toBe(401);
          expect(result.body).toHaveProperty("message", "You are not verified");
        });
    });
  });
  describe("Get /match/ - Fetch All Orphan Request", () => {
    test("401 Request Failed - Orphan Not Verified", () => {
      return request(app)
        .get("/match/")
        .set("access_token", OrphanNotVerifiedToken)
        .then((result) => {
          expect(result.status).toBe(401);
          expect(result.body).toHaveProperty("message", "You are not verified");
        });
    });
  });
  describe("Get /match/ - Fetch All Orphan Request", () => {
    test("401 Request Failed - JWT Error", () => {
      return request(app)
        .get("/match/")
        .set("access_token", "123213")
        .then((result) => {
          expect(result.status).toBe(401);
          expect(result.body).toHaveProperty("message", "Unauthorized");
        });
    });
  });
  describe("Get /match/ - Fetch All Orphan Request", () => {
    test("401 Request Failed - No Login", () => {
      return request(app)
        .get("/match/")
        .then((result) => {
          expect(result.status).toBe(401);
          expect(result.body).toHaveProperty(
            "message",
            "Invalid Email/Password"
          );
        });
    });
  });
  describe("Post /match/ - Create new match", () => {
    test("401 Request Failed - No Login", () => {
      return request(app)
        .post("/match/")
        .then((result) => {
          expect(result.status).toBe(401);
          expect(result.body).toHaveProperty(
            "message",
            "Invalid Email/Password"
          );
        });
    });
  });
  describe("PUT /match/1 - Approve a request match", () => {
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
  describe("PUT /match/:matchId - Approve a request match", () => {
    test("404 Request Failed - Not Found", () => {
      return request(app)
        .put("/match/2")
        .set("access_token", VolunteerNotMatchToken)
        .send({
          startDate: "2022-11-07",
          hour: "13:00",
        })
        .then((result) => {
          expect(result.status).toBe(404);
          expect(result.body).toHaveProperty("message", "Data Not Found");
        });
    });
  });
  describe("PUT /match/:matchId - Approve a request match", () => {
    test("404 Request Failed - hour not fill", () => {
      return request(app)
        .put("/match/1")
        .set("access_token", VolunteerNotMatchToken)
        .send({
          startDate: "2022-11-07",
        })
        .then((result) => {
          expect(result.status).toBe(404);
          expect(result.body).toHaveProperty("message", "All Field Required ");
        });
    });
  });
  describe("PUT /match/1 - Approve a request match", () => {
    test("403 Request Failed - Orphan Has Volunteer", () => {
      return request(app)
        .put("/match/1")
        .set("access_token", VolunteerNotMatchToken)
        .send({
          startDate: "2022-11-07",
          hour: "13:00",
        })
        .then((result) => {
          expect(result.status).toBe(400);
          expect(result.body).toHaveProperty(
            "message",
            "Adik already been choose by other kakak"
          );
        });
    });
  });
  describe("POST /match/ - create new match", () => {
    test("201 Request Success - should create new match", (done) => {
      request(app)
        .post("/match/")
        .set("access_token", Orphan2Token)
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
