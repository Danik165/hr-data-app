const { Router } = require("express");
const db = require("../../database/sqlDbConnect");
const handleErrors = require("../../error/errorhandler");
const {
  requireAdminAuth,
} = require("../../middleware/authMiddleware/adminAuth");
const { sqlQuery } = require("../../database/query");
const {
  Search,
  GetAllSkillDetailsofUser,
} = require("../../database/sqlFunctions");
const router = Router();

//Completed with new data and stored procedure
router.post("/api/register", requireAdminAuth, async (req, res) => {
  const {
    employeecode,
    name,
    roleId,
    departmentId,
    emailId,
    phone,
    gender,
    address,
    city,
    state,
    managerID,
    worktype,
    workstatus,
    DOB,
    joiningdate,
    designation,
  } = req.body;

  try {
    await db
      .promise()
      .query("CALL ADD_NEW_EMPLOYEE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
        employeecode,
        name,
        emailId,
        phone,
        gender,
        address,
        city,
        state,
        managerID,
        worktype,
        workstatus,
        joiningdate,
        DOB,
        departmentId,
        roleId,
        designation,
      ]);
    res.status(201).send({ message: "Successfully added new employee" });
  } catch (err) {
    const Error = handleErrors(err);
    res.status(Error.code).send({ message: Error.message });
  }
});

router.put("/api/updateuser", requireAdminAuth, async (req, res) => {
  try {
    const {
      userId,
      name,
      employeecode,
      roleId,
      departmentId,
      emailId,
      phone,
      gender,
      address,
      city,
      state,
      managerID,
      worktype,
      workstatus,
      DOB,
      joiningdate,
      designation,
    } = req.body;

    const [rows] = await db
      .promise()
      .query("CALL UPDATE_USER_PROFILE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
        userId,
        name,
        employeecode,
        emailId,
        phone,
        gender,
        address,
        city,
        state,
        managerID,
        worktype,
        workstatus,
        joiningdate,
        DOB,
        departmentId,
        roleId,
        designation,
      ]);
    if (rows.affectedRows == 1) {
      res.status(200).send({ message: "Updated Record Successfully" });
    } else {
      throw { code: 404, message: "Employee does not exist." };
    }
  } catch (err) {
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);
  }
});
//Completed with new data and stored procedure
router.get("/api/userprofilebyid", requireAdminAuth, async (req, res) => {
  try {
    const { userId } = req.query;
    const [rows] = await db
      .promise()
      .query("CALL GET_USER_PROFILE(?)", [userId]);
    res.status(200).send({ data: rows[0][0] });
  } catch (err) {
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);
  }
});

router.get("/api/admindashboard", requireAdminAuth, async (req, res) => {
  try {
    const [rows] = await db
      .promise()
      .query(
        "SELECT * FROM company_skills.users inner join company_skills.department on users.departmentID = department.departmentID inner join company_skills.role on users.roleID = role.roleID ",
        [userId]
      );
    res.status(200).send(rows[0]);
  } catch (err) {
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);
  }
});

router.get("/api/users", requireAdminAuth, async (req, res) => {
  try {
    const [rows] = await db.promise().query(sqlQuery.selectUsers);
    const body = { data: rows };
    res.status(200).send(body);
  } catch (err) {
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);
  }
});

router.post("/api/addSkillforuser", requireAdminAuth, async (req, res) => {
  try {
    const { userId, category, skill, level, years, subSkillList } = req.body;
    const subSkillStringList = subSkillList.join(",");
    const [rows] = await db
      .promise()
      .query("CALL ADD_NEW_SKILL_FOR_USER(?,?,?,?,?,?)", [
        userId,
        category,
        skill,
        subSkillStringList,
        level,
        years,
      ]);
    res.status(201).send({
      message: "New Skill Set Added Successfully",
      newId: rows[0][0].userId,
    });
  } catch (err) {
    const Err = handleErrors(err);
    res.status(Err.code).send({ message: Err.message });
  }
});

// Updated with List Type Return
router.get("/api/departments", requireAdminAuth, async (req, res) => {
  try {
    const [rows] = await db.promise().query(sqlQuery.selectDepartments);
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .send({ data: rows });
  } catch (err) {
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);
  }
});

// Updated with List Type Return
router.get("/api/rolebydepartment", requireAdminAuth, async (req, res) => {
  try {
    const deptId = req.query.deptId;

    var [rows] = await db
      .promise()
      .query(sqlQuery.selectRoleNameByDepartmentId, [deptId]);
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .send({ data: rows });
  } catch (err) {
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);
  }
});

