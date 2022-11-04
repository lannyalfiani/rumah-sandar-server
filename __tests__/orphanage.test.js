const request = require(`supertest`)
const { Orphanage, sequelize } = require('../models')
const app = require("../app")
const { queryInterface } = sequelize



const OrphanagesData = require('../data/orphanages.json')

beforeAll(async () => {
    await queryInterface.bulkInsert(`Orphanages`, OrphanagesData, {})
  })
  
  afterAll(async () => {
    await queryInterface.bulkDelete(`Orphanages`, null,
      {
        truncate: true,
        restartIdentity: true,
        cascade: true
      })
  })




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
  });