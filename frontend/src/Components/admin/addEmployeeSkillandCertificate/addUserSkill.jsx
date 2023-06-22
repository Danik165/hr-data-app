import { useState } from "react";
import AddEmployeeForm from "./addEmployee/addEmployee";
import AddSkillForm from "./addskill/addSkill";
import "./addUserSkill.css";

const UserSkillDetails = () => {
  const [displayForm, setDisplayForm] = useState("Employee");

  const selectedStyle = {
    backgroundColor: "#0c4da2",
    color: "white",
  };

  const unselectedStyle = {
    backgroundColor: "#007bff",
  };

  return (
    <div className="forms-container">
      <div className="tabs">
        <div
          className={`tab ${displayForm === "Employee" ? "active" : ""}`}
          onClick={() => setDisplayForm("Employee")}
          style={displayForm === "Employee" ? selectedStyle : unselectedStyle}
        >
          Employee
        </div>
        <div
          className={`tab ${displayForm === "Skills" ? "active" : ""}`}
          onClick={() => setDisplayForm("Skills")}
          style={displayForm === "Skills" ? selectedStyle : unselectedStyle}
        >
          Skill
        </div>
      </div>
      {displayForm === "Employee" && (
        <div className="form">
          <AddEmployeeForm />
        </div>
      )}
      {displayForm === "Skills" && (
        <div className="form">
          <AddSkillForm />
        </div>
      )}
    </div>
  );
};

export default UserSkillDetails;
