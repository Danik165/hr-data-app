import React, { useState, useEffect } from 'react';
import './profile.css';
import { MDBIcon } from 'mdb-react-ui-kit';

const Profile = ({ setIsAuthenticated }) => {
  const [profile, setProfile] = useState({ name: 'User Name', role: 'Developer', email: 'username@example.ru', phone: '123456789', currentProject: 'Project Name', department: 'Salesforce' });
  const [tempProfile, setTempProfile] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/userprofile', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Could not fetch profile.');
      }
      setProfile(data);
      setTempProfile(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

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
      // Mock the fetch operation.
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
      console.error(err);
    }
  };


  const profileItem = (label, value, field, disabled) => (
    <div className={`profile-item-${field}`}>
      {label && <label>{label}: </label>}
      <input
        className={`profile-input-${field} ${isEditing ? "editable" : ""}`}
        type="text"
        value={value}
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
              <p className="profile-text-name">{profile.name}</p>
            </div>
            <div className="profile-item-left">
              <p className="profile-text-role">{profile.role}</p>
            </div>
          </div>
          <div className="profile-right">
            {profileItem('Email', tempProfile.email, 'email', false)}
            {profileItem('Phone', tempProfile.phone, 'phone', false)}
            {profileItem('Current Project', tempProfile.currentProject, 'currentProject', true)}
            {profileItem('Department', tempProfile.department, 'department', true)}
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
