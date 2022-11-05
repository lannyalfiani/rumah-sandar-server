const { Op } = require("sequelize");
let { Match, Orphan, Volunteer, Class, ClassCategory } = require("../models");
const CronJob = require("cron").CronJob;
let job = new CronJob(
  // sec, minute, hour, day of month, month, day of week
  "*/5 * * * * *",
  async function () {
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
      if (element.endDate < tesEndDay) {
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
        console.log(
          `Ada kelas kelompok : ${element.MatchId} dengan mata pembelajaran : ${element.ClassCategory.name} dikirim ke email orphan : ${element.Match.Orphan.email} dan dikirim ke email volunteer : ${element.Match.Volunteer.email}`
        );
      }
    });
  }
);
// Use this if the 4th param is default value(false)
// job.start();
