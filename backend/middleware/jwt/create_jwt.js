const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");



function generatetoken(userID,authID){
    dotenv.config()
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    data = {
        userId:userID,
        authId:authID,
        time:Date()
    }

    const token = jwt.sign(data,jwtSecretKey,{expiresIn:259200})
    return token
}

const generateForgotPasswordToken = (userID,transactionId) =>{
    
    dotenv.config();
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    const data = {
        userId:userID,
        transactionId:transactionId,
        time:Date()
    }

    const token = jwt.sign(data,jwtSecretKey,{expiresIn:300})
    return token
}

module.exports.generateForgotPasswordToken = generateForgotPasswordToken;
module.exports.generateToken = generatetoken;
