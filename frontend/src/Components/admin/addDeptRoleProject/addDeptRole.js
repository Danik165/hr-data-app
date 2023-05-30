
import { useState,useEffect } from 'react';
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBContainer,CDBDropDown,CDBDropDownMenu,CDBDropDownToggle,CDBDropDownItem } from 'cdbreact';

const AddDeptRoleForm = () => {
      const [departments,setDeparments] =useState([]);
      const [enabled,setEnabled] = useState(false);
    const AddDeptRole = () => {
      console.log("")
    }

    const handleDeptSelection = (dept) =>{
      console.log(dept)
      if( dept == "Add a new Department"){
        setEnabled(true);
      }
      else{
        setEnabled(false);
      }
    }

    const fetchDepartmentList = () =>{
      fetch("http://localhost:5000/api/departments")
      .then((response)=>{
          if(response.redirected){
            window.location.replace(response.url);
  
          }
          else {
            response.json()
              .then((departmentlist) => {
                console.log(departmentlist)
                
                for(let i = 0; i <departmentlist.data.length ; i++){
  
                  setDeparments(oldArray => [...oldArray,departmentlist.data[i]]);
                }
                setDeparments(oldArray =>[...oldArray,"Add a new Department"]);
  
              })
            }
  
      })
      .catch(err =>{
        console.log(err.message);
        setError(err.message)
      })
    }
  
    useEffect( () =>{ fetchDepartmentList() },[]);
  


    return (
      <div class="skill-form-container">
      <CDBContainer>
        <CDBCard style={{ width: '30rem','border-radius':'0px 0px 10px 10px'  }}>
          <CDBCardBody className="mx-4">
            <div className="text-center mt-4 mb-2">
              <p className="h4 font-weight-bold"> Add Department </p>
            </div>
            
            <label htmlFor="department">Select a Department:</label>
          <br />
          <select id="department" name="department" className='department-dropdown' onChange={e => handleDeptSelection(e.target.value)}>
          {departments.map(department => 
                <option id={department} value={department}>{department}</option>
          )}
          </select>

            {enabled && <CDBInput label="New Department" type="text" icon="user-friends" iconClass="text-muted" /> }
           
            <CDBInput label="Role" type="text" icon="lock" iconClass="text-muted" />
            <CDBBtn color="primary" style={{ width: '40%' }} className="btn-block mb-3 mt-3 mx-auto" onClick={AddDeptRole}>
              Register
            </CDBBtn>
          </CDBCardBody>
        </CDBCard>
      </CDBContainer>
      </div>
    );
  };
  export default AddDeptRoleForm;