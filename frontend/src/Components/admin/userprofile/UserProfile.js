import Profile from '../../users/Profile';


const UserProfile = () =>{
    const queryParameters = new URLSearchParams(window.location.search)
    const id = queryParameters.get("id")
    return(
        <div class='user-profile-page-container h-100'>
            {console.log(id)}
        <Profile id={id} />
        {/* <ProfileSkills id={id} /> */}
        </div>
    )
}

export default UserProfile;