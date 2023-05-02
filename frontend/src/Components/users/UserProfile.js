import React, { useState, useEffect } from "react";

function UserProfile({ accessToken, userProfile, setUserProfile }) {

  useEffect(() => {
    if (!accessToken) return;

    fetch("http://localhost:5000/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserProfile(data);
      });
  }, [accessToken]);

  return (
    <div>
      {userProfile && (
        <>
          <h2>{userProfile.name}</h2>
          <p>{userProfile.email}</p>
        </>
      )}
    </div>
  );
}

export default UserProfile;
