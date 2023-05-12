import React, { useState, useEffect } from 'react';
import './profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({ email: '', phone: '' });
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
      <div className="profile-content">
        <div className="profile-left">
          <div className="profile-photo"></div>
          <div className="profile-name">{profile.name}</div>
          <div className="profile-role">{profile.role}</div>
        </div>
        <div className="profile-right">
          <div className="profile-info">Information</div>
          <div className="profile-email">Email: {profile.email}</div>
          <div className="profile-phone">Phone: {profile.phone}</div>
        </div>
      </div>
      <button onClick={() => setIsEditing(false)}>Back</button>
    </div>
  );
}

return (
  <div className="profile-container">
    <div className="profile-content">
      <div className="profile-left">
        <div className="profile-photo"></div>
        <div className="profile-name">{profile.name}</div>
        <div className="profile-role">{profile.role}</div>
      </div>
      <div className="profile-right">
        <div className="profile-info">Information</div>
        <div className="profile-email">Email: {profile.email}</div>
        <div className="profile-phone">Phone: {profile.phone}</div>
      </div>
    </div>
    <button onClick={() => setIsEditing(true)}>Edit</button>
  </div>
);

};

export default Profile;
