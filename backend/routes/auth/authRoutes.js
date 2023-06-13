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
    return res.status(400).send({ success:false,message: 'Email and password are required.' });
  }

  const result = await Login({email:email,password:password})

  if (result.success){
    const token = generateToken(result.UserId,result.AccessId);
    let responseObj;
    
    if(result.AccessId==1){
      responseObj = {nextPage:"/admin"}
    }
    else{
      console.log(result)
      responseObj = {nextPage: "/"}
    }
    
    res.cookie("hrjwt",token,{httpOnly:true,maxAge:259200000});
    return res.status(200).json(responseObj);

  }

  else{
    return res.status(400).send({success:false,message:result.message})
  }

});

router.get("/api/forgotpassword",async(req,res) =>{
  console.log(req.query.emailId)
  const emaiId = req.query.emailId;
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
      toEmail:emaiId,
      subject:"Password Recovery - Skill Matrix",
      body:"You have raised a request to Reset Password. Use this OTP to change to your password \n" + otp + ".\n This Expires in 10 minutes."
    }
    sendEmail(emailContent);
    res.cookie("fpwd",token,{httpOnly:true,maxAge:600000})
    res.status(200).send({message:"Email Sent Successfully"})
  }
  catch(err){
    const Error = handleErrors(err);
    res.status(err.code).send(Error);
  }
})


router.post("/api/resetpassword",async(req,res) =>{
  const token = req.cookies.fpwd;
  const otp = req.body.otp;
  const newPassword = req.body.newPassword;
  if(!token){
    res.status(403).send({message:"UnAuthorised Access"});
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
      
            if(UpdatePasswordwithId({userId:userId,newPassword:newPassword})){
              
              db.promise().query(sqlQuery.setOTPTransactionSuccess,[1,uniqueId])
              res.status(200).send({message:"Password Updated Successfully."});
            }
            else{
              res.status(500).send({message:"Unable to Process Request now. Try Again Later"})
            }

          }
          else{
            res.status(400).send({message:"OTP does not match"});
          }
        }
     }
  });
}
catch(err){
  console.log(err)
  const Error = handleErrors(err);
  res.status(Error.code).send(Error)
}
  }
} )



router.get("/api/logout",async(req,res) =>{
  
  res.cookie('hrjwt', 'none', {
              expires: new Date(Date.now() + 5 * 1000),
              httpOnly: true,
            })
  res.status(200).send({ success: true, message: 'User logged out successfully' })
})
module.exports = router;
