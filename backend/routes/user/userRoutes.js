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


router.get("/api/categories", async (req,res) =>{

    try{
      const [rows] = await db.promise().query(sqlQuery.selectCategories);
  
      res.status(200).setHeader('Content-Type', 'application/json').send({data:rows})
  
    }
    catch(err){
      const Error = handleErrors(err)
      res.status(Error.code).send(Error)
    }
  })
  
router.get("/api/skillbycategory",async (req,res) =>{
    const category = req.query.categoryName;
    try{
      let [rows] = await db.promise().query(sqlQuery.selectCategoryIdbyName,[category]);
      const categoryId = rows[0].CategoryID;
  
      [rows] = await db.promise().query(sqlQuery.selectSkillsbyCategoryId,[categoryId])
      res.status(200).send({data:rows})
    }
    catch(err){
      const Error = handleErrors(err);
      res.status(Error.code).send(Error)
    }
  })
    
router.get("/api/subskillbyskill", async (req,res) =>{
    const category = req.query.categoryName
    const skill = req.query.skill;
    //console.log(skill)
    try{
        var [categoryRows] = await db.promise().query(sqlQuery.selectCategoryIdbyCategoryName,[category]);
        const categoryId = categoryRows[0].CategoryID;

        var [ rows ] = await db.promise().query(sqlQuery.selectSkillIdbySkillNameandCategoryId,[categoryId,skill]);
        const skillId = rows[0].SkillID;

       // console.log(skillId)


        [ rows ]  = await db.promise().query(sqlQuery.selectSubSkillbySkillID,[skillId]);
        //console.log(rows)

        
        res.status(200).send({data:rows})
    
    }
    catch(err){
        //console.log(err)
        const Error = handleErrors(err)
        res.status(Error.code).send(Error)
    }
})

module.exports = router;