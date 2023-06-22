const handleErrors = (err) => {
  var Error = {
    code: 400,
    message: err.message,
  };

  if (err.code == "ECONNREFUSED") {
    // Database connection Error
    Error.code = 500;
    Error.message =
      "Database connection refused, check the database configuration ";
    console.log(Error.message);
  } else if (err.code == "ER_DUP_ENTRY") {
    Error.message = "Employee Already exist";
    console.log(Error.message);
  }

  return Error;
};

module.exports = handleErrors;
