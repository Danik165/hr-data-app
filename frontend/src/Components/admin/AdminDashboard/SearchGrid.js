import React, { useState, useEffect } from 'react';
import SearchCard from './SearchCard';
import './searchgrid.css'

export default function SearchGrid({profileList}) {

    return(
            <div class='search-grid'>
            {profileList.map(profile =>{
            return <SearchCard profile={profile} />
            })}

    </div>
    )
}