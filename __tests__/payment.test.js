const request = require(`supertest`)
const { sequelize } = require("../models")
const { queryInterface } = sequelize
const app = require("../app")





let DonationTestData = require("../data/donations.json").map(el => {
  let future = new Date()
  el.createdAt = new Date()
  el.updatedAt = new Date()
  el.validUntil = new Date(future.setDate(future.getDate() + 30))
  return el
})

beforeAll(async () => {
  await queryInterface.bulkInsert(`Donations`, DonationTestData, {})
})

afterAll(async () => {
  await queryInterface.bulkDelete(`Donations`, null,
    {
      truncate: true,
      restartIdentity: true,
      cascade: true
    })
})

describe("GET /payment/donations", () => {
  test("200 success get donations", (done) => {
    request(app)
      .get("/payment/donations")
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