const request = require(`supertest`)
const { sequelize, Donation } = require("../models")
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

  describe("Failed GET /payment/donations", () => {
    test("Should return error when hitting /payment/donations", (done) => {
      Donation.findAll = jest.fn().mockRejectedValue("Not found");
      request(app)
        .get("/payment/donations")
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

describe("POST /payment/xendit-callback", () => {
  test("200 success accepting callback from Xendit with our callback token", (done) => {
    request(app)
      .post("/payment/xendit-callback")
      .set("x-callback-token", `${process.env.XENDITCALLBACKTOKEN}`)
      .send({
        "id": "6364b998eb10cf89a9053653",
        "amount": 50000,
        "status": "PAID",
        "created": "2022-11-04T07:04:57.071Z",
        "is_high": false,
        "paid_at": "2022-11-04T07:05:09.153Z",
        "updated": "2022-11-04T07:05:13.34Z",
        "user_id": "63637944f1a1a1a981eade75",
        "currency": "IDR",
        "payment_id": "ewc_94e4603d-e39e-439b-a6f2-1048337b0b82",
        "description": "Donasi Operasional Rumah Sandar",
        "external_id": "donation-00002-1667545496097",
        "paid_amount": 50000,
        "payer_email": "dermawan@gmail.com",
        "ewallet_type": "OVO",
        "merchant_name": "Rumah Sandar",
        "on_demand_link": "donation-00002",
        "payment_method": "EWALLET",
        "payment_channel": "OVO",
        "on_demand_payload": {
          "email": "dermawan@gmail.com",
          "last_name": "Anonymous",
          "first_name": "Anonymous"
        },
        "payment_method_id": "pm-ea5affa0-6576-4572-a5d1-9ddf2afebc7e"
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Callback received!");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 receive callback with PENDING invoice", (done) => {
    request(app)
      .post("/payment/xendit-callback")
      .set("x-callback-token", `${process.env.XENDITCALLBACKTOKEN}`)
      .send({
        "id": "6364b998eb10cf89a9053653",
        "amount": 50000,
        "status": "PENDING",
        "created": "2022-11-04T07:04:57.071Z",
        "is_high": false,
        "paid_at": "2022-11-04T07:05:09.153Z",
        "updated": "2022-11-04T07:05:13.34Z",
        "user_id": "63637944f1a1a1a981eade75",
        "currency": "IDR",
        "payment_id": "ewc_94e4603d-e39e-439b-a6f2-1048337b0b82",
        "description": "Donasi Operasional Rumah Sandar",
        "external_id": "donation-00002-1667545496097",
        "paid_amount": 50000,
        "payer_email": "dermawan@gmail.com",
        "ewallet_type": "OVO",
        "merchant_name": "Rumah Sandar",
        "on_demand_link": "donation-00002",
        "payment_method": "EWALLET",
        "payment_channel": "OVO",
        "on_demand_payload": {
          "email": "dermawan@gmail.com",
          "last_name": "Anonymous",
          "first_name": "Anonymous"
        },
        "payment_method_id": "pm-ea5affa0-6576-4572-a5d1-9ddf2afebc7e"
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Callback is received but the invoice is not paid");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("403 callback received without a Xendit callback token", (done) => {
    request(app)
      .post("/payment/xendit-callback")
      .send({
        "id": "6364b998eb10cf89a9053653",
        "amount": 50000,
        "status": "PAID",
        "created": "2022-11-04T07:04:57.071Z",
        "is_high": false,
        "paid_at": "2022-11-04T07:05:09.153Z",
        "updated": "2022-11-04T07:05:13.34Z",
        "user_id": "63637944f1a1a1a981eade75",
        "currency": "IDR",
        "payment_id": "ewc_94e4603d-e39e-439b-a6f2-1048337b0b82",
        "description": "Donasi Operasional Rumah Sandar",
        "external_id": "donation-00002-1667545496097",
        "paid_amount": 50000,
        "payer_email": "dermawan@gmail.com",
        "ewallet_type": "OVO",
        "merchant_name": "Rumah Sandar",
        "on_demand_link": "donation-00002",
        "payment_method": "EWALLET",
        "payment_channel": "OVO",
        "on_demand_payload": {
          "email": "dermawan@gmail.com",
          "last_name": "Anonymous",
          "first_name": "Anonymous"
        },
        "payment_method_id": "pm-ea5affa0-6576-4572-a5d1-9ddf2afebc7e"
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(403);
        expect(body).toHaveProperty("message", "Callback is not from Xendit");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

});