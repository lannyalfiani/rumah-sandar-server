const { bulkSchedule } = require("./helpers/getEach7Day");

let data = bulkSchedule(1, new Date());
console.table(data);
