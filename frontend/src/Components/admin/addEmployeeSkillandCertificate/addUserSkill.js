import { useState } from "react"
import AddEmployeeForm from "./addEmployee/addEmployee";
import AddSkillForm from "./addskill/addSkill";
import './addUserSkill.css'
import AddCertificateForm from "./addCertificate/addCertificate";
const UserSkillDetails = () =>{
    const [displayForm, setDisplayForm] = useState("Employee");

    const selectedStyle = {
        "background-color": "#0c4da2",
        "color":"white"
    }

    const unselectedStyle ={
        "background-color":"#007bff",
        
    }
    return(
        <div className="forms-container">
            <div className="button-container">
                <button onClick={() => setDisplayForm("Employee")} style={ displayForm == "Employee" ? selectedStyle:unselectedStyle}>Employee</button>
                <button onClick={() => setDisplayForm("Skills")} style={ displayForm == "Skills" ? selectedStyle:unselectedStyle}>Skill</button>
                <button onClick={() => setDisplayForm("Certificate")} style={displayForm == "Certificate" ? selectedStyle:unselectedStyle}>Certificate</button>
            </div>
            { displayForm == "Employee" && <AddEmployeeForm />}
            { displayForm == "Skills" && <AddSkillForm />}
            {displayForm == "Certificate" && <AddCertificateForm />}
        </div>
    )
}

export default UserSkillDetails;