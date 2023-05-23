import { useState } from "react";
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBContainer,CDBDropDown,CDBDropDownMenu,CDBDropDownToggle,CDBDropDownItem } from 'cdbreact';

const AddProjectForm = () => {
    
    const AddProject = () => {
      console.log("Add Certificate Called")
    }
    return (
      <div class="skill-form-container">
      <CDBContainer>
        <CDBCard style={{ width: '30rem','border-radius':'0px 0px 10px 10px'  }}>
          <CDBCardBody className="mx-4">
            <div className="text-center mt-4 mb-2">
              <p className="h4 font-weight-bold"> Add Project </p>
            </div>
           
            <CDBInput label="Project Name" type="text" icon="user-tie" iconClass="text-muted" />
           
            <CDBBtn color="primary" style={{ width: '40%' }} className="btn-block mt-5 mx-auto" onClick={AddProject}>
              Register
            </CDBBtn>
          </CDBCardBody>
        </CDBCard>
      </CDBContainer>
      </div>
    );
  };
  export default AddProjectForm;