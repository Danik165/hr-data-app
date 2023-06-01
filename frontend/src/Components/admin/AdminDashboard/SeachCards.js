import React, { useState, useEffect } from 'react';
import ProfileCard from './profileCard';
import './searchcards.css'

export default function SearchCards(){
    
    return(
            <div class='search-grid'>
                <ProfileCard />
                <ProfileCard />
                <ProfileCard />
                <ProfileCard />
                <ProfileCard />
                <ProfileCard />
                <ProfileCard />
                <ProfileCard />
    </div>
    )
}