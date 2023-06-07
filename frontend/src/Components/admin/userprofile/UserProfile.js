import Profile from '../../users/profile/Profile';
import UserPage from '../../users/skilltable/SkillTable';

const UserProfile = () =>{
    const queryParameters = new URLSearchParams(window.location.search)
    const id = queryParameters.get("id")
    return(
        <div class='user-profile-page-container h-100'>
            <Profile id={id} />
            <h2>Skills</h2>
            <UserPage id={id}/>
        </div>
    )
}

export default UserProfile;