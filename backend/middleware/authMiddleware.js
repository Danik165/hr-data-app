const jwt = require("jsonwebtoken");

const requireAuth = (req,res,next) =>{
    const token = req.cookies.hrjwt

    if(token){
        console.log("Token Available")
        jwt.verify(token,"fdajfldnafkdlaf",(err,decodedToken) => {
            if(err){
                console.log(err)
                res.redirect("/login");
            }
            else{
                console.log(decodedToken);
                next();
            }
        })
    }
    else{
        res.redirect('/login');
    }
}


module.exports = { requireAuth };