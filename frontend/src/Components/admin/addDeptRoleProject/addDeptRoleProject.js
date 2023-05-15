import { useState } from "react";
import AddProjectForm from "./addProject";
import AddDeptRoleForm from "./addDeptRole";

const AddDeptRoleProject = () =>{
    const [displayForm, setDisplayForm] = useState("Department");

    const selectedStyle = {
        "background-color": "#0c4da2",
        "color":"white"
    }

    const unselectedStyle ={
        "background-color":"antiquewhite",
        
    }
    return(
        <div className="forms-container">
            <div className="button-container">
                <button onClick={() => setDisplayForm("Department")} style={ displayForm == "Department" ? selectedStyle:unselectedStyle}>Department</button>
                {/* <button onClick={() => setDisplayForm("Skills")} style={ displayForm == "Skills" ? selectedStyle:unselectedStyle}>Skills</button> */}
                <button onClick={() => setDisplayForm("Project")} style={displayForm == "Project" ? selectedStyle:unselectedStyle}>Project</button>
            </div>
            { displayForm == "Department" && <AddDeptRoleForm />}
            { displayForm == "Project" && <AddProjectForm />}
           
        </div>
    )
}

export default AddDeptRoleProject;