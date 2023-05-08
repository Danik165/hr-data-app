const { Router } = require("express")
const { requireUserAuth } = require("../../middleware/authMiddleware/userAuth");


const router = Router();


router.get("/user",requireUserAuth,(req,res) => {
    console.log(req.decodedToken);
    res.send("User DashBoard Page").status(200);
})


module.exports = router;