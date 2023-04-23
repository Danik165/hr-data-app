import React, { useState } from "react";
import "./App.css";
import Login from "./Login";
import Register from "./Register";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [userProfile, setUserProfile] = useState(null);




  const loginUser = (username, password) => {
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("access_token", data.access_token);
        setAccessToken(data.access_token);
        setIsAdmin(data.isAdmin);
        setLoggedIn(true);
        alert("Login successful");
      });
  };

  const logoutUser = () => {
    localStorage.removeItem("access_token");
    setAccessToken(null);
    setIsAdmin(false);
    setLoggedIn(false);
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <>
          <Login loginUser={loginUser} />
          <Register />
        </>
      ) : (
        <>
          {userProfile && <span>{userProfile.name}</span>}
<button onClick={logoutUser}>Logout</button>


          {isAdmin ? (
            <AdminDashboard />
          ) : (
            <UserDashboard accessToken={accessToken} />

          )}
        </>
      )}
    </div>
  );
}

export default App;
