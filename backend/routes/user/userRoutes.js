const { Router, json } = require("express");
const { requireUserAuth } = require("../../middleware/authMiddleware/userAuth");
const db = require("../../database/connectDb");
const handleErrors = require("../../error/errorhandler");
const { sqlQuery } = require("../../database/query");
const {
  GetAllSkillSet,
  GetAllSkillDetailsofUser,
} = require("../../database/sqlFunctions");
const router = Router();

router.post("/api/addskill", requireUserAuth, async (req, res) => {
  try {
    const { category, skill, level, years, subSkillList } = req.body;
    const userId = req.decodedToken.userId;
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

//Completed with new data and stored procedure
router.get("/api/userprofile", requireUserAuth, async (req, res) => {
  const userId = req.decodedToken.userId;
  try {
    const [rows] = await db
      .promise()
      .query("CALL GET_USER_PROFILE(?)", [userId]);
    res.status(200).send({ data: rows[0][0] });
  } catch (err) {
    handleErrors(err);
  }
});

// Updated with List Type Return
router.get("/api/categories", requireUserAuth, async (req, res) => {
  try {
    const [rows] = await db.promise().query(sqlQuery.selectCategories);
    const categoryList = rows.map((a) => a.CategoryName);
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .send({ data: categoryList });
  } catch (err) {
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);
  }
});

// Updated with List Type Return
router.get("/api/skillbycategory", requireUserAuth, async (req, res) => {
  const category = req.query.categoryName;
  try {
    let [rows] = await db
      .promise()
      .query(sqlQuery.selectCategoryIdbyName, [category]);
    const categoryId = rows[0].CategoryID;

    [rows] = await db
      .promise()
      .query(sqlQuery.selectSkillsbyCategoryId, [categoryId]);

    const skillList = rows.map((a) => a.SkillName);
    res.status(200).send({ data: skillList });
  } catch (err) {
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);
  }
});

// Updated with List Type Return
router.get("/api/subskillbyskill", requireUserAuth, async (req, res) => {
  try {
    const category = req.query.categoryName;
    const skill = req.query.skill;

    const [subSkillRows] = await db
      .promise()
      .query("CALL GET_SUB_SKILLS_BY_CATEGORY_AND_SKILL(?,?)", [
        category,
        skill,
      ]);

    const subSkillList = subSkillRows[0].map((a) => a.subSkillName);

    res.status(200).send({ data: subSkillList });
  } catch (err) {
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);
  }
});

// Updated with List Type Return
router.get("/api/projects", requireUserAuth, async (req, res) => {
  try {
    const [rows] = await db.promise().query(sqlQuery.selectProjects);
    const projectList = rows.map((a) => a.ProjectName);
    res.status(200).send({ data: projectList });
  } catch (err) {
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);
  }
});

router.get("/api/skilllist", requireUserAuth, async (req, res) => {
  try {
    const reply = await GetAllSkillSet();
    if (!reply.success) {
      throw reply;
    }
    res.status(200).send({ data: reply.data });
  } catch (err) {
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);
  }
});

router.get("/api/certificates", requireUserAuth, async (req, res) => {
  try {
    const userId = req.decodedToken.userId;
    const [rows] = await db
      .promise()
      .query("CALL GET_CERTIFICATES_OF_USER(?)", [userId]);
    res.status(200).send({ data: rows[0] });
  } catch (err) {
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);
  }
});

router.post("/api/certificate", requireUserAuth, async (req, res) => {
  try {
    const userId = req.decodedToken.userId;
    const certificate_ID = req.body.Certificate_ID;
    const issue_date = req.body.Issue_date || null;
    const validity_date = req.body.Validity_date || null;

    const [rows] = await db
      .promise()
      .query("CALL ADD_CERTIFICATE_FOR_USER(?,?,?,?)", [
        certificate_ID,
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

router.delete("/api/certificate", requireUserAuth, async (req, res) => {
  try {
    const userCertificateID = req.query.userCertificateID;
    db.promise().query(
      "DELETE from user_certificates where User_CertificatesID = (?)",
      [userCertificateID]
    );
    res.status(200).send({ data: "Certificate Successfully Removed" });
  } catch (err) {
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);
  }
});

router.delete("/api/deleteuserskill", requireUserAuth, async (req, res) => {
  try {
    const userSkillID = req.query.userskillId;
    db.promise().query("DELETE from userskills where UsersSkillID = (?)", [
      userSkillID,
    ]);
    res.status(200).send({ message: "Skill Set Successfully Removed" });
  } catch (err) {
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);
  }
});

router.delete("/api/usercertificate", requireUserAuth, async (req, res) => {
  try {
    const userCertificateId = req.query.userCertificateID;
    db.promise().query(
      "DELETE from user_certificates where User_CertificatesID= (?)",
      [userCertificateId]
    );
    res.status(200).send({ message: "Certificate Removed Successfully" });
  } catch (err) {
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);
  }
});
router.get("/api/getallskills", requireUserAuth, async (req, res) => {
  const id = req.decodedToken.userId;

  try {
    const { data } = await GetAllSkillDetailsofUser({ id: id });
    res.status(200).send({ data: data });
  } catch (err) {
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);
  }
});

router.get("/api/listcertificates", requireUserAuth, async (req, res) => {
  try {
    const [data] = await db.promise().query("Select * from certificates");
    res.status(200).send({ data: data });
  } catch (err) {
    const Error = handleErrors(err);
    res.status(Error.code).send(Error);
  }
});
module.exports = router;
