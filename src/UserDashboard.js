import React, { useState, useEffect } from "react";
import UserProfile from "./UserProfile";
import EmployeeSkills from "./EmployeeSkills";


function UserDashboard({ accessToken }) {
  const [userProfile, setUserProfile] = useState(null);

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
    <UserProfile accessToken={accessToken} setUserProfile={setUserProfile} />
    <EmployeeSkills accessToken={accessToken} />
  </div>
);

}

export default UserDashboard;
