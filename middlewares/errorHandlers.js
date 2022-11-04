function errorHandler(err, req, res, next) {
  console.log(err);
  let code = 500
  let msg = `Internal Server Error`
  if(err.name === "required"){
    code = 400,
    msg = "All Field Required "
  } else if(err.name === "Invalid Email/Password"){
    code = 401,
    msg = "Invalid Email/Password"
  } else if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = err.errors[0].message;
  }else if (err.name === `INVOICE_NOT_PAID`) {
    code = 401
    msg = `Callback is received but the invoice is not paid`
  } else if (err.name === "Invalid Email/Password") {
    code = 401,
      msg = "Invalid Email/Password"
  } else if (err.name === `INVOICE_NOT_PAID`) {
    code = 401
    msg = `Callback is received but the invoice is not paid`
  } else if (err.name == "Data Not Found") {
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
