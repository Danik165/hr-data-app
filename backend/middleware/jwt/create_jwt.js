const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");





// let data = {
//     name: "ABC",
//     time:Date(),
//     id:1
// }



// console.log(token)

//console.log(process.env.PORT)

function verifyToken(token){
    dotenv.config()
    const jwtSecretKey = process.env.JWT_SECRET_KEY
    jwt.verify(token,jwtSecretKey,(err,decodedToken) => {
        if(err){
            console.log("Error in Verification",err)
        }
        else{
            const { exp } = decodedToken;
            //console.log(decodedToken.getExpiresAt())
            console.log(exp)
            console.log(Date.now())
            if ( Date.now() > exp *100)
            {
                console.log("Expired")
            }

            //return (decodedToken)
        }
    })
}

function generatetoken(id){
    dotenv.config()
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    data = {
        userId:id,
        time:Date()
    }

    const token = jwt.sign(data,jwtSecretKey,{expiresIn:2})
    return token
}


module.exports.generateToken = generatetoken;
module.exports.verifyToken = verifyToken;