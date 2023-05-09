const { Router } = require("express");
const db = require("../../database/connectDb")
const createJWT = require('../../middleware/jwt/create_jwt')
const handleErrors = require("../../error/errorhandler")
const {requireAdminAuth} = require("../../middleware/authMiddleware/adminAuth")


const router = Router();

router.post("/api/register",requireAdminAuth,async (req,res) => {
 // Name, empid, department,role, email

  const { name, employeeid, role, department, emailId } = req.body;
  var roleID,departmentID;


  try{
    const [rows] = await db.promise().query("Select departmentID from department where departmentName=?",[department])
    departmentID = rows[0].departmentID;
  }
  catch(err){
    const Error = handleErrors(err);
    res.send(Error).status(Error.code)
  }

  try{
    const [rows] = await db.promise().query("Select roleID from role where departmentID=? and RoleName = ?",[departmentID,role])
    roleID = rows[0].roleID;

  }
  catch(err){
    const Error = handleErrors(err);
    res.send(Error).status(Error.code)
  }

  try{
    await db.promise().query("Insert into users(UserID,Name,EmailID,RoleID,DepartmentID,AccessID) values (?,?,?,?,?,?)",[employeeid,name,emailId,roleID,departmentID,0]);
    res.send({message:"Successfully create object"}).status(201);
  }
  catch(err){
    const Error = handleErrors(err);
    res.send(Error).status(Error.code)
  }

});



router.get("/api/getuserbyid",requireAdminAuth,async (req,res) => {
  const { userId } = req.body;

  try{
    const [rows] = await db.promise().query("SELECT UserID,Name,EmailID,PhoneNumber,CurrentProject,DepartmentName,RoleName FROM company_skills.users inner join company_skills.department on users.departmentID = department.departmentID inner join company_skills.role on users.roleID = role.roleID where UserID = ?",[userId]);
    res.send(rows[0]).status(200);
    }
  catch (err){
    const Error = handleErrors(err);
    res.send(Error).status(Error.code)
    }

})

router.get("/api/admindashboard",requireAdminAuth,async (req,res)=>{
  res.send("Admin Dashboard").status(200);
  try{
    const[rows] = await db.promise().query("SELECT * FROM company_skills.users inner join company_skills.department on users.departmentID = department.departmentID inner join company_skills.role on users.roleID = role.roleID ",[userId]);
    
  }
  catch (err){
    const Error = handleErrors(err);
    res.send(Error).status(Error.code)
  }
})
module.exports = router;
