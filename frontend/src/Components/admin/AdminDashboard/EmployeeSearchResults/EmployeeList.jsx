import React, { useState, useEffect } from "react";
import EmployeeCard from "./EmployeeDetailsCard/EmployeeCard";
import "./employeelist.css";

export default function EmployeeSearchResults({ profileList }) {
  return (
    <div class="search-grid">
      {profileList.map((profile) => {
        return <EmployeeCard profile={profile} />;
      })}
    </div>
  );
}
