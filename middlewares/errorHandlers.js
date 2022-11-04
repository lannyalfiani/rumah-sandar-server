function errorHandler(err, req, res, next) {
  let code = 500;
  let msg = `Internal Server Error`;
  if (err.name == "Data Not Found") {
    code = 404;
    msg = "Data Not Found";
  }

  res.status(code).json({ message: msg });
}

module.exports = errorHandler;
