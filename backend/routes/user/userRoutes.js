const { Router, json } = require("express")
const { requireUserAuth } = require("../../middleware/authMiddleware/userAuth");
const db = require("../../database/connectDb");
const handleErrors = require("../../error/errorhandler");
const {sqlQuery} = require("../../database/query")

const router = Router();


router.post("/api/addSkill",requireUserAuth,async (req,res) =>{

})


//Completed with new data and stored procedure
router.get("/api/userprofile",requireUserAuth,async (req,res)=>{
    const userId = req.decodedToken.userId;
    try{
        const [rows] = await db.promise().query("CALL GET_USER_PROFILE(?)",[userId]);
        res.status(200).send({data:rows[0]});
    }
    catch (err){
        handleErrors(err);
    }
})

// Updated with List Type Return
router.get("/api/categories",requireUserAuth, async (req,res) =>{

    try{
      const [rows] = await db.promise().query(sqlQuery.selectCategories);
      const categoryList = rows.map(a => a.CategoryName)
      res.status(200).setHeader('Content-Type', 'application/json').send({data:categoryList})
  
    }
    catch(err){
      const Error = handleErrors(err)
      res.status(Error.code).send(Error)
    }
  })
  
// Updated with List Type Return
router.get("/api/skillbycategory",requireUserAuth,async (req,res) =>{
    const category = req.query.categoryName;
    try{
      let [rows] = await db.promise().query(sqlQuery.selectCategoryIdbyName,[category]);
      const categoryId = rows[0].CategoryID;
  
      [rows] = await db.promise().query(sqlQuery.selectSkillsbyCategoryId,[categoryId])


      const skillList = rows.map(a => a.SkillName)
      res.status(200).send({data:skillList})
    }
    catch(err){
      const Error = handleErrors(err);
      res.status(Error.code).send(Error)
    }
  })
    

// Updated with List Type Return
router.get("/api/subskillbyskill",requireUserAuth, async (req,res) =>{
  //console.log(skill)
  try{
       const category = req.query.categoryName
      const skill = req.query.skill;

      //   var [categoryRows] = await db.promise().query(sqlQuery.selectCategoryIdbyCategoryName,[category]);
      //   const categoryId = categoryRows[0].CategoryID;

      //   var [ skillRows ] = await db.promise().query(sqlQuery.selectSkillIdbySkillNameandCategoryId,[categoryId,skill]);
      //   const skillId = skillRows[0].SkillID;

      //  console.log(skillId)


      //   const [ subSkillRow ]  = await db.promise().query(sqlQuery.selectSubSkillbySkillID,[skillId]);
      //   console.log(subSkillRow)


    const [subSkillRows] = await db.promise().query("CALL GET_SUB_SKILLS_BY_CATEGORY_AND_SKILL(?,?)",[category,skill])

    const subSkillList = subSkillRows[0].map(a => a.subSkillName)

        res.status(200).send({data:subSkillList})
    
    }
    catch(err){
        console.log(err)
        const Error = handleErrors(err)
        res.status(Error.code).send(Error)
    }
})

// Updated with List Type Return
router.get("/api/certificates",requireUserAuth,async (req,res) =>{
  try{
    const [rows] = await db.promise().query(sqlQuery.selectCertificates);
    const certificateList = rows.map(a => a.CertificateName)
    res.status(200).send({data:certificateList})
  }
  catch(err){
    const Error = handleErrors(err);
    res.status(Error.code).send(Error)
  }
});


// Updated with List Type Return
router.get("/api/projects",requireUserAuth,async (req,res) =>{
  try{
    const [rows] = await db.promise().query(sqlQuery.selectProjects);
    const projectList = rows.map(a => a.ProjectName)
    res.status(200).send({data:projectList})
  }
  catch(err){
    const Error = handleErrors(err);
    res.status(Error.code).send(Error)
  }
}); 

module.exports = router;