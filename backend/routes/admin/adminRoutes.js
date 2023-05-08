const { Router } = require("express");
const db = require("../../database/connectDb")
const createJWT = require('../../middleware/jwt/create_jwt')
const handleErrors = require("../../error/errorhandler")
const {requireAdminAuth} = require("../../middleware/authMiddleware/adminAuth")


const router = Router();

router.post("/register",requireAdminAuth,async (req,res) => {
  //   const { email, password } = req.body;

  // if (!email || !password) {
  //   return res.status(400).json({ error: 'Email and password are required.' });
  // }

  // try {
    
  //   const [rows] = await db.promise().query('SELECT * FROM users WHERE EmailID = ?', [email]);
  //   if (rows.length > 0) {
  //     return res.status(400).json({ error: 'Email is already registered.' });
  //   }

  //   const [result] = await db.promise().query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
  //   res.status(201).json({ message: 'User registered successfully.' });
  // } 
  // catch (err) {
  //   //console.log(err)
  //   handleErrors(err);
  //   res.status(500).json({ error: 'Failed to register user. Please try again.' });
  // }


  res.send("Admin Call Successful").status(200);
});


module.exports = router;
