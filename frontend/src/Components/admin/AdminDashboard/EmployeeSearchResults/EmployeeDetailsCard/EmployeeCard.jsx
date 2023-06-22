import React, { useState, useEffect } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import "./employeecard.css";
import { useNavigate } from "react-router";

export default function EmployeeCard({ profile }) {
  let navigate = useNavigate();
  const seeProfile = (id) => {
    navigate("/admin/userprofile?id=" + id);
  };

  return (
    <div
      class="mb-4 pt-0 card-container container card bg-light px-0 clickable"
      onClick={() => seeProfile(profile.EmployeeID)}
    >
      <div class="card-body p-0">
        <div class="row header-row py-2 w-100 m-0">
          <div class="col-4">
            <MDBIcon far icon="smile" size="4x" />
          </div>
          <div class="col-8">
            <div class="user-details container">
              <div class="row">
                <div class="col">
                  <p class="p-0 m-0 profile-name-value">{profile.Name}</p>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <p class="p-0 m-0  font-weight-light">{profile.Role}</p>
                  <p class="p-0 m-0  font-weight-light">{profile.Department}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row pt-2 match-details g-0 no-gutters">
          {profile.matchedResults.length > 0 ? (
            profile.matchedResults.slice(0, 4).map((matchObjs) => {
              return (
                <div class="col-6">
                  {" "}
                  <p class="match-pane-tag"> {matchObjs.matchValue}</p>{" "}
                </div>
              );
            })
          ) : (
            <>
              <div class="col-6">
                {" "}
                <p class="match-pane-tag">{profile.Address}</p>
              </div>
              <div class="col-6">
                <p class="match-pane-tag">{profile.DOB}</p>
              </div>
              <div class="col-6">
                {" "}
                <p class="match-pane-tag">{profile.ManagerName}</p>
              </div>
              <div class="col-6">
                <p class="match-pane-tag">{profile.WorkType}</p>
              </div>
            </>
          )}
        </div>
        <hr />
        <div class="row contact-pane ps-2 g-0 no-gutters">
          <div class="col col-6 ">
            <p class="p-0 m-0 contact-tag">{profile.EmailID}</p>
          </div>
          <div class="col col-6">
            <p class="p-0 m-0 contact-tag">{profile.PhoneNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
