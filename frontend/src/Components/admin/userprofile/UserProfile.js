import Profile from '../../users/profile/Profile';
import UserPage from '../../users/skilltable/SkillTable';
import './UserProfile.css';


const UserProfile = () =>{
    const queryParameters = new URLSearchParams(window.location.search)
    const id = queryParameters.get("id")
    return(
        <div class='user-profile-page-container h-100 w-100 overflow-auto'>

            <div class="sidebar">
                <Profile id={id} />
            </div>
            <div class="scrollable-content">
                 <h1 class=" text-center">Skills</h1>
                <UserPage id={id}/>
            </div>
        </div>
    )
}

export default UserProfile;