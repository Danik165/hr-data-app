const { Router } = require("express");
const db = require("../../database/connectDb")
const createJWT = require('../../middleware/jwt/create_jwt')
const handleErrors = require("../../error/errorhandler")
const {requireAdminAuth} = require("../../middleware/authMiddleware/adminAuth")
const {sqlQuery} = require("../../database/query");

const router = Router();

router.post("/api/register",async (req,res) => {
  

  const { name, employeeId, role, department, emailId } = req.body;
  var roleID,departmentID;


  try{
    let [rows] = await db.promise().query(sqlQuery.selectDepartmentIdByName,[department])
    departmentID = rows[0].DepartmentID;


    [rows] = await db.promise().query(sqlQuery.selectRoleIdByDepartmentIdandRoleName,[departmentID,role])
    roleID = rows[0].roleID;

 
    await db.promise().query(sqlQuery.insertNewUser,[employeeId,name,emailId,roleID,departmentID,0]);
    res.send({message:"Successfully create object"}).status(201);
  }
  catch(err){
    const Error = handleErrors(err);
    res.send(Error.message).status(Error.code)
  }

});



router.get("/api/userbyid",requireAdminAuth,async (req,res) => {
  
  try{
    const { userId } = req.body;
    const [rows] = await db.promise().query(sqlQuery.selectUserById,[userId]);
    res.send(rows[0]).status(200);
    }
  catch (err){
    const Error = handleErrors(err);
    res.send(Error).status(Error.code)
    }

})

router.get("/api/admindashboard",requireAdminAuth,async (req,res)=>{
  try{
    const[rows] = await db.promise().query("SELECT * FROM company_skills.users inner join company_skills.department on users.departmentID = department.departmentID inner join company_skills.role on users.roleID = role.roleID ",[userId]);
    
  }
  catch (err){
    const Error = handleErrors(err);
    res.send(Error).status(Error.code)
  }
})


router.get("/api/users",requireAdminAuth,async (req,res) => {
  try{
    const [rows] = await db.promise().query(sqlQuery.selectUsers)
    const body = {data:rows}
    res.send(body).status(200) ;
  }
  catch(err){
    const Error = handleErrors(err);
    res.send(Error).status(Error.code);

  }
})


router.get("/api/departments",requireAdminAuth,async (req,res) => {
  try{
    const [rows] = await db.promise().query(sqlQuery.selectDepartments);
    const body = {data:rows};
    res.setHeader('Content-Type', 'application/json').send(body).status(200) ;
  }
  catch(err){
    const Error = handleErrors(err);
    res.send(Error).status(Error.code);

  }
})

router.get("/api/rolebydepartment",requireAdminAuth,async(req,res) =>{

  var deptId; 

  try{
    //console.log(req.query)
    const departmentName = req.query.departmentName;
    var [rows] = await db.promise().query(sqlQuery.selectDepartmentIdByName,[departmentName]);
    deptId = rows[0].DepartmentID;

    var [rows] = await db.promise().query(sqlQuery.selectRoleNameByDepartmentId,[deptId]);
    const body = {data:rows};
    res.setHeader('Content-Type', 'application/json').send(body).status(200) ;

  }

  catch(err){
    const Error = handleErrors(err);
    res.send(Error).status(Error.code);

  }
  
})
module.exports = router;
