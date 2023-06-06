const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');


const requireUserAuth = (req,res,next) =>{

    dotenv.config()
    if(process.env.Development == 'true'){
    return next();

    }

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = req.cookies.hrjwt

    if(token){
        jwt.verify(token,jwtSecretKey,(err,decodedToken) => {
            if(err){
                handleErrors(err)
                res.redirect("/");
            }
            else{
                req.decodedToken = decodedToken;
                next();
            }
        })
    }
    else{
        res.redirect('/login');
    }
};

module.exports = { requireUserAuth };