import { useState } from "react";
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBContainer,CDBDropDown,CDBDropDownMenu,CDBDropDownToggle,CDBDropDownItem } from 'cdbreact';

const AddSkillForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const addSkill = () => {
      console.log("")
    }
    return (
      <div class="skill-form-container">
      <CDBContainer>
        <CDBCard style={{ width: '30rem','border-radius':'10px'  }}>
          <CDBCardBody className="mx-4">
            <div className="text-center mt-4 mb-2">
              <p className="h4 font-weight-bold"> Add Skill </p>
            </div>
            <CDBInput label="Category" type="email" icon="tags" iconClass="text-muted" />
            <CDBInput label="Skill-Name" type="text" icon="stream" iconClass="text-muted" />
            <CDBInput label="Sub-Skill-Name" type="text" icon="code-branch" iconClass="text-muted" />
            {/* <CDBInput label="Confirm email" type="email" icon="exclamation-triangle" iconClass="text-muted" />
            <CDBInput label="Department" type="select" icon="lock" iconClass="text-muted" /> */}
            <CDBBtn color="primary" style={{ width: '40%' }} className="btn-block mt-5 mx-auto" onClick={addSkill}>
              Register
            </CDBBtn>
          </CDBCardBody>
        </CDBCard>
      </CDBContainer>
      </div>
    );
  };
  export default AddSkillForm;