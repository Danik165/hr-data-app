
const sqlQuery ={

    //select Users
    selectUsers :"SELECT UserID as EmployeeId,Name,DepartmentName,RoleName from users inner join department on users.departmentID = department.departmentID inner join role on users.roleID = role.roleID",
    selectUserById:"SELECT UserID,Name,EmailID,PhoneNumber,ProjectName,DepartmentName,RoleName FROM company_skills.users inner join company_skills.department on users.departmentID = department.departmentID inner join company_skills.role on users.roleID = role.roleID  inner join projects on users.ProjectID = projects.ProjectID where UserID = ?",
    selectUserIdByEmailId:"Select UserID from users where emailId=?",
    
    // Insert Update User
    LoginUser:"SELECT UserID,Password,AccessID FROM users WHERE EmailID = ? ",
    insertNewUser:"Insert into users(UserID,Name,EmailID,RoleID,DepartmentID,AccessID) values (?,?,?,?,?,?)",
    updatePassword:"Update users set password = ? where userId = ?",

    //select Departments    
    selectDepartments:"SELECT DepartmentID,DepartmentName from department",
    selectDepartmentIdByName:"Select DepartmentID from department where DepartmentName=?",

    //Select Roles
    selectRoleIdByDepartmentIdandRoleName:"Select roleID from role where departmentID=? and RoleName = ?",
    selectRoleNameByDepartmentId:"Select roleID,RoleName from role where DepartmentID =? ",

    // OTP table update or select
    selectOtpbyUserIdandUniqueId:"Select otp from otp_request where UserId =? and uniqueId = ?",
    setOTPTransactionSuccess:"Update otp_request set success=? where uniqueId = ?",
    insertNewOtpRequest:"Insert into otp_request values(?,?,?,?)",
    
    // category Skills and subskills select
    selectCategories:"SELECT CategoryName FROM category",
    selectSkillsbyCategoryId:"SELECT SkillName FROM company_skills.skills where CategoryID=?",
    selectCategoryIdbyName:"Select CategoryID from category where CategoryName=?",
    selectCategoryIdbyCategoryName:"Select CategoryID from category where CategoryName = ?",
    selectSkillIdbySkillNameandCategoryId:"Select SkillID from skills where CategoryID = ? and SkillName = ?",
    
    // insert statement for category skill and subskill
    insertNewCategory:"Insert into category(CategoryName) values(?)",
    insertNewSkill:"Insert into skills(CategoryID,SkillName) values(?,?)",
    insertNewSubSkill:"Insert into subskills(SkillID,subSkillName) values(?,?)",


    //Projects and Certificates
    selectProjects:"Select ProjectName from projects",
    selectCertificates:"Select CertificateName from certificates",
    insertProject:"Insert into projects(ProjectName) values(?)",
    insertCertificate:"Insert into certificates(CertificateName) values(?)"
}

module.exports.sqlQuery = sqlQuery;