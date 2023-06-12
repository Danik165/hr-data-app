const handleErrors = require("../error/errorhandler");
const { hashPassword,verifyPassword } = require("../middleware/encryption/encrypt");
const db = require("./connectDb");
const {sqlQuery} = require("./query")



const UpdatePasswordwithId = async ({userId,newPassword}) =>{
    

    const hashedPassword = await hashPassword(newPassword);

    try{
    db.promise().query(sqlQuery.updatePassword,[hashedPassword,userId]);
    
    return true
    }
    catch(err){
        const Error = handleErrors(err);
        return false
    }
}


const Login = async ({email,password}) =>{

    //console.log(email)
    try{
        const [rows] = await db.promise().query(sqlQuery.LoginUser,[email]);

        if(rows.length == 0){
            throw {message:"Incorrect Username",code:404}
        }

      
        const result = await verifyPassword(password,rows[0].Password);

        if(!result){
            throw {message:"Incorrect Password. Try Again",code:404}
        }

        return {success:true,AccessId:rows[0].AccessID,UserId:rows[0].UserID}
        
    }
    catch(err){
        const Error = handleErrors(err);
        return{success:false,message:Error.message,code:Error.code}
    }

}

const DoNotMatchList = new Set(['Name', 'EmailID', 'Department','Role', 'PhoneNumber'])
function searchJSON(obj, val) {
    let results = [];
    for (let k in obj) {

      if (obj.hasOwnProperty(k)) {
        if (typeof obj[k] === "object") {
            results = results.concat(searchJSON(obj[k], val));
        }else if (typeof obj[k] == 'string' && obj[k].toLowerCase().search(val) >=0 && !DoNotMatchList.has(k) ) {
           // console.log(obj[k].search(/Gowtham/i))
          results.push({matchedKey:k,matchValue:obj[k]});
        } 
      }
    }
    return results;
  }
  
const Search = async ({searchValue}) =>{

    const searchParameter = '%' + searchValue + '%';
    const val = searchValue.toLowerCase()
    var skillDetails;
    try{
        const [matchedProfiles] = await db.promise().query("CALL SEARCH_ALL(?)",[searchParameter])
        const data = matchedProfiles[0]

        if(data.length <= 0){
            throw ({message:"No Records Match the Search Value"})
        }
        for(let i=0;i<data.length;i++){
            [skillDetails] = await db.promise().query("CALL GET_SKILL_DETAILS_OF_USER(?)",[data[i].EmployeeID])
            //console.log(skillDetails)
            data[i].skills = skillDetails[0];
        }
        for(let index in data){
      
            data[index].matchedResults = searchJSON(data[index], val);
        }
      
        return ({data:data,success:true})
    }
    catch(err){
        const Error = handleErrors(err)
        return({success:false,message:Error.message,code:Error.code})
    }
};

const GetAllSkillDetailsofUser = async ({id}) =>{
    //console.log("Get All skills func called",id)
    try{
        const [categoryDetails] = await db.promise().query("CALL GET_COMPLETE_USER_SKILLS(?)",[id]);
        const data=categoryDetails[0];
        console.log("Data:",data);
        if(data.length <= 0){
            throw ({message:"No Skills Added for this User"})
        }
        for(let i=0;i<data.length;i++){
            //console.log( "Data i :",data[i])
           const [skillDetails] = await db.promise().query("CALL GET_SUB_SKILLS_NAME(?)",[data[i].SubSkillIDList]);
           // console.log("skilldetails: ",skillDetails)
           // console.log("subskills: ",skillDetails[0][0].subskills.split(",")) //.split(","))
            data[i].subSkills = skillDetails[0][0].subskills.split(",");
        }

       return ({data:data,success:true})
    }
    catch(err){
        const Error = handleErrors(err)
        return({success:false,message:Error.message,code:Error.code})
    }
}


const GetAllSkillSet = async () =>{
    try{
    const [category] = await db.promise().query("CALL GET_COMPLETE_SKILL_SET()")
    const skills = category[0]
    let tempObj = []
    let skillList = []
    let subskills =[]
    for(let i=0; i<skills.length; i++) {
        tempObj = []
        skillList = skills[i].skills.split(",")
         for(let j=0;j<skillList.length;j++) {
             [subskills] = await db.promise().query("CALL GET_COMPLETE_SUB_SKILL_SET(?)",[skillList[j]]);
                if(subskills[0][0]){
                    tempObj.push({skill:skillList[j], subSkills:subskills[0][0].subSkills.split(",") } )
                }
                else{
                    tempObj.push({skill:skillList[j]})
                }
         }
       skills[i].skills = tempObj;
    }
            return {data:skills,success:true}

    }
    catch(err){
    console.log(err)
        return {success:false,message:"Error at GET_COMPLETE_SKILL_SET"}
      }
}
module.exports.UpdatePasswordwithId = UpdatePasswordwithId;
module.exports.Login = Login;
module.exports.Search = Search;
module.exports.GetAllSkillDetailsofUser = GetAllSkillDetailsofUser;
module.exports.GetAllSkillSet = GetAllSkillSet;