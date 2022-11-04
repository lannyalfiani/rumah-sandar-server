function errorHandler(err, req, res, next) {
  let code = 500
  let msg = `Internal Server Error`
  if(err.name === "required"){
    code = 404,
    msg = "All Field Required "
  } else if(err.name === "Invalid Email/Password"){
    code = 401,
    msg = "Invalid Email/Password"
  }



  if (err.name === `INVOICE_NOT_PAID`) {
    code = 401
    msg = `Callback is received but the invoice is not paid`
  }

  res.status(code).json({ message: msg })
}

module.exports = errorHandler;