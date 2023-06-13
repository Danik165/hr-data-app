import React from 'react';
import { useState,useEffect } from 'react';
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBContainer,CDBDropDown,CDBDropDownMenu,CDBDropDownToggle,CDBDropDownItem } from 'cdbreact';
import './addEmployee.css';
import { useNavigate } from 'react-router';
import { apiurl } from '../../../../utils/HostData';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const AddEmployeeForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [departments,setDeparments] =useState([]);
  const [roles,setRoles] = useState([]);
  const [managerList,setManagerList] = useState([]);



  const [newProfile,setNewProfile] = useState({
    employeeId:0,
    name:"",
    email:"",
    confirmEmail:"",
    departmentId:"",
    roleId:"",
    gender:"",
    phone:"",
    address:"",
    city:"",
    state:"",
    managerID:0,
    joiningDate:"",
    worktype:"WFH",
    workstatus:"Salaried",
    DOB:""
  })

  const validateInput = () =>{
    console.log(newProfile)
    if( !/^\d+$/.test(newProfile.employeeId) || newProfile.employeeId <= 0)
    {
      setError("Employee ID must be a Number greater than 0")
      return false
    }
    else if(newProfile.email != newProfile.confirmEmail )
    {
      setError("Emails Do Not match")
      return false
    } 
    else if(newProfile.email.length == 0){
      setError("Must have an Email Id")
      return false
    }
    if(newProfile.managerID <0){
      setError("Manager must be selected")
      return false
    }
   
    return true
  }
  const registerUser = () => {
    if(validateInput()){

      fetch(apiurl+"/register",{
        method:"POST",
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify({
          "name":newProfile.name,
          "phone":newProfile.phone,
          "employeeId":newProfile.employeeId,
          "roleId":newProfile.roleId,
          "departmentId":parseInt(newProfile.departmentId),
          "emailId":newProfile.email,
          "gender":newProfile.gender,
          "address":newProfile.address,
          "city":newProfile.city,
          "state":newProfile.state,
          "worktype":newProfile.worktype,
          "workstatus":newProfile.workstatus,
          "joiningdate":newProfile.joiningDate,
          "DOB":newProfile.DOB,
          "managerID":newProfile.managerID
      })
    })
      .then((response)=>{
        if(response.status == 201){
          confirmAlert({
            title:"Success",
            message:"New Employee Created",
            buttons:[
              {
                label:"Ok",
              }
            ]
      
          })
          setError("New Employee Created Successfully")
          setTimeout(()=>setError(''),2000)
        }
        else{
          response.json()
          .then(data =>{
            setError(data.message)
          })
        }
      })
    .catch(err =>{
      setError(err.message)
    })
      
    }
    
  }
  
  const handleDeptSelection = (dept) =>{

    setNewProfile({...newProfile,departmentId:dept})
    fetchRole(dept);
  }

  
 const fetchRole = (deptId) =>{
    fetch(apiurl+"/rolebydepartment?" + new URLSearchParams({deptId:deptId}))
    .then((response) => {
      if(response.redirected){
        window.location.replace(response.url);

      }
      else{
      response.json()
        .then((rolelist) =>{
          setRoles(rolelist.data)
          //console.log(rolelist.data[0].roleID)
          setNewProfile({...newProfile,departmentId:deptId,roleId:rolelist.data[0].roleID})

        })

  }
  })
  .catch(err =>{
    console.log(err.message);
    setError(err.message)
  })


  }


  const fetchDepartmentList = () =>{
    fetch(apiurl+"/departments")
    .then((response)=>{
        if(response.redirected){
          window.location.replace(response.url);

        }
        else {
          response.json()
            .then((departmentlist) => {
              //console.log(departmentlist)
              setDeparments(departmentlist.data) 
              fetchRole(departmentlist.data[0].DepartmentID);
            })
          }

    })
    .catch(err =>{
     // console.log(err.message);
      setError(err.message)
    })
  }


  const fetchManagers = () =>{
    fetch(apiurl + "/listmanagers")
    .then((response) =>{
      if(response.redirected){
        window.location.replace(response.url);

      }
      else if (response.status == 200){
        response.json()
        .then(data =>{
          setManagerList(data.data)
        })
      }
    })
    .catch(err =>{
      console.log(err)
    })

    }
  
  useEffect( () =>{ 
    fetchDepartmentList(); 
    fetchManagers();
  },[]);

  return (
    <div className="employee-form-container">
    <CDBContainer id='form-card'>
      <CDBCard style={{ width: '30rem','border-radius':'0px 0px 10px 10px' }} >
            <CDBCardBody className="mx-4">
          <div className="text-center mt-4 mb-2">
            <p className="h4 font-weight-bold"> Add Employee </p>
          </div>
          <CDBInput style={{'border-radius':'0px'}} label="Employee ID" type="text" icon="id-card" iconClass="text-muted" onChange={e => setNewProfile({...newProfile,employeeId:e.target.value})} />
          <CDBInput style={{'border-radius':'0px'}} label="Name" type="text" icon="user" iconClass="text-muted" onChange={e => setNewProfile({...newProfile,name:e.target.value})} />
          <CDBInput style={{'border-radius':'0px'}} label="Email" type="email" icon="envelope" iconClass="text-muted" onChange={e => setNewProfile({...newProfile,email:e.target.value})} />
          <CDBInput style={{'border-radius':'0px'}}  label="Confirm email" type="email" icon="envelope-square" iconClass="text-muted" onChange={e => setNewProfile({...newProfile,confirmEmail:e.target.value})} />
          
          <CDBInput style={{'border-radius':'0px'}} label="Gender" type="text" icon="id-card" iconClass="text-muted" onChange={e => setNewProfile({...newProfile,gender:e.target.value})} />
          <CDBInput style={{'border-radius':'0px'}} label="Phone Number" type="text" icon="phone-alt" iconClass="text-muted" onChange={e => setNewProfile({...newProfile,phone:e.target.value})} />
          <CDBInput style={{'border-radius':'0px'}} label="Address" type="text" icon="home" iconClass="text-muted" onChange={e => setNewProfile({...newProfile,address:e.target.value})} />
          <CDBInput style={{'border-radius':'0px'}} label="City" type="text" icon="city" iconClass="text-muted" onChange={e => setNewProfile({...newProfile,city:e.target.value})} />
          <CDBInput style={{'border-radius':'0px'}} label="State" type="text" icon="globe-asia" iconClass="text-muted" onChange={e => setNewProfile({...newProfile,state:e.target.value})} />
             
          <label htmlFor="department">Select a Department:</label>
          <br />
          <select id="department" name="department" className='department-dropdown' onChange={e => handleDeptSelection(e.target.value)}>
          {departments.map(department => 
                <option key={department.DepartmentID} value={department.DepartmentID}>{department.DepartmentName}</option>
          )}
         
                 
          </select>
         

          <label htmlFor="role" >Role: </label>
            <br />
            <select id="role" name="role" className='role-dropdown' onChange={e => setNewProfile({...newProfile,roleId:e.target.value})} >
            {
                roles.map(role =>
                  <option id={role.roleID} value={role.roleID}>{role.RoleName}</option>)
              }
              
            </select>


            <label htmlFor="Work Type" >Work Type: </label>
            <br />
            <select id="worktype" name="worktype" className='worktype-dropdown' onChange={e => setNewProfile({...newProfile,worktype:e.target.value})} >
            <option id="1" value='WFH'>Work From Home</option>
              <option id="2" value='WFO'>Work From Office</option>
              <option id="3" value='Hybrid'>Hybrid</option>
            </select>

            <label htmlFor="Work Status" >Work Status: </label>
            <br />
            <select id="workstatus" name="workstatus" className='workstatus-dropdown' onChange={e => setNewProfile({...newProfile,workstatus:e.target.value})} >
            <option id="1" value='Salaried'>Salaried</option>
              <option id="2" value='Contract'>Contract</option>
              <option id="3" value='Intern'>Intern</option>
            </select>


            <label htmlFor='Manager'>Manager: </label>
              <br />
              <select id='manager' name='manager' className='manager-dropdown' onChange={e => setNewProfile({...newProfile,managerID:e.target.value})} >
              <option id='sel' value={0}>Select a Manager</option>
              {
                managerList.map(manager =>
                  <option id={manager.employeeId} value={manager.employeeId}>{manager.Name}</option>)
              }

                </select>




          <label htmlFor="DOB" >Date of Birth: </label>
            <input type="date" name="DOB" required pattern="\d{4}-\d{2}-\d{2}" onChange={e => setNewProfile({...newProfile,DOB:e.target.value})}/>
            <br />
            
            <label htmlFor="Joining Date " >Joining Date: </label>
            <input type="date" name="joiningdate" required pattern="\d{4}-\d{2}-\d{2}" onChange={e => setNewProfile({...newProfile,joiningDate:e.target.value})}/>
            <br />  

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
