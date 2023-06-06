import React, { useState, useEffect } from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';
import './profilecard.css';
import { useNavigate } from "react-router";

export default function ProfileCard({profile}){
    let navigate = useNavigate();
    const seeProfile = (id)=>{
        console.log(id);
        navigate('/admin/userprofile?id='+ id)
    }

    return(
        <div class='m-2 card-container container card bg-light pb clickable' onClick={() => seeProfile(profile.EmployeeID)}>
            <div class='card-body pb-0'> 
            <div class="row header-row">
                <div class='col-4'>
                <MDBIcon far icon="smile" size='4x' />
                </div>
                <div class='col-8'>
                    <div class='user-details container'>
                        <div class='row'>
                            <div class='col'>
                                <p class='p-0 m-0'>{profile.Name}</p>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='col'>
                                <p class='p-0 m-0  font-weight-light'>{profile.Role}</p>
                                <p class='p-0 m-0  font-weight-light'>{profile.Department}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div class='row match-details g-0 no-gutters'>

                {
                    profile.matchedResults.length > 0 ? profile.matchedResults.slice(0,4).map(matchObjs => {
                            return  <div class='col-6'> <p class='match-pane-tag'> {matchObjs.matchValue}</p> </div>}):
                             <>
                             <div class='col-6'> <p class='match-pane-tag'>{profile.Address}</p></div>
                             <div class='col-6'><p class='match-pane-tag'>{profile.DOB}</p></div>
                             <div class='col-6'> <p class='match-pane-tag'>{profile.ManagerName}</p></div>
                             <div class='col-6'><p class='match-pane-tag'>{profile.WorkType}</p></div>
                             </>
            }



            </div>
            <hr />  
            <div class='row contact-pane p-2'>
                <div class='col col-6 '>
                    <p  class='p-0 m-0 contact-tag'>{profile.EmailID}</p>
                </div>
                <div class='col col-6'>
                    <p  class='p-0 m-0 contact-tag'>{profile.PhoneNumber}</p>
                </div>
            </div>
            </div>
        </div>
    )
}