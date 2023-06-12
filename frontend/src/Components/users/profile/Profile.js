import React, { useState, useEffect } from 'react';
import './profile.css';
import { MDBIcon } from 'mdb-react-ui-kit';

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
    console.log('fetchProfile data', data);
    if (!response.ok) {
      throw new Error(data.message || 'Could not fetch profile.');
    }
    const profileData = data.data[0];
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
      ? `http://localhost:5000/api/userprofilebyid?${new URLSearchParams({ userId: id })}`
      : 'http://localhost:5000/api/userprofile';
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


//
//const updateProfile = async (event) => {
//  event.preventDefault();
//
//  try {
//    const response = await fetch('http://localhost:5000/api/userprofile', {
//      method: 'PATCH',
//      headers: {
//        'Content-Type': 'application/json'
//      },
//      body: JSON.stringify({userId: id, ...tempProfile}),
//    });
//
//    const data = await response.json();
//    if (!response.ok) {
//      throw new Error(data.message || 'Could not update profile.');
//    }
//
//    setProfile(tempProfile);
//    setIsEditing(false);
//
//  } catch (err) {
//    console.error(err);
//  }
//};

  // const updateProfile = async (event) => {
  //   event.preventDefault();
  //
  //   try {
  //     const response = await fetch('http://localhost:5000/api/userprofile', {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(tempProfile),
  //     });
  //
  //     const data = await response.json();
  //     if (!response.ok) {
  //       throw new Error(data.message || 'Could not update profile.');
  //     }
  //
  //     setProfile(tempProfile);
  //     setIsEditing(false);
  //
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const updateProfile = async (event) => {
    event.preventDefault();

try {
      setIsLoading(true);
      setError(null);
      const data = tempProfile;

      // No actual fetch operation so no actual response object.
      // But we assume everything goes well.
      const response = { ok: true };

      if (!response.ok) {
        throw new Error(data.message || 'Could not update profile.');
      }

      setProfile(tempProfile);
      setIsEditing(false);

    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;



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

return (
    <div className="profile-container">
      <form onSubmit={updateProfile}>
        <div className="profile-content">
          <div className="profile-left">
            <div className="profile-photo"><MDBIcon far icon='user-circle' size='6x' /></div>
            <div className="profile-item-left">
              <p className="profile-text-name">{profile.Name}</p>
            </div>
            <div className="profile-item-left">
              <p className="profile-text-role">{profile.Role}</p>
            </div>
          </div>
          <div className="profile-right">
            {profileItem('Email', tempProfile.EmailID.slice(0,-23), 'EmailID', true)}
            {profileItem('Phone', tempProfile.PhoneNumber, 'PhoneNumber', false)}
            {profileItem('Address', tempProfile.Address, 'Address', false)}
            {profileItem('City', tempProfile.City, 'City', false)}
            {profileItem('State', tempProfile.State, 'State', false)}
            {profileItem('Work Type', tempProfile.WorkType, 'WorkType', true)}
            {profileItem('Joining Date', tempProfile.JoiningDate.slice(0,10), 'JoiningDate', true)}
            {profileItem('Date of Birth', tempProfile.DOB.slice(0,10), 'DOB', true)}
            {profileItem('Age', tempProfile.Age, 'Age', true)}
            {profileItem('Time at Jeevan', tempProfile.TimeatJeevan, 'TimeatJeevan', true)}
            {profileItem('Department', tempProfile.Department, 'Department', true)}
            {profileItem('Reporting Manager ID', tempProfile.ReportingManagerID, 'ReportingManagerID', true)}
            {profileItem('Manager Name', tempProfile.ManagerName, 'ManagerName', true)}
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


