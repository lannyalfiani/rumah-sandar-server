function getEach7Day(startDate, week) {
  let nextWeek = new Date(startDate);
  nextWeek.setDate(nextWeek.getDate() + 7 * week);
  return nextWeek;
}

function bulkSchedule(matchId, startDate) {
  let schedule = [
    {
      MatchId: matchId,
      description: "This is Bahasa Indonesia Class",
      date: startDate,
      ClassCategoryId: 1,
    },
    {
      MatchId: matchId,
      description: "This is Matemathic Class",
      date: getEach7Day(startDate, 1),
      ClassCategoryId: 2,
    },
    {
      MatchId: matchId,
      description: "This is Physic Class",
      date: getEach7Day(startDate, 2),
      ClassCategoryId: 3,
    },
    {
      MatchId: matchId,
      description: "This is Pancasila Class",
      date: getEach7Day(startDate, 3),
      ClassCategoryId: 4,
    },
    {
      MatchId: matchId,
      description: "This is History Class",
      date: getEach7Day(startDate, 4),
      ClassCategoryId: 5,
    },
    {
      MatchId: matchId,
      description: "This is Culture Class",
      date: getEach7Day(startDate, 5),
      ClassCategoryId: 6,
    },
    {
      MatchId: matchId,
      description: "This is Bahasa Indonesia Class",
      date: getEach7Day(startDate, 6),
      ClassCategoryId: 1,
    },
    {
      MatchId: matchId,
      description: "This is Matemathic Class",
      date: getEach7Day(startDate, 7),
      ClassCategoryId: 2,
    },
    {
      MatchId: matchId,
      description: "This is Physic Class",
      date: getEach7Day(startDate, 8),
      ClassCategoryId: 3,
    },
    {
      MatchId: matchId,
      description: "This is Pancasila Class",
      date: getEach7Day(startDate, 9),
      ClassCategoryId: 4,
    },
    {
      MatchId: matchId,
      description: "This is History Class",
      date: getEach7Day(startDate, 10),
      ClassCategoryId: 5,
    },
    {
      MatchId: matchId,
      description: "This is Culture Class",
      date: getEach7Day(startDate, 11),
      ClassCategoryId: 6,
    },
  ];
  return schedule;
}

module.exports = { getEach7Day, bulkSchedule };
