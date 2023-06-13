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
    JoiningDate: '',
    DOB: '',
    Age: '',
    TimeatJeevan: '',
    Department: '',
    Role: '',
    ReportingManagerID: '',
    ManagerName: ''
  };

  const [profile, setProfile] = useState(initialProfile);
  const [tempProfile, setTempProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const url = id
      ? apiurl + '/userprofilebyid?'+new URLSearchParams({ userId: id })
      : apiurl + '/userprofile';
    fetchProfile(url);
  }, [id]);


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
          roleID: data.Role,
          departmentID: data.Department,
          emailId: data.EmailID,
          phone: data.PhoneNumber,
          gender: data.Gender,
          address: data.Address,
          city: data.City,
          state: data.State,
          managerID: data.ReportingManagerID,
          worktype: data.WorkType,

          DOB: data.DOB,
          joiningdate: data.JoiningDate
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
                {profileItem("Date of Birth", tempProfile.DOB.slice(0,10), 'DOB', true)}
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
                {profileItem("Joining Date", tempProfile.JoiningDate, 'JoiningDate', true)}
                {profileItem("Time at Jeevan", tempProfile.TimeatJeevan, 'TimeatJeevan', true)}
                {profileItem("Department", tempProfile.Department, 'Department', true)}
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



