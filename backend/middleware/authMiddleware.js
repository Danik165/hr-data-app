const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');


const requireAuth = (req,res,next) =>{

    dotenv.config()
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = req.cookies.hrjwt

    if(token){
        console.log("Token Available")
        jwt.verify(token,jwtSecretKey,(err,decodedToken) => {
            if(err){
                console.log(err)
                res.redirect("/login");
            }
            else{
                next();
            }
        })
    }
    else{
        res.redirect('/login');
    }
}


module.exports = { requireAuth };