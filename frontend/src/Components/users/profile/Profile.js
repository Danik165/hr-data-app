import React, { useState, useEffect } from 'react';
import './profile.css';
import { MDBIcon } from 'mdb-react-ui-kit';
import { apiurl} from '../../../utils/HostData';
import Card from './Card';


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


const handleDeptChChange = (deptId) =>{
    setTempProfile({...tempProfile,departmentId:deptId})
    fetchRole(deptId);
}
const fetchRole = (deptId) =>{
    console.log("deptId",deptId)
    fetch(apiurl+"/rolebydepartment?" + new URLSearchParams({deptId:deptId}))
    .then((response) => {
      if(response.redirected){
        window.location.replace(response.url);

      }
      else{
      response.json()
        .then((rolelist) =>{
          setRoles(rolelist.data)
          console.log(rolelist.data)
          //console.log(rolelist.data[0].roleID)
          //setNewProfile({...newProfile,departmentId:deptId,roleId:rolelist.data[0].roleID})

        })

  }
  })
  .catch(err =>{
    console.log(err.message);
    setError(err.message)
  })


  }

  useEffect(() => {
    const url = id
      ? apiurl + '/userprofilebyid?'+new URLSearchParams({ userId: id })
      : apiurl + '/userprofile';
    fetchProfile(url);
    fetchDepartmentList();
  }, [id]);

const fetchDepartmentList = () =>{
    fetch(apiurl+"/departments")
    .then((response)=>{
        if(response.redirected){
          window.location.replace(response.url);

        }
        else {
          response.json()
            .then((departmentlist) => {
              //console.log("departmentList",departmentlist)
              setDepartments(departmentlist.data)
              //fetchRole(tempProfile.DepartmentId);
            })
          }

    })
    .catch(err =>{
     // console.log(err.message);
      setError(err.message)
    })
  }

const fetchProfilebyid = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/userprofilebyid?' + new URLSearchParams({userId:id}), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log('fetchProfilebyid data', data);
    if (!response.ok) {
      throw new Error(data.message || 'Could not fetch profile.');
    }
    setProfile(data.data[0]);
    setTempProfile(data.data[0]);

  } catch (error) {
    console.error("Error:", error);
  }
};

  const updateProfile = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      const data = tempProfile;
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
          departmentId: data.DepartmentId,
          phone: data.PhoneNumber,
          emailId: data.EmailID,
          gender: data.Gender,
          address: data.Address,
          city: data.CurrentCity,
          state: data.CurrentState,
          managerID: data.ReportingManagerID,
          joiningdate: data.JoiningDate.slice(0,10),
          worktype: data.WorkType,
          workstatus: data.WorkStatus,
          DOB: data.DOB.slice(0,10)
        })
      });
      const responseData = await response.json();
      console.log('Server responded with:', responseData);
      if (!response.ok) {
        throw new Error(responseData.message || 'Could not update profile.');
      }
      setProfile(tempProfile);
      setIsEditing(false);
    } catch (err) {
      console.error('Updating profile failed with error:', err);
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
                {profileItem("Name", tempProfile.Name, 'Name', true)}
                {profileItem("Role", tempProfile.Role, 'Role', true)}
                {profileItem("Email", tempProfile.EmailID, 'EmailID', true)}
                {profileItem("Phone", tempProfile.PhoneNumber, 'PhoneNumber', false)}
                {profileItem("Date of Birth", tempProfile.DOB, 'DOB', true)}
                {profileItem("Age", tempProfile.Age, 'Age', true)}
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
                {profileItem("Work Type", tempProfile.WorkType, 'WorkType', true)}
                {profileItem("Work Status", tempProfile.WorkStatus, 'WorkStatus', true)}
                {profileItem("Joining Date", tempProfile.JoiningDate, 'JoiningDate', true)}
                {profileItem("Time at Jeevan", tempProfile.TimeatJeevan, 'TimeatJeevan', true)}
                {!isEditing && profileItem("Department", tempProfile.Department, 'Department', true)}
                {isEditing && <div>
                    <label> Department: </label>

                    <select onChange={e => handleDeptChChange(e.target.value)}>
                        {
                            departments.map(department =>
                                <option key={department.DepartmentID} value={department.DepartmentID}>{department.DepartmentName}</option>
                                )}
                   </select>
                   </div>
                   }

                    {!isEditing && profileItem("Role", tempProfile.Role, 'Role', true)}
                {isEditing && <div>
                    <label> Role: </label>

                    <select onChange={e => setTempProfile({...tempProfile,roleId:e.target.value})}>
                        {
                            roles.map(role =>
                                <option key={role.roleID} value={role.roleID}>{role.RoleName}</option>
                                )}
                   </select>
                   </div>
                   }


                {profileItem("Reporting Manager ID", tempProfile.ReportingManagerID, 'ReportingManagerID', true)}
                {profileItem("Manager Name", tempProfile.ManagerName, 'ManagerName', true)}
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
          : <button onClick={() => setIsEditing(true)}>Edit</button>}
      </form>
    </div>
  );
};

export default Profile;



