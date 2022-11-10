function errorHandler(err, req, res, next) {
  console.log(err, `<<< err handler`);
  let code = 500;
  let msg = `Internal Server Error`;
  if (err.name === "required") {
    code = 401;
    msg = "All Field Required ";
  } else if (err.name === "Invalid Email/Password") {
    console.log(err)
    code = 401;
    msg = "Invalid Email/Password";
  } else if (err.name === `INVOICE_NOT_PAID`) {
    code = 401;
    msg = `Callback is received but the invoice is not paid`;
  } else if (err.name === `NOT_FROM_XENDIT`) {
    code = 403;
    msg = `Callback is not from Xendit`;
  } else if (err.name == "Not Found") {
    code = 404;
    msg = "Data Not Found";
  } else if (err.name == "Adik already been choose by other kakak") {
    code = 400;
    msg = "Adik already been choose by other kakak";
  } else if (err.name == "SequelizeValidationError") {
    code = 400;
    msg = err.errors[0].message;
  } else if (err.name == "Forbidden") {
    code = 403;
    msg = "Forbidden";
  } else if (err.name == "SequelizeUniqueConstraintError") {
    code = 400;
    msg = "email already been used";
  } else if (err.name == "You are not verified") {
    code = 401;
    msg = "You are not verified";
  } else if (err.name === "JsonWebTokenError") {
    code = 401;
    msg = "Unauthorized";
  } else if (err.name === `Upload file failed`) {
    code = 422
    msg = "Uploading file failed"
  }

  res.status(code).json({ message: msg });
}

module.exports = errorHandler;
