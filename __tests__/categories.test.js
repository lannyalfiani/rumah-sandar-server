const app = require("../app");
const request = require("supertest");
const {
  ClassCategory, Admin,
  sequelize,
} = require("../models");
const { signPayloadToToken } = require("../helpers/helpers");
const { queryInterface } = sequelize;

let validToken, invalidToken
const admin = {
  email: "lanny@mail.com",
  password: "123456",
  role: "admin",
};


let dataCategories = require("../data/classCategory.json").map((el) => {
  el.createdAt = el.updatedAt = new Date()
  return el
})

beforeAll((done) => {
  Admin.create(admin)
    .then((adminRegist) => {
      validToken = signPayloadToToken({
        id: adminRegist.id,
        email: adminRegist.email,
      });
      invalidToken = "invalid";
      return queryInterface.bulkInsert("ClassCategories", dataCategories);
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  Admin.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then((_) => {
      return ClassCategory.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true,
      });
    })
    .then((_) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("GET /categories", () => {
  describe("Success attempts", () => {
    describe("Fetching with valid token", () => {
      it("Should return status code 200", async () => {
        const response = await request(app)
          .get("/categories")
          .set("access_token", validToken);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Failed attempts", () => {
    describe("Fetching with invalid token", () => {
      it("Should return status code 401", async () => {
        const response = await request(app)
          .get("/categories")
          .set("access_token", invalidToken);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "Unauthorized");
      });
    });
  });

  //! paksa jadi error
  describe("Failed to fetch categories", () => {
    test("Should return error when hit /categories", (done) => {
      ClassCategory.findAll = jest.fn().mockRejectedValue("Not found");
      request(app)
        .get("/categories")
        .set("access_token", validToken)
        .then((res) => {
          expect(res.status).toBe(500);

          expect(res.body).toHaveProperty("message", "Internal Server Error");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  })
});
