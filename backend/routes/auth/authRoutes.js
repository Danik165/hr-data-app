const { Router } = require("express")
const db = require("../../database/connectDb")
const createJWT = require('../../middleware/jwt/create_jwt')
const handleErrors = require("../../error/errorhandler")
const router = Router();
const {sendEmail} = require("../../middleware/email/sendEmail");
const { sqlQuery } = require("../../database/query");




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
    const emailContent = {
      toEmail:req.body.emailId,
      subject:"Password Recovery",
      body:"You have raised a request to Reset Password"
    }
    sendEmail(emailContent);
    res.send("Email Sent Successfully").status(1000)
  }
  catch(err){
    const Error = handleErrors(err);
    res.send(Error.message).status(err.code);
  }
})

module.exports = router;