router.post("/api/addnewsubskill", requireAdminAuth, async (req, res) => {
  const { category, skill } = req.body;
  var categoryId, skillId, message;

  try {
    var [categoryRows] = await db
      .promise()
      .query(sqlQuery.selectCategoryIdbyCategoryName, [category]);

    if (categoryRows.length <= 0) {
      let [newCategory] = await db
        .promise()
        .query(sqlQuery.insertNewCategory, [category]);
      message = "Category Added Successfully";
      categoryId = newCategory.insertId;
    } else {
      categoryId = categoryRows[0].CategoryID;
      message = "Category Category Already Exist";
    }

    var [skillRows] = await db
      .promise()
      .query(sqlQuery.selectSkillIdbySkillNameandCategoryId, [
        categoryId,
        skill,
      ]);
    if (skillRows.length <= 0) {
      let [newSkill] = await db
        .promise()
        .query(sqlQuery.insertNewSkill, [categoryId, skill]);
      skillId = newSkill.insertId;
      message = "Skill Added Successfully";
    } else {
      skillId = skillRows[0].SkillID;
      message = "Skill Already exist";
    }

    if (req.body.subSkill) {
      await db
        .promise()
        .query(sqlQuery.insertNewSubSkill, [skillId, req.body.subSkill]);
      message = "Sub Skill Added Successully";
    }
    res.status(201).send({ message: message });
  } catch (err) {
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);
  }
});

router.post("/api/addproject", requireAdminAuth, async (req, res) => {
  const project = req.body.project;
  try {
    await db.promise().query(sqlQuery.insertProject, [project]);
    res.status(201).send({ message: "New Project Added Successfully" });
  } catch (err) {
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);
  }
});

router.get("/api/getdetails", requireAdminAuth, async (req, res) => {
  const search = req.query.searchValue;

  try {
    const searchResults = await Search({ searchValue: search });
    if (!searchResults.success) {
      throw { message: searchResults.message, code: searchResults.code };
    }

    res.status(200).send({ data: searchResults.data });
  } catch (err) {
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);
  }
});

router.get("/api/getallskillsofuser", requireAdminAuth, async (req, res) => {
  const id = req.query.userId;
  try {
    const { data } = await GetAllSkillDetailsofUser({ id: id });
    res.status(200).send({ data: data });
  } catch (err) {
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);
  }
});

router.get("/api/certificatesofuser", requireAdminAuth, async (req, res) => {
  try {
    const userId = req.query.userId;
    const [rows] = await db
      .promise()
      .query("CALL GET_CERTIFICATES_OF_USER(?)", [userId]);
    res.status(200).send({ data: rows[0] });
  } catch (err) {
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);
  }
});

router.post("/api/certificateofuser", requireAdminAuth, async (req, res) => {
  try {
    const userId = req.body.userId;
    const certificate_ID = req.body.Certificate_ID;
    const issue_date = req.body.Issue_date || null;
    const validity_date = req.body.Validity_date || null;

    const [rows] = await db
      .promise()
      .query("CALL ADD_CERTIFICATE_FOR_USER(?,?,?,?)", [
        certi_name,
        issue_date,
        validity_date,
        userId,
      ]);
    res.status(201).send({ data: rows[0] });
  } catch (err) {
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);
  }
});

router.get("/api/listmanagers", requireAdminAuth, async (req, res) => {
  const manager_access_id = 1;
  try {
    const [rows] = await db
      .promise()
      .query("Select userId as employeeId,Name from users where AccessId = ?", [
        manager_access_id,
      ]);
    res.status(200).send({ data: rows });
  } catch (err) {
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);
  }
});

router.post("/api/departments", requireAdminAuth, async (req, res) => {
  try {
    const { department_Name, role_Name } = req.body;
    const [department_Rows] = await db
      .promise()
      .query("Insert into department(DepartmentName) values(?)", [
        department_Name,
      ]);
    const new_Department_ID = department_Rows.insertId;

    const [role_Row] = await db
      .promise()
      .query("Insert into role(DepartmentID,RoleName) values(?,?)", [
        new_Department_ID,
        role_Name,
      ]);
    res.status(201).send({ message: "New Department Added Successfully" });
  } catch (err) {
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);
  }
});

router.post("/api/role", requireAdminAuth, async (req, res) => {
  try {
    const { department_ID, role_Name } = req.body;

    const [role_Row] = await db
      .promise()
      .query("Insert into role(DepartmentID,RoleName) values(?,?)", [
        department_ID,
        role_Name,
      ]);
    res.status(201).send({ message: "New Role Added Successfully" });
  } catch (err) {
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);
  }
});
module.exports = router;
