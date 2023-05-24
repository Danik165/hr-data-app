
const sqlQuery ={
    selectUsers :"SELECT UserID as EmployeeId,Name,DepartmentName,RoleName from users inner join department on users.departmentID = department.departmentID inner join role on users.roleID = role.roleID",
    selectUserById:"SELECT UserID,Name,EmailID,PhoneNumber,ProjectName,DepartmentName,RoleName FROM company_skills.users inner join company_skills.department on users.departmentID = department.departmentID inner join company_skills.role on users.roleID = role.roleID  inner join projects on users.ProjectID = projects.ProjectID where UserID = ?",
    selectDepartments:"SELECT DepartmentName from department",
    selectDepartmentIdByName:"Select DepartmentID from department where DepartmentName=?",
    selectRoleIdByDepartmentIdandRoleName:"Select roleID from role where departmentID=? and RoleName = ?",
    selectRoleNameByDepartmentId:"Select RoleName from role where DepartmentID =? ",
    selectUserIdByEmailId:"Select UserID from users where emailId=?",
    selectOtpbyUserIdandUniqueId:"Select otp from otp_request where UserId =? and uniqueId = ?",
    insertNewUser:"Insert into users(UserID,Name,EmailID,RoleID,DepartmentID,AccessID) values (?,?,?,?,?,?)",
    insertNewOtpRequest:"Insert into otp_request values(?,?,?,?)",
    updatePassword:"Update users set password = ? where userId = ?",
    setOTPTransactionSuccess:"Update otp_request set success=? where uniqueId = ?",
    LoginUser:"SELECT UserID,Password,AccessID FROM users WHERE EmailID = ? ",
    selectCategories:"SELECT CategoryName FROM category",
    selectSkillsbyCategoryId:"SELECT SkillName FROM company_skills.skills where CategoryID=?",
    selectCategoryIdbyName:"Select CategoryID from category where CategoryName=?",
    selectSkillIdbySkillName:"Select SkillID from skills where SkillName=?",
    selectSubSkillbySkillID:"Select subSkillName from subskills where SkillID=?"

}

module.exports.sqlQuery = sqlQuery;