const app = require("../app");
const request = require("supertest");
const { getEach7Day } = require("../helpers/getEach7Day")

const {
  Volunteer,
  Orphan,
  Orphanage,
  Match,
  Class,
  sequelize,
} = require("../models");

const { queryInterface } = sequelize;

// let volunteer = {
//   email: "volunteer@gmail.com",
//   password: 12345,
//   fullName: "Kakak Baik",
//   imageUrl: "https://res.cloudinary.com/dnp1u4pgv/image/upload/v1667652004/RumahSandar/Volunteer/Images/znaufv0kogporh1svefx.png",
//   linkedinUrl: "inilinkedin.com",
//   curriculumVitae: "https://res.cloudinary.com/dnp1u4pgv/image/upload/v1667652004/RumahSandar/Volunteer/Images/znaufv0kogporh1svefx.png",
//   lastEducation: "SMA",
//   role: "volunteer",
//   verified: true,
//   matchStatus: "alreadyMatch",
//   createdAt: new Date(),
//   updatedAt: new Date()
// }

// let orphan = {
//   email: "orphan@gmail.com",
//   password: 12345,
//   fullName: "Adik Baik",
//   imageUrl: "https://res.cloudinary.com/dnp1u4pgv/image/upload/v1667652004/RumahSandar/Volunteer/Images/znaufv0kogporh1svefx.png",
//   OrphanageId: 1,
//   verified: true,
//   role: "orphan",
//   matchStatus: "alreadyMatch",
//   createdAt: new Date(),
//   updatedAt: new Date()
// }

// let match = {
//   OrphanId: 1,
//   createdAt: new Date(),
//   updatedAt: new Date()
// }

let volunteerValidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InZvbHVudGVlciIsImlhdCI6MTY2Nzc2NzI3MX0.mL4IqQc9DpXLl47WCy2NyaHVzSRn4PgkGwHwqKhDGvw"

beforeAll((done) => {
  //! butuh hit endpoint match, pake VolunteerId
  Match.update(
    {
      VolunteerId: 1,
      startDate: new Date(),
      hour: "13:00",
      endDate: getEach7Day(new Date(), 11)
    },
    {
      where: {
        id: 1,
      }
    }
  );


})

// afterAll(() => {
//   Volunteer.destroy({ truncate: true, cascade: true, restartIdentity: true })
//     .then(() => {
//       return Orphan.destroy({
//         truncate: true,
//         cascade: true,
//         restartIdentity: true,
//       });
//     })
//     .then((_) => {
//       return Match.destroy({
//         truncate: true,
//         cascade: true,
//         restartIdentity: true,
//       });
//     })
//     .then((_) => {
//       return Class.destroy({
//         truncate: true,
//         cascade: true,
//         restartIdentity: true,
//       });
//     })
//     .catch((err) => {
//       done(err);
//     });
// });

describe("GET /match", () => {

  describe("Success attempts", () => {
    describe("Fetch all classes for the logged in user", () => {
      test("Should return status code 200", async () => {
        const response = await request(app)
          .get("/match")
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThan(0);
      });
    });
  });

  // describe("Failed attempts", () => {
  //   describe("Fetching with invalid token", () => {
  //     it("Should return status code 401", async () => {
  //       const response = await request(app)
  //         .get("/admin/volunteers")
  //         .set("access_token", invalidToken);
  //       expect(response.status).toBe(401);
  //       expect(response.body).toHaveProperty("message", "Unauthorized");
  //     });
  //   });
  // });
});