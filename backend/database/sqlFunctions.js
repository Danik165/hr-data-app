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

function searchJSON(obj, val) {
    let results = [];
    for (let k in obj) {

      if (obj.hasOwnProperty(k)) {
        if (typeof obj[k] === "object") {
            results = results.concat(searchJSON(obj[k], val));
        }else if (typeof obj[k] == 'string' && obj[k].search(val) >=0) {
           // console.log(obj[k].search(/Gowtham/i))
          results.push({matchedKey:k,matchValue:obj[k]});
        } 
      }
    }
    return results;
  }
  
const Search = async ({searchValue}) =>{

    const searchParameter = '%' + searchValue + '%';
    let val = /searchValue/i;
    var skillDetails;
    try{
        const [matchedProfiles] = await db.promise().query("CALL SEARCH_ALL(?)",[searchParameter])
        const data = matchedProfiles[0]

        if(data.length <= 0){
            throw ({message:"No Records Match the Search Value"})
        }
        for(let i=0;i<data.length;i++){
            [skillDetails] = await db.promise().query("CALL GET_SKILL_DETAILS_OF_USER(?)",[data[i].UserID])
            data[i].skills = skillDetails[0];
        }
        for(let index in data){
      
            data[index].matchedResults = searchJSON(data[index], searchValue);
        }
      
        return ({data:data,success:true})
    }
    catch(err){
        const Error = handleErrors(err)
        return({success:false,message:Error.message,code:Error.code})
    }
};

const GetAllSkillDetails = async ({id}) =>{
    console.log("Get All skills func called",id)
    try{
        const [categoryDetails] = await db.promise().query("CALL GET_COMPLETE_USER_SKILLS(?)",[id]);
        const data=categoryDetails[0];
        console.log(data);
        if(data.length <= 0){
            throw ({message:"No Skills Added for this User"})
        }
        for(let i=0;i<data.length;i++){
            [skillDetails] = await db.promise().query("CALL GET_SUB_SKILLS_NAME(?)",[data[i].subSkillIDList]);
            console.log(skillDetails)
            data[i].subSkillName = skillDetails[0];
        }

       return ({data:data,success:true})
    }
    catch(err){
        const Error = handleErrors(err)
        return({success:false,message:Error.message,code:Error.code})
    }
}

module.exports.UpdatePasswordwithId = UpdatePasswordwithId;
module.exports.Login = Login;
module.exports.Search = Search;
module.exports.GetAllSkillDetails = GetAllSkillDetails; 