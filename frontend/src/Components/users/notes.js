import { useState } from "react"
import AddEmployeeForm from "./addEmployee/addEmployee";
import AddSkillForm from "./addskill/addSkill";
import AddCertificateForm from "./addCertificate/addCertificate";
import './addUserSkill.css'

const UserSkillDetails = () => {
    const [displayForm, setDisplayForm] = useState("Employee");

    const selectedStyle = {
        backgroundColor: "#0c4da2",
        color: "white"
    }

    const unselectedStyle ={
        backgroundColor: "#007bff",
    }

    return(
        <div className="forms-container">
            <div className="tabs">
                <div
                    className={`tab ${displayForm === "Employee" ? 'active' : ''}`}
                    onClick={() => setDisplayForm("Employee")}>Employee
                    style={ displayForm === "Employee" ? selectedStyle : unselectedStyle}>Employee

                </div>
                <div
                    className={`tab ${displayForm === "Skills" ? 'active' : ''}`}
                    onClick={() => setDisplayForm("Skills")}>Skill
                    style={ displayForm === "Skills" ? selectedStyle : unselectedStyle}>Skill
                </div>
                <div
                    className={`tab ${displayForm === "Certificate" ? 'active' : ''}`}
                    onClick={() => setDisplayForm("Certificate")}>Certificate
                    style={ displayForm === "Certificate" ? selectedStyle : unselectedStyle}>Certificate

                </div>
            </div>
            { displayForm === "Employee" && <AddEmployeeForm />}
            { displayForm === "Skills" && <AddSkillForm />}
            { displayForm === "Certificate" && <AddCertificateForm />}
        </div>
    )
}

export default UserSkillDetails;
