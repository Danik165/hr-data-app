const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");





// let data = {
//     name: "ABC",
//     time:Date(),
//     id:1
// }



// console.log(token)

// jwt.verify(token+ "ads",jwtSecretKey,(err,decodedToken) => {
//     if(err){
//         console.log("Error in Verification",err)
//     }
//     else{

//         console.log(decodedToken)
//     }
// })
//console.log(process.env.PORT)


function generatetoken(id){
    dotenv.config()
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    data = {
        id:id,
        time:Date()
    }

    const token = jwt.sign(data,jwtSecretKey)
    return token
}


module.exports.generatetoken = generatetoken;