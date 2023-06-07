import Profile from '../../users/Profile';
import UserPage from '../../users/SkillTable';
import './UserProfile.css'; // Import your CSS file

const UserProfile = () =>{
    const queryParameters = new URLSearchParams(window.location.search)
    const id = queryParameters.get("id")
    return(
        <div class='user-profile-page-container h-100 overflow-auto'>

            <div class="sidebar">
                <Profile id={id} />
            </div>
            <div class="scrollable-content">
                <h2>Skills</h2>
                <UserPage id={id}/>
            </div>
        </div>
    )
}

export default UserProfile;