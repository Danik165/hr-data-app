

const handleErrors = (err) => {

    //console.log("Error Code:",err.code)
    //console.log("Error Message: ",err.message)
    var Error ={
        code:400,
        message:err.message
    };

    if(err.code == "ECONNREFUSED")  // Database connection Error
    {
        Error.message = "Database connection refused, check the database configuration ";
        console.log(Error.message)
    }
    else if(err.code == "ER_DUP_ENTRY")
    {   
        Error.message = "Employee Already exist with the given employee Id";
        console.log(Error.message);
    }

    return Error;
}


module.exports = handleErrors;