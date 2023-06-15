import CertificateTable from '../../users/certificatetable/CertificateTable';
import Profile from './profileCard/ProfileEdit';
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
                <UserPage id={id}/>
            </div>
            <div class='certificate-table'>
                <CertificateTable id={id} />
            </div>
        </div>
    )
}

export default UserProfile;