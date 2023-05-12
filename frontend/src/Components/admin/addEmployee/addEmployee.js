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
  //let departments=[];
  const registerUser = () => {
    console.log("Register User called")
  }
  
  const fetchDepartmentList = () =>{
    fetch("http://localhost:5000/api/getalldepartments")
    .then((response)=>{
        if(response.redirected){
          // navigate(response.url,{replace:true})
          window.location.replace(response.url);

        }
        else {
          //console.log(response)
          response.json()
            .then((departmentlist) => {
              console.log(departmentlist.data[0].DepartmentName)
              
              for(let i = 0; i <departmentlist.data.length ; i++){

                setDeparments(oldArray => [...oldArray,departmentlist.data[i].DepartmentName]);
              }
              console.log(departments)
              //departments = departmentlist.data;
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
    <CDBContainer>
      <CDBCard style={{ width: '30rem' }}>
        <CDBCardBody className="mx-4">
          <div className="text-center mt-4 mb-2">
            <p className="h4 font-weight-bold"> AddEmployee </p>
          </div>
          <CDBInput label="Name" type="text" icon="user" iconClass="text-muted" />
          <CDBInput label="Email" type="email" icon="envelope" iconClass="text-muted" />
          <CDBInput label="Confirm email" type="email" icon="exclamation-triangle" iconClass="text-muted" />
          <label htmlFor="department">Select a Department:</label>
          <br />
          <select id="department" name="department" className='department-dropdown'>
          {departments.map(department => 
                <option id={department} value={department}>{department}</option>
          )}
         
                    {/* <option value={department[3]}>{department[3]}</option>
                    <option value={department[0]}>{department[0]}</option>
                    <option value={department[1]}>{department[1]}</option>
                    <option value={department[2]}>{department[2]}</option> */}
          </select>

          
          <CDBBtn color="primary" style={{ width: '40%' }} className="btn-block mt-5 mx-auto" onClick={registerUser}>
            Register
          </CDBBtn>
        </CDBCardBody>
      </CDBCard>
    </CDBContainer>
    </div>
  );
};
export default AddEmployeeForm;