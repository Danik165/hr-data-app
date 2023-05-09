const { Router, json } = require("express")
const { requireUserAuth } = require("../../middleware/authMiddleware/userAuth");
const db = require("../../database/connectDb");
const handleErrors = require("../../error/errorhandler");

const router = Router();


// router.get("/user",requireUserAuth,(req,res) => {
//     const responseBody = {
//         message:"User Dashboard Page",
//         id:12,
//         userPage:true
//     }
//     const jsonContent  = JSON.stringify(responseBody);
//     res.set({
//         'Content-Type':'application/json'
//     }).send(jsonContent).status(200);
// })



router.get("/getUser",requireUserAuth,async (req,res)=>{
    const userId = req.decodedToken.userId;
    try{
        const [rows] = await db.promise().query("SELECT UserID,Name,EmailID,PhoneNumber,CurrentProject,DepartmentName,RoleName FROM company_skills.users inner join company_skills.department on users.departmentID = department.departmentID inner join company_skills.role on users.roleID = role.roleID where UserID = ?",[userId]);
        
        console.log(rows[0]);
        res.send(rows[0]).status(200);
    }
    catch (err){
        handleErrors(err);
    }
})

module.exports = router;