import React, { useState, useEffect } from 'react';
import './profile.css';
import { MDBIcon } from 'mdb-react-ui-kit';
import { apiurl} from '../../../utils/HostData';
import Card from './Card';
import {confirmAlert} from 'react-confirm-alert';

const Profile = ({ setIsAuthenticated, id }) => {
  const initialProfile = {
    EmployeeID: '',
    Name: '',
    EmailID: '',
    PhoneNumber: '',
    Gender: '',
    Address: '',
    City: '',
    State: '',
    WorkType: '',
    WorkStatus: '',
    JoiningDate: '',
    DOB: '',
    Age: '',
    TimeatJeevan: '',
    Department: '',
    DepartmentId:'',
    Role: '',
    ReportingManagerID: '',
    ManagerName: ''
  };

  const [profile, setProfile] = useState(initialProfile);
  const [tempProfile, setTempProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [managerList,setManagerList] = useState([])

  const calculateAge = dob => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age_y = today.getFullYear() - birthDate.getFullYear();
    let age_m = today.getMonth() - birthDate.getMonth();
    let age_d = today.getDate() - birthDate.getDate();

    if (age_m < 0 || (age_m === 0 && age_d < 0)) {
      age_y--;
      age_m = (age_m + 12) % 12;
      age_m = age_m === 0 ? 11 : age_m - 1;
      age_d = 30 + (age_d - today.getDate());
    }

    return `${age_y} Years`;
  };

  const calculateTimeAtJeevan = joiningDate => {
    const today = new Date();
    const startDate = new Date(joiningDate);
    let time_y = today.getFullYear() - startDate.getFullYear();
    let time_m = today.getMonth() - startDate.getMonth();
    let time_d = today.getDate() - startDate.getDate();

    if (time_m < 0 || (time_m === 0 && time_d < 0)) {
      time_y--;
      time_m = (time_m + 12) % 12;
      time_m = time_m === 0 ? 11 : time_m - 1;
      time_d = 30 + (time_d - today.getDate());
    }

    return `${time_y} Years ${time_m} Months `;
  };

  const fetchProfile = async (url) => {
  setIsLoading(true);
  setError(null);
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Could not fetch profile.');
    }
    const profileData = data.data;
    console.log('profileData', profileData);
    
    profileData.Age = calculateAge(profileData.DOB);
    profileData.TimeatJeevan = calculateTimeAtJeevan(profileData.JoiningDate);
    setProfile(profileData);
    setTempProfile(profileData);
  } catch (error) {
    setError(error.message);
  }
  setIsLoading(false);
  };


  const handleDeptChange = (deptId) =>{
    setTempProfile({...tempProfile,departmentID:deptId,RoleID:0})
    fetchRole(deptId);
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
        })

  }
  })
  .catch(err =>{
    console.log(err.message);
    setError(err.message)
  })


  }

  
  function fetchManagers(){
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

  const fetchDepartmentList = () =>{
    fetch(apiurl+"/departments")
    .then((response)=>{
        if(response.redirected){
          window.location.replace(response.url);

        }
        else {
          response.json()
            .then((departmentlist) => {
              setDepartments(departmentlist.data);
            })
          }

    })
    .catch(err =>{
      setError(err.message)
    })
  }

  function profileValidator(data){
    if(data.RoleID <=0){
      showError("Input Data Error","Role Cannot be Null")
      return false
    }
    return(true)
  }


  const updateProfile = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      const data = tempProfile;
      if(profileValidator(data))
      {
      console.log('Updating with data:', data);
      const response = await fetch(apiurl + '/updateuser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.Name,
          employeeId: data.EmployeeID,
          roleId: data.RoleID,
          departmentId: data.departmentID,
          phone: data.PhoneNumber,
          emailId: data.EmailID,
          gender: data.Gender,
          address: data.Address,
          city: data.City,
          state: data.State,
          managerID: data.ReportingManagerID,
          joiningdate: data.JoiningDate.slice(0,10),
          worktype: data.WorkType,
          workstatus: data.WorkStatus,
          DOB: data.DOB.slice(0,10)
        })
      });
      const responseData = await response.json();
      if(response.status == 200)
      {
        confirmAlert({
          title:"Success",
          message:"Profile Updated",
          buttons:[
            {
              label:'Ok',
              onClick:() =>  window.location.reload()
            }
          ]
        })
      }
      console.log('Server responded with:', responseData);
      if (!response.ok) {
        throw new Error(responseData.message || 'Could not update profile.');
      }
      setProfile(tempProfile);
      setIsEditing(false);
    }
    } catch (err) {
      showError('Updating profile failed', err.message);
      setError(err.message);
    }
  
    setIsLoading(false);
  };

 

 const profileItem = (label, value, field, disabled) => (
    <div className={`profile-item-${field}`}>
      {label && <label>{label}: </label>}
      <input
        className={`profile-input-${field} ${isEditing ? "editable" : ""}`}
        type="text"
        value={value || ''}
        onChange={(e) => setTempProfile({ ...tempProfile, [field]: e.target.value })}
        disabled={!isEditing || disabled}
      />
    </div>
  );

  function onEditClick(){
    setIsEditing(true);
    fetchDepartmentList();
    fetchRole(tempProfile.departmentID)
   
  }


  function showError(title,message){
    confirmAlert({
      title: title,
      message: message,
      buttons: [
          {
              label: 'Ok'
          
          }]
      }
      )
  }

  useEffect(() => {
    const url = id
      ? apiurl + '/userprofilebyid?'+new URLSearchParams({ userId: id })
      : apiurl + '/userprofile';


    fetchProfile(url);
    fetchDepartmentList();
    fetchManagers();
  }, [id]);
 




  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="profile-container">
      <form onSubmit={updateProfile}>
        <div className="profile-content">
          <div className="profile-left">
            <div className="profile-photo"><MDBIcon far icon='user-circle' size='6x' /></div>
          </div>
          <div className="profile-right">
            <Card title='Profile Information' content={
              <>
                {profileItem("Name", tempProfile.Name, 'Name', false)}
                {profileItem("Role", tempProfile.Role, 'Role', false)}
                {profileItem("Email", tempProfile.EmailID, 'EmailID', false)}
                {profileItem("Phone", tempProfile.PhoneNumber, 'PhoneNumber', false)}
                {!isEditing && profileItem("Date of Birth", tempProfile.DOB.slice(0,10), 'DOB', false)}
                {isEditing && <div>
                  <label htmlFor="DOB" >Date of Birth: </label>
                      <input type="date" name="DOB" required pattern="\d{4}-\d{2}-\d{2}" value={tempProfile.DOB.slice(0,10)} onChange={e => setTempProfile({...tempProfile,DOB:e.target.value})}/>
                </div>}
                {profileItem("Age", tempProfile.Age, 'Age', false)}
              </>
            }/>
            <Card title='Address Information' content={
              <>
                {profileItem("Address", tempProfile.Address, 'Address', false)}
                {profileItem("City", tempProfile.City, 'City', false)}
                {profileItem("State", tempProfile.State, 'State', false)}
              </>
            }/>
            <Card title='Work Information' content={
              <>
                {profileItem("Work Type", tempProfile.WorkType, 'WorkType', false)}
                {profileItem("Work Status", tempProfile.WorkStatus, 'WorkStatus', false)}
              
                {!isEditing && profileItem("Joining Date", tempProfile.JoiningDate.slice(0,10), 'JoiningDate', false)}
                {isEditing && <div>
                  <label htmlFor="DOB" >Joining Date: </label>
                      <input type="date" name="joining-date" required pattern="\d{4}-\d{2}-\d{2}" value={tempProfile.JoiningDate.slice(0,10)} onChange={e => setTempProfile({...tempProfile,JoiningDate:e.target.value})}/>
                </div>}


                {profileItem("Time at Jeevan", tempProfile.TimeatJeevan, 'TimeatJeevan', false)}
                {!isEditing && profileItem("Department", tempProfile.Department, 'Department', false)}
                {isEditing && <div>
                    <label> Department: </label>

                    <select onChange={e => handleDeptChange(e.target.value)} id='department-dropdown'>
                        {
                          departments.map(department =>
                            <option key={department.DepartmentID} value={department.DepartmentID} selected={tempProfile.departmentID == department.DepartmentID?true:false}>{department.DepartmentName}</option>
                            )}
        
                   </select>
                   </div>
                }

                {!isEditing && profileItem("Role", tempProfile.Role, 'Role', false)}
                {isEditing && <div>
                    <label> Role: </label>

                    <select  onChange={e => setTempProfile({...tempProfile,RoleID:e.target.value})} id='role-dropdown'>
                        <option key={0} value={0}>Select a Role</option>
                        {
                            roles.map(role =>
                                <option key={role.roleID} value={role.roleID} selected={tempProfile.RoleID == role.roleID?true:false}>{role.RoleName}</option>
                                )}
                   </select>
                   </div>
              }


                {!isEditing && profileItem("Manager Name", tempProfile.ManagerName, 'ManagerName', false)}
                {isEditing && <div>
                  <label> Manager Name:</label>
                    <select onChange={e => setTempProfile({...tempProfile,ReportingManagerID:e.target.value})}>
                      {
                        managerList.map(manager =>
                          <option key={manager.employeeId} value={manager.employeeId} selected={tempProfile.ReportingManagerID == manager.employeeId?true:false}>{manager.Name}</option>
                          )
                      }
                    </select>
                  </div>}
              </>
            }/>
          </div>
        </div>
        
        {isEditing
          ? (
            <>
              <button type="submit">Save</button>
              <button onClick={() => { setIsEditing(false); setTempProfile(profile); }}>Cancel</button>
            </>
          )
          : <button onClick={onEditClick}>Edit</button>}
      </form>
    </div>
  );
};

export default Profile;



