const { Router, json } = require("express")
const { requireUserAuth } = require("../../middleware/authMiddleware/userAuth");
const db = require("../../database/connectDb");
const handleErrors = require("../../error/errorhandler");
const {sqlQuery} = require("../../database/query")

const router = Router();



router.post("/api/addSkill",async (req,res) =>{

})


router.get("/api/userprofile",requireUserAuth,async (req,res)=>{
    const userId = req.decodedToken.userId;
    try{
        const [rows] = await db.promise().query(sqlQuery.selectUserById,[userId]);
        res.send(rows[0]).status(201);
    }
    catch (err){
        handleErrors(err);
    }
})

module.exports = router;