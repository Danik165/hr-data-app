const { Router } = require("express");
const db = require("../../database/connectDb")
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
    res.status(201).send({message:"Successfully create object"});
  }
  catch(err){
    const Error = handleErrors(err);
    res.status(Error.code).send({message:Error.message})
  }

});



router.get("/api/userbyid",async (req,res) => {
  
  try{
    const { userId } = req.body;
    const [rows] = await db.promise().query(sqlQuery.selectUserById,[userId]);
    res.status(200).send(rows[0]);
    }
  catch (err){
    const Error = handleErrors(err);
    res.status(Error.code).send(Error)
    }

})

router.get("/api/admindashboard",async (req,res)=>{
  try{
    const[rows] = await db.promise().query("SELECT * FROM company_skills.users inner join company_skills.department on users.departmentID = department.departmentID inner join company_skills.role on users.roleID = role.roleID ",[userId]);
    
  }
  catch (err){
    const Error = handleErrors(err);
    res.status(Error.code).send(Error)
  }
})


router.get("/api/users",async (req,res) => {
  try{
    const [rows] = await db.promise().query(sqlQuery.selectUsers)
    const body = {data:rows}
    res.status(200).send(body);
  }
  catch(err){
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);

  }
})


router.get("/api/departments",async (req,res) => {
  try{
    const [rows] = await db.promise().query(sqlQuery.selectDepartments);
    const body = {data:rows};
    res.status(200).setHeader('Content-Type', 'application/json').send(body) ;
  }
  catch(err){
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);

  }
})

router.get("/api/rolebydepartment",async(req,res) =>{

  var deptId; 

  try{
    //console.log(req.query)
    const departmentName = req.query.departmentName;
    var [rows] = await db.promise().query(sqlQuery.selectDepartmentIdByName,[departmentName]);
    deptId = rows[0].DepartmentID;

    var [rows] = await db.promise().query(sqlQuery.selectRoleNameByDepartmentId,[deptId]);
    const body = {data:rows};
    res.status(200).setHeader('Content-Type', 'application/json').send(body) ;

  }

  catch(err){
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);

  }
  
})


router.post("/api/addnewsubskill",async(req,res) =>{
  const {category,skill} = req.body;
  var categoryId,skillId,message ;

  try{
    var [categoryRows] = await db.promise().query("Select CategoryID from category where CategoryName = ?",[category])

    if(categoryRows.length <= 0 ){
      let [newCategory] = await db.promise().query("Insert into category(CategoryName) values(?)",[category])
      message = "Category Added Successfully"
      categoryId = newCategory.insertId;
      }
    else{
      categoryId = categoryRows[0].CategoryID;
      message = "Category Category Already Exist"
    }

    var [skillRows] = await db.promise().query("Select SkillID from skills where CategoryID = ? and SkillName=?",[categoryId,skill])
    if(skillRows.length <= 0){
      let [newSkill] = await db.promise().query("Insert into skills(CategoryID,SkillName) values(?,?)",[categoryId,skill])
      skillId = newSkill.insertId;
      message = "Skill Added Successfully";
      }    
    else{
      skillId = skillRows[0].SkillID;
      message = "Skill Already exist";

    }

    if(req.body.subSkill){
      await db.promise().query("Insert into subskills(SkillID,subSkillName) values(?,?)",[skillId,req.body.subSkill]);
      message = "Sub Skill Added Successully"
    }
    res.status(201).send({message:message})

    }


  catch(err){
    const Error = handleErrors(err);
    res.status(Error.code).send(Error)

  }
})


module.exports = router;
