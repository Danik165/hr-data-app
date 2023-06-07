import { useState } from "react";
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBContainer,CDBDropDown,CDBDropDownMenu,CDBDropDownToggle,CDBDropDownItem } from 'cdbreact';
import { apiurl } from "../../../../utils/HostData";
const AddCertificateForm = () => {
  const [certificate,setCertificate] = useState('');
  const [message,setMessage] =useState('');
  
  const AddCertificate = () => {

    fetch(apiurl+"/addcertificate",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({certificate})

    })
    .then((response) =>{
      if(response.status == 201){
          setMessage("certificate Added Successfully");
          setTimeout(() => {setMessage('')},2000)
      }
      else{
        setMessage("Error in Adding Message");
      }
    })
    .catch(err =>{
      setMessage(err.message)
    })
    console.log("Add Certificate Called")
  }

  
    return (
      <div class="skill-form-container">
      <CDBContainer>
        <CDBCard style={{ width: '30rem','border-radius':'0px 0px 10px 10px'  }}>
          <CDBCardBody className="mx-4">
            <div className="text-center mt-4 mb-2">
              <p className="h4 font-weight-bold"> Add Certicate </p>
            </div>
            <CDBInput style={{'border-radius':'0px'}}label="Certicate Name" type="text" icon="award" iconClass="text-muted" onChange={e => setCertificate(e.target.value)} />
          
            {message && <p>{message}</p>}
            <CDBBtn color="primary" style={{ width: '40%' }} className="btn-block mb-3 mt-3 mx-auto" onClick={AddCertificate}>
              Register
            </CDBBtn>
          </CDBCardBody>
        </CDBCard>
      </CDBContainer>
      </div>
    );
  };
  export default AddCertificateForm;