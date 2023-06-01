import React, { useState, useEffect } from 'react';
import ProfileCard from './profileCard';
import './searchcards.css'

export default function SearchCards({profileList}) {

    return(
            <div class='search-grid'>
            {profileList.map(profile =>{
            console.log(profile)
            return <ProfileCard profile={profile} />
            })}

    </div>
    )
}