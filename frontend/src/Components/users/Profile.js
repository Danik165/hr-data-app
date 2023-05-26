import React, { useState, useEffect } from 'react';
import './profile.css';
import { MDBIcon } from 'mdb-react-ui-kit';

const Profile = ({ setIsAuthenticated }) => {
  const [profile, setProfile] = useState({ name: 'User Name', role: 'Developer', email: 'username@example.com', phone: '123456789', currentProject: 'Project Name', department: 'Salesforce' });
  const [tempProfile, setTempProfile] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/profile');
      const data = await response.json();
      setProfile(data);
      setTempProfile(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
//
//  const fetchProfile = async () => {
//  try {
//    const token = localStorage.getItem('token'); // replace 'token' with the actual key you use to store the token
//    const response = await fetch('http://localhost:5000/api/userprofile', {
//      headers: {
//        'Content-Type': 'application/json',
//        'Authorization': `Bearer ${token}` // using Bearer token for authentication
//      }
//    });
//    const data = await response.json();
//    if (!response.ok) {
//        throw new Error(data.message || 'Could not fetch profile.');
//    }
//    setProfile(data);
//    setTempProfile(data);
//  } catch (error) {
//    console.error("Error:", error);
//  }
//};

useEffect(() => {
  fetchProfile();
}, []);


  const updateProfile = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tempProfile),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Could not update profile.');
      }

      setProfile(tempProfile);
      setIsEditing(false);

    } catch (err) {
      console.error(err);
    }
  };

  const profileItem = (label, value, type, disabled) => (
    <div className={`profile-item-${type}`}>
      {label && <label>{label}: </label>}
      <input
        className={`profile-input-${type} ${isEditing ? "editable" : ""}`}
        type="text"
        value={value}
        onChange={(e) => setTempProfile({ ...tempProfile, [type]: e.target.value })}
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
              <p className="profile-text-name">{profile.name}</p>
            </div>
            <div className="profile-item-left">
              <p className="profile-text-role">{profile.role}</p>
            </div>
          </div>
          <div className="profile-right">
            {profileItem('Email', tempProfile.email, 'right', false)}
            {profileItem('Phone', tempProfile.phone, 'right', false)}
            {profileItem('Current Project', tempProfile.currentProject, 'right', true)}
            {profileItem('Department', tempProfile.department, 'right', true)}
          </div>
        </div>
        <button type="submit" disabled={!isEditing}>Save</button>
        {!isEditing && <button onClick={() => { setIsEditing(true); setTempProfile(profile); }}>Edit</button>}
      </form>
    </div>
  );
};

export default Profile;
