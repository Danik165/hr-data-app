const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');



const requireAdminAuth = (req,res,next) =>{
    
    dotenv.config();

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = req.cookies.hrjwt;


    if(token){
        jwt.verify(token,jwtSecretKey, (err,decodedToken) =>{
            if(err){
                handleErrors(err);
                res.redirect("/");
            }
            else if(decodedToken.authId != 1){
                console.log("UnAuthorised Access");
                res.status(403).send("Access Forbidden");
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