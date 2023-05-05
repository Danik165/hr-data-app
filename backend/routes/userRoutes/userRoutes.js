const { Router } = require("express")
const { requireAuth } = require("../../middleware/authMiddleware");


const router = Router();


router.get("/user",requireAuth,(req,res) => {
    console.log(req.decodedToken);
    res.send("User DashBoard Page").status(200);
})


module.exports = router;