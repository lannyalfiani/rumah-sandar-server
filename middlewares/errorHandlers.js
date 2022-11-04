function errorHandler(err, req, res, next) {
  let code = 500;
  let msg = `Internal Server Error`;
  if (err.name == "Data Not Found") {
    code = 404;
    msg = "Data Not Found";
  } else if (err.name == "Adik already been choose by other kakak") {
    code = 400;
    msg = "Adik already been choose by other kakak";
  } else if (err.name == "Kakak already has Adik") {
    code = 400;
    msg = "Kakak already has Adik";
  }

  res.status(code).json({ message: msg });
}

module.exports = errorHandler;
