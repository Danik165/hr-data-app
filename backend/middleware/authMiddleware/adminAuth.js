const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const handleErrors = require("../../error/errorhandler")


const requireAdminAuth = (req,res,next) =>{
    
    dotenv.config();

    if(process.env.Development == 'true'){
    return next();

    }
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = req.cookies.hrjwt;


    if(token){
        jwt.verify(token,jwtSecretKey, (err,decodedToken) =>{
            if(err){
                const Error = handleErrors(err);
                res.status(Error.code).redirect("/");
            }
            else if(decodedToken.authId != 1){
                console.log("UnAuthorised Access");
                res.status(403).send("Access Forbidden").redirect("/login");
            }
            else{
                req.decodedToken = decodedToken;
                next();
            }
        });
    }
    else{
        res.redirect("/login");
    }

};


module.exports = { requireAdminAuth };