const { Router } = require("express")
const db = require("../../database/connectDb")
const {generateToken,generateForgotPasswordToken} = require('../../middleware/jwt/create_jwt')
const handleErrors = require("../../error/errorhandler")
const router = Router();
const {sendEmail} = require("../../middleware/email/send_email");
const { sqlQuery } = require("../../database/query");
const {generateOtp} = require("../../middleware/email/create_otp")
const {hashPassword,verifyPassword} = require("../../middleware/encryption/encrypt");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { UpdatePasswordwithId, Login } = require("../../database/sqlFunctions");

router.post("/api/login",async (req,res) => {
    const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const result = await Login({email:email,password:password})

  if (result.success){
    const token = generateToken(result.UserId,result.AccessId);
    let responseObj;
    
    if(result.AccessId==1){
      responseObj = {nextPage:"/admin"}
    }
    else{
      responseObj = {nextPage: "/user"}
    }
    
    res.cookie("hrjwt",token,{httpOnly:true,maxAge:259200000});
    return res.status(200).json(responseObj);

  }

  else{
    return res.send({message:result.message}).status(result.code)
  }

});

router.get("/api/forgotpassword",async(req,res) =>{
  const emaiId = req.body.emailId;
  try{
    const [rows] = await db.promise().query(sqlQuery.selectUserIdByEmailId,[emaiId])
    if(rows.length == 0){
      throw {message:"Email Does Not Exist",code:404}
    }
    const userId = rows[0].UserID;
    const {otp,uniqueId} =  generateOtp();

    const hashOtp = await hashPassword(otp)
    await db.promise().query(sqlQuery.insertNewOtpRequest,[userId,uniqueId,hashOtp,false])


    const token = generateForgotPasswordToken(userId,uniqueId);
    
    
    
    const emailContent = {
      toEmail:req.body.emailId,
      subject:"Password Recovery",
      body:"You have raised a request to Reset Password. Use this OTP to change to your password " + otp + ". This Expires in 5 minutes."
    }
    sendEmail(emailContent);
    res.cookie("fpwd",token,{httpOnly:true,maxAge:300000})
    res.send("Email Sent Successfully").status(1000)
  }
  catch(err){
    const Error = handleErrors(err);
    res.send(Error.message).status(err.code);
  }
})


router.post("/api/resetpassword",async(req,res) =>{
  const token = req.cookies.fpwd;
  const otp = req.body.otp;
  const newPassword = req.body.newPassword;
  if(!token){
    res.send("UnAuthorised Access").status(403);
  }
  else{
    try{
    dotenv.config();

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    jwt.verify(token,jwtSecretKey, async(err,decodedToken) =>{
      if(err){
          handleErrors(err);
          res.redirect("/login");
      }
     else{

        console.log("JWT Verified");
        const uniqueId = decodedToken.transactionId;
        const userId = decodedToken.userId;
        const [rows] = await db.promise().query(sqlQuery.selectOtpbyUserIdandUniqueId,[userId,uniqueId])
        
        
        
        if(rows.length == 0){
          res.redirect("/login");
        }
        else{
          const hashedOtp = rows[0].otp;
          const result = await verifyPassword(otp,hashedOtp);
          if(result){
            
            console.log("OTP Verified Successfull");
            if(UpdatePasswordwithId({userId:userId,newPassword:newPassword})){
              res.send("Password Updated Successfully.").status(200);
            }
            else{
              res.send("Unable to Process Request now. Try Again Later")
            }

          }
          else{
            res.send("OTP does not match");
          }
        }
     }
  });
}
catch(err){
  console.log(err)
  const Error = handleErrors(err);
  res.send(Error.message).status(Error.code)
}
  }
} )
module.exports = router;