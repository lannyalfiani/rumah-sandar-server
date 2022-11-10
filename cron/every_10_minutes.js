const { Op } = require("sequelize");
const dayjs = require("dayjs");
const nodeMailer = require("../helpers/nodemailer");
let { Match, Orphan, Volunteer, Class, ClassCategory } = require("../models");
const CronJob = require("cron").CronJob;
// cron jangan lupa di require di appjs



let jobTask = async () => {
  let today = new Date();
  let tesEndDay = new Date("2023-01-21 08:00:00.000 +0700");
  // jobTask nanti di imporot di file test
  // mocking semua function dan hasil returnnya untuk func2 yang dipanggil
  // termasuk nodemailer di mocking
  // check apakah setiap function yang di mocking terpanggil menggunakan toHaveBeenCalled https://jestjs.io/docs/expect#tohavebeencalled
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
      let dateFormat = dayjs(element.date).format("DD/MM/YYYY");
      let message = `Jangan Lupa pada tanggal ${dateFormat} terdapat mata pembelajaran : ${element.ClassCategory.name} mohon untuk dapat hadir`;
      nodeMailer(element.Match.Orphan.email, "Jadwal Adik Ajar", message);
      nodeMailer(element.Match.Volunteer.email, "Jadwal Kakak Ajar", message);
    }
  });
  return "completed"
}
let job = new CronJob(
  // sec, minute, hour, day of month, month, day of week
  " 0 6 * * *",
  jobTask

);
// Use this if the 4th param is default value(false)

module.exports = { job, jobTask };
