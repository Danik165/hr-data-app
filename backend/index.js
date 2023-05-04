const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const createJWT = require('./middleware/jwt/create_jwt')
const cookieParser = require('cookie-parser')
const authRoutes = require("./routes/authRoutes")
const db = require('./database/connectDb');
const app = express();
const { requireAuth } = require("./middleware/authMiddleware")



app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);


const PORT = process.env.PORT || 5000;




app.get('/', (req, res) => {
  res.send('Hello from your backend server.');
});



app.get("/userDashBoard",requireAuth,(req,res) => {
  const token  = req.cookies.hrjwt;
  res.send("User DashBoard Page").status(200);

})

// app.post("/generatetoken", (req,res) => {
//   const { id } = req.body;
//   const token = createJWT.generatetoken(id);
//   res.cookie("hr-jwt",token,{httpOnly:true, expires:  2000})
//   res.send("Successful").status(200)
  
// })

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});