

const handleErrors = (err) => {

    console.log("Error Code:",err.code)
    console.log("Error Message: ",err.message)


    if(err.code == "ECONNREFUSED")  // Database connection Error
    {
        console.log("Database connection refused, check the database configuration ")
    }
    

}


module.exports = handleErrors;