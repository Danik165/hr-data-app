
const sqlQuery ={
    selectUsers :"SELECT UserID as EmployeeId,Name,DepartmentName,RoleName from users inner join department on users.departmentID = department.departmentID inner join role on users.roleID = role.roleID",
    selectUserById:"SELECT UserID,Name,EmailID,PhoneNumber,CurrentProject,DepartmentName,RoleName FROM company_skills.users inner join company_skills.department on users.departmentID = department.departmentID inner join company_skills.role on users.roleID = role.roleID where UserID = ?",
    selectDepartments:"SELECT DepartmentName from department",
    selectDepartmentIdByName:"Select DepartmentID from department where DepartmentName=?",
    selectRoleIdByDepartmentIdandRoleName:"Select roleID from role where departmentID=? and RoleName = ?",
    selectRoleNameByDepartmentId:"Select RoleName from role where DepartmentID =? ",
    selectUserIdByEmailId:"Select UserID from users where emailId=?",
    selectOtpbyUserIdandUniqueId:"Select otp from otp_request where UserId =? and uniqueId = ?",
    insertNewUser:"Insert into users(UserID,Name,EmailID,RoleID,DepartmentID,AccessID) values (?,?,?,?,?,?)",
    insertNewOtpRequest:"Insert into otp_request values(?,?,?,?)",
    updatePassword:"Update company_skills.users set password = ? where userId = ?",
    LoginUser:"SELECT UserID,Password,AccessID FROM users WHERE EmailID = ? "
}

module.exports.sqlQuery = sqlQuery;