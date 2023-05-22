import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar/Sidebar.js';
import Header from '../header/header';
import './profile.css';
import { MDBIcon } from 'mdb-react-ui-kit';

const Profile = ({ setIsAuthenticated }) => {
  const [profile, setProfile] = useState({ name: 'User Name', role: 'Developer', email: 'username@example.com', phone: '123456789', currentProject: 'Project Name', department: 'Salesforce' });
  const isAdmin = false;
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/profile');
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateProfile = async (email, phone) => {
    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, phone }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Could not update profile.');
      }

      setProfile({ email, phone });
      setIsEditing(false);

    } catch (err) {
      console.error(err);
    }
  };


  if (isEditing) {
     return (
        <div className="profile-container">
          <form onSubmit={updateProfile}>
            <div className="profile-content">
              <div className="profile-left">
                <div className="profile-photo"> <MDBIcon icon='user-circle' size='6x' /></div>
                <div className="profile-item profile-name">
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div className="profile-item profile-role">
                  <input
                    type="text"
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  />
                </div>
              </div>
              <div className="profile-right">
                <div className="profile-info">
                  <h2>Information</h2>
                  <label>Email: </label>
                      <input
                        type="text"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                  <label>Phone: </label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
                <div className="profile-projects">
                  <h2>Projects</h2>
                  <label>Current Project: </label>
                  <input
                    type="text"
                    value={profile.currentProject}
                    onChange={(e) => setProfile({ ...profile, currentProject: e.target.value })}
                  />
                  <label>Department: </label>
                  <input
                    type="text"
                    value={profile.department}
                    onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <button type="submit">Save</button>
          </form>
    </div>
  );
  }



return (
         <div className="profile-container">
        <form onSubmit={(e) => { e.preventDefault(); updateProfile(profile.email, profile.phone); }}>
          <div className="profile-content">
            <div className="profile-left">
              <div className="profile-photo"><MDBIcon far icon='user-circle' size='6x' /></div>
              <div className="profile-item profile-name">
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="profile-item profile-role">
                <input
                  type="text"
                  value={profile.role}
                  onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="profile-right">
              <div className="profile-info">
                <h2>Information</h2>
                <label>Email: </label>
                <input
                  type="text"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  disabled={!isEditing}
                />
                <label>Phone: </label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="profile-projects">
                <h2>Projects</h2>
                <label>Current Project: </label>
                <input
                  type="text"
                  value={profile.currentProject}
                  onChange={(e) => setProfile({ ...profile, currentProject: e.target.value })}
                  disabled={!isEditing}
                />
                <label>Department: </label>
                <input
                  type="text"
                  value={profile.department}
                  onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
          <button type="submit" disabled={!isEditing}>Save</button>
          {!isEditing && <button onClick={() => setIsEditing(true)}>Edit</button>}
        </form>
      </div>

);
};
export default Profile;


