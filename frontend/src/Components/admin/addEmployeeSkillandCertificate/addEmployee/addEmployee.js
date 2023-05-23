import React from 'react';
import { useState,useEffect } from 'react';
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBContainer,CDBDropDown,CDBDropDownMenu,CDBDropDownToggle,CDBDropDownItem } from 'cdbreact';
import './addEmployee.css';
import { useNavigate } from 'react-router';


const AddEmployeeForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [departments,setDeparments] =useState([]);
  const [roles,setRoles] = useState([]);
  let selectedDepartment;

  const registerUser = () => {
    console.log("Register User called")
  }
  
  const handleDeptSelection = (dept) =>{

    selectedDepartment = dept;
    fetchRole(dept);
  }
 const fetchRole = (dept) =>{
    fetch("http://localhost:5000/api/rolebydepartment?" + new URLSearchParams({departmentName:dept}))
    .then((response) => {
      if(response.redirected){
        window.location.replace(response.url);

      }
      else{
      response.json()
        .then((rolelist) =>{
          setRoles([])
          for(let i = 0; i <rolelist.data.length ; i++){

            setRoles(oldArray => [...oldArray,rolelist.data[i].RoleName]);
          }
          

        })

  }
  })
  .catch(err =>{
    console.log(err.message);
    setError(err.message)
  })


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

                setDeparments(oldArray => [...oldArray,departmentlist.data[i].DepartmentName]);
              }
              fetchRole(departmentlist.data[0].DepartmentName)

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
    <div className="employee-form-container">
    <CDBContainer id='form-card'>
      <CDBCard style={{ width: '30rem','border-radius':'0px 0px 10px 10px' }} >
            <CDBCardBody className="mx-4">
          <div className="text-center mt-4 mb-2">
            <p className="h4 font-weight-bold"> AddEmployee </p>
          </div>
          <CDBInput label="Name" type="text" icon="user" iconClass="text-muted" />
          <CDBInput label="Email" type="email" icon="envelope" iconClass="text-muted" />
          <CDBInput label="Confirm email" type="email" icon="envelope-square" iconClass="text-muted" />
          <label htmlFor="department">Select a Department:</label>
          <br />
          <select id="department" name="department" className='department-dropdown' onChange={e => handleDeptSelection(e.target.value)}>
          {departments.map(department => 
                <option key={department} value={department}>{department}</option>
          )}
         
                 
          </select>
         

          <label htmlFor="role" >Role: </label>
            <br />
            <select id="role" name="role" className='role-dropdown'>
              {
                roles.map(role =>
                  <option id={role} value={role}>{role}</option>)
              }
            </select>
          
          <CDBBtn color="primary" style={{ width: '40%' }} className="btn-block mb-3 mt-3 mx-auto" onClick={registerUser}>
            Register
          </CDBBtn>
        </CDBCardBody>
      </CDBCard>
    </CDBContainer>
    </div>
  );
};
export default AddEmployeeForm;