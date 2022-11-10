function getEach7Day(startDate, week) {
  let nextWeek = new Date(startDate);
  nextWeek.setDate(nextWeek.getDate() + 7 * week);
  return nextWeek;
}

function bulkSchedule(matchId, startDate) {
  let schedule = [
    {
      MatchId: matchId,
      description: "Pelajaran Bahasa Indonesia diberikan sejak kelas 1 SD hingga kelas XII atau kelas 3 SMA kepada para siswa",
      date: startDate,
      ClassCategoryId: 1,
    },
    {
      MatchId: matchId,
      description: "Matematika (dari bahasa Yunani Kuno μάθημα (máthēma), berarti pengetahuan, pemikiran, pengkajian, pembelajaran), adalah bidang ilmu, yang mencakup studi tentang topik-topik seperti bilangan (aritmetika dan teori bilangan).",
      date: getEach7Day(startDate, 1),
      ClassCategoryId: 2,
    },
    {
      MatchId: matchId,
      description: "Ilmu pengetahuan dimana didalamnya mempelajari tentang sifat dan fenomena alam atau gejala alam dan seluruh interaksi yang terjadi didalamnya",
      date: getEach7Day(startDate, 2),
      ClassCategoryId: 3,
    },
    {
      MatchId: matchId,
      description: "Pancasila adalah pilar ideologis negara Indonesia. Nama ini terdiri dari dua kata dari bahasa Sanskerta: पञ्च pañca berarti lima dan शीला śīla berarti prinsip atau asas",
      date: getEach7Day(startDate, 3),
      ClassCategoryId: 4,
    },
    {
      MatchId: matchId,
      description: "Sejarah yaitu ilmu yang menyelidiki perkembangan-perkembangan mengenai peristiwa dan kejadian di masa lampau. Sejarah merupakan kejadian dan peristiwa yang berhubungan dengan manusia, yang menyangkut perubahan nyata di dalam kehidupan manusia",
      date: getEach7Day(startDate, 4),
      ClassCategoryId: 5,
    },
    {
      MatchId: matchId,
      description: "Pendidikan seni budaya memuat segala aspek kehidupan sesuai dengan susunan kata yang mengandung seni dan budaya. Di berbagai tingkatan sekolah, Mata Pelajaran Seni dan Budaya, merupakan pendidikan untuk menanamkan nilai-nilai keindahan yang terkandung dalam seni berbasis budaya.",
      date: getEach7Day(startDate, 5),
      ClassCategoryId: 6,
    },
    {
      MatchId: matchId,
      description: "Pelajaran Bahasa Indonesia diberikan sejak kelas 1 SD hingga kelas XII atau kelas 3 SMA kepada para siswa",
      date: getEach7Day(startDate, 6),
      ClassCategoryId: 1,
    },
    {
      MatchId: matchId,
      description: "Matematika (dari bahasa Yunani Kuno μάθημα (máthēma), berarti pengetahuan, pemikiran, pengkajian, pembelajaran), adalah bidang ilmu, yang mencakup studi tentang topik-topik seperti bilangan (aritmetika dan teori bilangan).",
      date: getEach7Day(startDate, 7),
      ClassCategoryId: 2,
    },
    {
      MatchId: matchId,
      description: "Ilmu pengetahuan dimana didalamnya mempelajari tentang sifat dan fenomena alam atau gejala alam dan seluruh interaksi yang terjadi didalamnya",
      date: getEach7Day(startDate, 8),
      ClassCategoryId: 3,
    },
    {
      MatchId: matchId,
      description: "Pancasila adalah pilar ideologis negara Indonesia. Nama ini terdiri dari dua kata dari bahasa Sanskerta: पञ्च pañca berarti lima dan शीला śīla berarti prinsip atau asas",
      date: getEach7Day(startDate, 9),
      ClassCategoryId: 4,
    },
    {
      MatchId: matchId,
      description: "Sejarah yaitu ilmu yang menyelidiki perkembangan-perkembangan mengenai peristiwa dan kejadian di masa lampau. Sejarah merupakan kejadian dan peristiwa yang berhubungan dengan manusia, yang menyangkut perubahan nyata di dalam kehidupan manusia",
      date: getEach7Day(startDate, 10),
      ClassCategoryId: 5,
    },
    {
      MatchId: matchId,
      description: "Pendidikan seni budaya memuat segala aspek kehidupan sesuai dengan susunan kata yang mengandung seni dan budaya. Di berbagai tingkatan sekolah, Mata Pelajaran Seni dan Budaya, merupakan pendidikan untuk menanamkan nilai-nilai keindahan yang terkandung dalam seni berbasis budaya.",
      date: getEach7Day(startDate, 11),
      ClassCategoryId: 6,
    },
  ];
  return schedule;
}

module.exports = { getEach7Day, bulkSchedule };
