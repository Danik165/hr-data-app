//import {Navigate} from 'react-router-dom';
import { useNavigate } from "react-router";

const EmployeeRow = ({profile}) =>{
    //const navigate = Navigate();
    let navigate = useNavigate();
    const seeProfile = (id)=>{
        console.log(id);
        navigate('/admin/userprofile?id='+ id)
    }
    //console.log(profile)
    return(
        <tr class='clickable' onClick={e => seeProfile(profile.UserID )}>
            <td>
                <div>
                    {profile.UserID}
                </div>
            </td>
            <td>
                <div class="employee-name">
                    {profile.Name}
                </div>
                <div class='employee-details'>
                    {profile.DepartmentName}
                    <br/>
                    {profile.RoleName}
                </div>
            </td>
            

            <td>
                {profile.skills.map(skill =>
                <div>
        
                    {skill.SkillName}
                </div>
                    )}
            </td>

            <td>
            {profile.skills.map(skill =>
                <div>
        
                    {skill.experience}
                </div>
                    )}
            </td>
            <td>
            {profile.skills.map(skill =>
                <div>
        
                    {skill.level}
                </div>
                    )}
            </td>
        </tr>
    )
}


export default EmployeeRow;