const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require("path")
const { requireUserAuth } = require("./middleware/authMiddleware/userAuth")
const { requireAdminAuth } =require("./middleware/authMiddleware/adminAuth")
const authRoutes = require("./routes/auth/authRoutes")
const userRoutes = require("./routes/user/userRoutes")
const adminRoutes = require("./routes/admin/adminRoutes")


const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());


app.use(authRoutes);
app.use(userRoutes);
app.use(adminRoutes);

app.use(express.static(path.join(__dirname,"..","frontend/build")))

const PORT = process.env.PORT || 5000;




// app.get('/', (req, res) => {
//   res.send('Hello from your backend server.');
// });



// app.get("/userDashBoard",requireAuth,(req,res) => {

//   res.send("User DashBoard Page").status(200);

// })


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});