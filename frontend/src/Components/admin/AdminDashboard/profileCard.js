import React, { useState, useEffect } from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';
import './profilecard.css'

export default function ProfileCard(){

    return(
        <div class='m-2 card-container container card bg-light pb'>
            <div class='card-body pb-0'> 
            <div class="row header-row">
                <div class='col-4'>
                <MDBIcon far icon="smile" size='4x' />
                </div>
                <div class='col-8'>
                    <div class='user-details container'>
                        <div class='row'>
                            <div class='col'>
                                <p class='p-0 m-0'>Gowtham Ravichander</p>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='col'>
                                <p class='p-0 m-0 ms-2 font-weight-light'>Developer</p>
                                <p class='p-0 m-0 ms-2 font-weight-light'>Salesforce</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div class='row match-details p-2'>
                <div class='col'>
                    <p class='p-0 m-0'>Skill : HTML,CSS</p>
                </div>
            </div>
            <hr />  
            <div class='row contact-pane p-2'>
                <div class='col'>
                    <p  class='p-0 m-0'>gowtham.ravichander@gmail.com</p>
                </div>
                <div class='col'>   
                    <p  class='p-0 m-0'>7358327816</p>
                </div>
            </div>
            </div>
        </div>
    )
}