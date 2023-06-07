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
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname,'..','frontend/build', 'index.html'));
});

const PORT =  83;



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});