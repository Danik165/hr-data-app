import React, { useState, useEffect } from "react";
import "./profile.css";
import { MDBIcon } from "mdb-react-ui-kit";
import { apiurl } from "../../../utils/HostData";
import ProfileInfoCard from "./profileInfoCard/ProfileInfoCard";

const Profile = ({ id }) => {
  const initialProfile = {
    EmployeeID: "",
    Name: "",
    EmailID: "",
    PhoneNumber: "",
    Gender: "",
    Address: "",
    City: "",
    State: "",
    WorkType: "",
    WorkStatus: "",
    JoiningDate: "",
    DOB: "",
    Age: "",
    TimeatJeevan: "",
    Department: "",
    DepartmentId: "",
    Role: "",
    ReportingManagerID: "",
    ManagerName: "",
    designation: "",
  };

  const [profile, setProfile] = useState(initialProfile);
  const [tempProfile, setTempProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateAge = (dob) => {
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

  const calculateTimeAtJeevan = (joiningDate) => {
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
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Could not fetch profile.");
      }
      const profileData = data.data;

      profileData.Age = calculateAge(profileData.DOB);
      profileData.TimeatJeevan = calculateTimeAtJeevan(profileData.JoiningDate);
      setProfile(profileData);
      setTempProfile(profileData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const profileItem = (label, value, field, disabled) => (
    <div className={`profile-item-${field}`}>
      {label && <label>{label}: </label>}
      <input
        className={`profile-input-${field} ${isEditing ? "editable" : ""}`}
        type="text"
        value={value || ""}
        onChange={(e) =>
          setTempProfile({ ...tempProfile, [field]: e.target.value })
        }
        disabled={!isEditing || disabled}
      />
    </div>
  );

  useEffect(() => {
    const url = apiurl + "/userprofile";
    fetchProfile(url);
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="profile-container">
      <form>
        <div className="profile-content">
          <div className="profile-left">
            <div className="profile-photo">
              <MDBIcon far icon="user-circle" size="6x" />
            </div>
          </div>
          <div className="profile-right">
            <ProfileInfoCard
              title="Profile Information"
              content={
                <>
                  {profileItem("Name", tempProfile.Name, "Name", false)}
                  {profileItem(
                    "Employee ID",
                    tempProfile.EmployeeID,
                    "Employee ID",
                    true
                  )}
                  {profileItem("Email", tempProfile.EmailID, "EmailID", false)}
                  {profileItem(
                    "Phone",
                    tempProfile.PhoneNumber,
                    "PhoneNumber",
                    false
                  )}
                  {profileItem(
                    "Date of Birth",
                    new Date(tempProfile.DOB).toDateString().slice(3),
                    "DOB",
                    false
                  )}
                  {profileItem("Age", tempProfile.Age, "Age", false)}
                </>
              }
            />
            <ProfileInfoCard
              title="Address Information"
              content={
                <>
                  {profileItem(
                    "Address",
                    tempProfile.Address,
                    "Address",
                    false
                  )}
                  {profileItem("City", tempProfile.City, "City", false)}
                  {profileItem("State", tempProfile.State, "State", false)}
                </>
              }
            />
            <ProfileInfoCard
              title="Work Information"
              content={
                <>
                  {profileItem(
                    "Work Type",
                    tempProfile.WorkType,
                    "WorkType",
                    false
                  )}
                  {profileItem(
                    "Work Status",
                    tempProfile.WorkStatus,
                    "WorkStatus",
                    false
                  )}
                  {profileItem(
                    "Joining Date",
                    new Date(tempProfile.JoiningDate).toDateString().slice(3),
                    "JoiningDate",
                    false
                  )}
                  {profileItem(
                    "Time at Jeevan",
                    tempProfile.TimeatJeevan,
                    "TimeatJeevan",
                    false
                  )}
                  {profileItem(
                    "Department",
                    tempProfile.Department,
                    "Department",
                    false
                  )}
                  {profileItem("Role", tempProfile.Role, "Role", false)}
                  {profileItem(
                    "Designation",
                    tempProfile.designation,
                    "designation",
                    false
                  )}
                  {profileItem(
                    "Manager Name",
                    tempProfile.ManagerName,
                    "ManagerName",
                    false
                  )}
                </>
              }
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
