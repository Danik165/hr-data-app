const { Router } = require("express")
const db = require("../../database/connectDb")
const {generateForgotPasswordToken} = require('../../middleware/jwt/create_jwt')
const handleErrors = require("../../error/errorhandler")
const router = Router();
const {sendEmail} = require("../../middleware/email/send_email");
const { sqlQuery } = require("../../database/query");
const {generateOtp} = require("../../middleware/email/create_otp")



router.post("/api/login",async (req,res) => {
    const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const [rows] = await db.promise().query('SELECT * FROM users WHERE EmailID = ? AND Password = ?', [email, password]);

    if (rows.length > 0) {
      const token = createJWT.generateToken(rows[0].UserID,rows[0].AccessID);
      res.cookie("hrjwt",token,{httpOnly:true,maxAge:259200000});
      let responseObj;
      if(rows[0].AccessID==1){
       responseObj = {nextPage:"/admin"}
      }
      else{
       responseObj = {nextPage: "/user"}
      }
      res.status(200).json(responseObj);
    } else {
      res.status(401).json({ error: 'Invalid email or password.' });
    }
  } catch (err) {
    handleErrors(err);
    res.status(500).json({ error: 'Failed to log in. Please try again.' });
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
    const {otp,uniqueId} = generateOtp();

    await db.promise().query(sqlQuery.insertNewOtpRequest,[userId,uniqueId,otp,false])

    const token = generateForgotPasswordToken(userId,uniqueId);
    
    
    
    const emailContent = {
      toEmail:req.body.emailId,
      subject:"Password Recovery",
      body:"You have raised a request to Reset Password. Use this OTP to change to your password " + otp + ". This Expires in 5 minutes."
    }
    //sendEmail(emailContent);
    res.cookie("fpwd",token,{httpOnly:true,maxAge:300000})
    res.send("Email Sent Successfully").status(1000)
  }
  catch(err){
    const Error = handleErrors(err);
    res.send(Error.message).status(err.code);
  }
})


router.post("/api/resetpassword",async(req,res) =>{
  
} )
module.exports = router;