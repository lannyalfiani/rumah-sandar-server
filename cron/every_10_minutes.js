const { Op } = require("sequelize");
const main = require("../helpers/nodemailer");
let { Match, Orphan, Volunteer, Class, ClassCategory } = require("../models");
const CronJob = require("cron").CronJob;
// cron jangan lupa di require di appjs
let job = new CronJob(
  // sec, minute, hour, day of month, month, day of week
  "* * */23 * * *",
  async function () {
    console.log("tes")
    let today = new Date();
    let tesEndDay = new Date("2023-01-21 08:00:00.000 +0700");
    let AllMatch = await Match.findAll({
      where: {
        endDate: {
          [Op.not]: null,
        },
      },
    });
    AllMatch.forEach((element) => {
      if (element.endDate < today) {
        Volunteer.update(
          {
            matchStatus: "notMatch",
          },
          {
            where: { id: element.VolunteerId },
          }
        );
        Orphan.update(
          {
            matchStatus: "notMatch",
          },
          {
            where: { id: element.OrphanId },
          }
        );
      }
    });
    let AllClass = await Class.findAll({
      include: [
        {
          model: Match,
          include: [Orphan, Volunteer],
        },
        { model: ClassCategory },
      ],
    });
    AllClass.forEach((element) => {
      let OneDayBefore = new Date(element.date);
      OneDayBefore.setDate(element.date.getDate() - 1);
      if (OneDayBefore < today && today < element.date) {
        console.log(element.date);
        console.log(today);
        console.log(OneDayBefore);
        let message = `Jangan Lupa pada tanggal ${element.date} terdapat mata pembelajaran : ${element.ClassCategory.name} mohon untuk dapat hadir`;
        main(element.Match.Orphan.email, "Schedule-Orphan", message);
        main(element.Match.Volunteer.email, "Schedule-Volunteer", message);
        console.log();
      }
    });
  }
);
// Use this if the 4th param is default value(false)
job.start();
module.exports = job
