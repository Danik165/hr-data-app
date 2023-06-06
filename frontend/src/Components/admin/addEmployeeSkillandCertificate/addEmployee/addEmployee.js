import React from 'react';
import { useState,useEffect } from 'react';
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBContainer,CDBDropDown,CDBDropDownMenu,CDBDropDownToggle,CDBDropDownItem } from 'cdbreact';
import './addEmployee.css';
import { useNavigate } from 'react-router';


const AddEmployeeForm = () => {
  const navigate = useNavigate();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [departments,setDeparments] =useState([]);
  const [roles,setRoles] = useState([]);
 // let selectedDepartment;

  const [newProfile,setNewProfile] = useState({
    employeeId:0,
    name:"",
    email:"",
    confirmEmail:"",
    department:"",
    role:""
  })

  const validateInput = () =>{
    if(newProfile.email != newProfile.confirmEmail )
    {
      setError("Emails Do Not match")
      return false
    } 
    if(isNaN(newProfile.employeeId)  || newProfile.employeeId <= 0)
    {
      setError("Employee ID must be a Number greater than 0")
      return false
    }

    return true
  }
  const registerUser = () => {
    console.log(newProfile)
    if(validateInput()){

      fetch("http://localhost:5000/api/register",{
        method:"POST",
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify({
          "name":newProfile.name,
          "employeeId":newProfile.employeeId,
          "role":newProfile.role,
          "department":newProfile.department,
          "emailId":newProfile.email
      })
    })
      .then((response)=>{
        if(response.status == 201){
          setError("New Employee Created Successfully")
        }
      })
    .catch(err =>{
      setError(err.message)
    })
      
    }

    console.log("Register User called")
  }
  
  const handleDeptSelection = (dept) =>{

    setNewProfile({...newProfile,department:dept})
    //selectedDepartment = dept;
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

            setRoles(oldArray => [...oldArray,rolelist.data[i]]);
          }
          
          setNewProfile({...newProfile,department:dept,role:rolelist.data[0]})
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

                setDeparments(oldArray => [...oldArray,departmentlist.data[i]]);
              }
              fetchRole(departmentlist.data[0])
             // setNewProfile({...newProfile,department:departmentlist.data[0].DepartmentName})
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
            <p className="h4 font-weight-bold"> Add Employee </p>
          </div>
          <CDBInput style={{'border-radius':'0px'}} label="Employee ID" type="text" icon="id-card" iconClass="text-muted" onChange={e => setNewProfile({...newProfile,employeeId:parseInt(e.target.value)})} />
          <CDBInput style={{'border-radius':'0px'}} label="Name" type="text" icon="user" iconClass="text-muted" onChange={e => setNewProfile({...newProfile,name:e.target.value})} />
          <CDBInput style={{'border-radius':'0px'}} label="Email" type="email" icon="envelope" iconClass="text-muted" onChange={e => setNewProfile({...newProfile,email:e.target.value})} />
          <CDBInput style={{'border-radius':'0px'}}  label="Confirm email" type="email" icon="envelope-square" iconClass="text-muted" onChange={e => setNewProfile({...newProfile,confirmEmail:e.target.value})} />
          <label htmlFor="department">Select a Department:</label>
          <br />
          <select id="department" name="department" className='department-dropdown' onChange={e => handleDeptSelection(e.target.value)}>
          {departments.map(department => 
                <option key={department} value={department}>{department}</option>
          )}
         
                 
          </select>
         

          <label htmlFor="role" >Role: </label>
            <br />
            <select id="role" name="role" className='role-dropdown' onChange={e => setNewProfile({...newProfile,role:e.target.value})} >
              {
                roles.map(role =>
                  <option id={role} value={role}>{role}</option>)
              }
            </select>
              <div class="d-flex align-items-center justify-content-center mt-2">
             <p class="err-message" >{error}</p> 
             </div>
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