const { Router } = require("express")
const { requireUserAuth } = require("../../middleware/authMiddleware/userAuth");
const db = require("../../database/connectDb");
const handleErrors = require("../../error/errorhandler");

const router = Router();


router.get("/user",requireUserAuth,(req,res) => {
    console.log(req.decodedToken);
    res.send("User DashBoard Page").status(200);
})


router.get("/getUser",requireUserAuth,async (req,res)=>{
    console.log(req.decodedToken);
    const userId = req.decodedToken.userId;
    try{
        const [rows] = await db.promise().query("SELECT UserID,Name,EmailID,PhoneNumber,CurrentProject,DepartmentName,RoleName FROM company_skills.users inner join company_skills.department on users.departmentID = department.departmentID inner join company_skills.role on users.roleID = role.roleID where UserID = ?",[userId]);
        
        console.log(rows[0]);
        res.send(rows[0]).status(200);
    }
    catch (err){
        handleErrors(err);
    }
    // res.status(200).send("Get User Successful");
})

module.exports = router;