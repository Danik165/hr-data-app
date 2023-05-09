const { Router } = require("express")
const db = require("../../database/connectDb")
const createJWT = require('../../middleware/jwt/create_jwt')
const handleErrors = require("../../error/errorhandler")
const router = Router();





router.post("/login",async (req,res) => {
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
       responseObj = {nextPage:"/admindashboard"}
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



module.exports = router;