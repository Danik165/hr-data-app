import { useState } from "react";
import AddProjectForm from "./addProjectForm/addProjectForm";
import AddDeptRoleForm from "./addDeptorRoleForm/addDeptorRoleForm";

const AddDeptRoleProject = () =>{
    const [displayForm, setDisplayForm] = useState("Department");

    const selectedStyle = {
        "background-color": "#0c4da2",
        "color":"white"
    }

    const unselectedStyle ={
        "background-color":"#007bff",
        
    }
    return(
        <div className="forms-container">
            <div className="tabs">
            <div
                    className={`tab ${displayForm === "Department" ? 'active' : ''}`}
                    onClick={() => setDisplayForm("Department")}
                    style={ displayForm === "Department" ? selectedStyle : unselectedStyle}>Department
                </div>
                <div
                    className={`tab ${displayForm === "Project" ? 'active' : ''}`}
                    onClick={() => setDisplayForm("Project")}
                    style={ displayForm === "Project" ? selectedStyle : unselectedStyle}>Project
                </div>
            </div>    
            { displayForm == "Department" && <AddDeptRoleForm />}
            { displayForm == "Project" && <AddProjectForm />}
           
        </div>
    )
}

export default AddDeptRoleProject;