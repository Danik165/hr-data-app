import React, { useState, useEffect } from "react";
import './userprofile.css'
// function UserProfile({ accessToken, userProfile, setUserProfile }) {

//   useEffect(() => {
//     if (!accessToken) return;

//     fetch("http://localhost:5000/profile", {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setUserProfile(data);
//       });
//   }, [accessToken]);

//   return (
//     <div>
//       {userProfile && (
//         <>
//           <h2>{userProfile.name}</h2>
//           <p>{userProfile.email}</p>
//         </>
//       )}
//     </div>
//   );
// }


const UserProfile = () =>{
  return(
    <div className="userprofile">
      <h2 className="userprofile-header"> UserProfile</h2>
    </div>
  )
}


export default UserProfile;
