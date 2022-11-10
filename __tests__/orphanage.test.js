const request = require(`supertest`);
const { Orphanage, sequelize } = require("../models");
const app = require("../app");
const { queryInterface } = sequelize;

const OrphanagesData = require("../data/orphanages.json").map((el) => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
  return el;
});

beforeAll(async () => {
  await queryInterface.bulkInsert(`Orphanages`, OrphanagesData, {});
});

afterAll(async () => {
  await queryInterface.bulkDelete(`Orphanages`, null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("GET /orphanages", () => {
  test("200 success get orphanages", (done) => {
    request(app)
      .get("/orphanages")
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBeGreaterThan(0);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  describe("Failed to fetch orphanages", () => {
    test("Should return error when hittig /orphanages", (done) => {
      Orphanage.findAll = jest.fn().mockRejectedValue("Not found");
      request(app)
        .get("/orphanages")
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
