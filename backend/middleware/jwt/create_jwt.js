const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");



function generatetoken(id){
    dotenv.config()
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    data = {
        userId:id,
        time:Date()
    }

    const token = jwt.sign(data,jwtSecretKey,{expiresIn:259200})
    return token
}


module.exports.generateToken = generatetoken;
