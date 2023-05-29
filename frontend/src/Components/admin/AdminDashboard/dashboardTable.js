import { useState } from "react";
import EmployeeRow from "./employeeProfileRow";

const DashboardTable = ({profileList}) => {
    const profileListDec = [{
        Name:"Gowtham",
        Department:"RPA",
        Role:"Developer",
        skills:[
            {
            skillName:"Skill 1",
            Experience:"1 Year",
            Level:"Beginner"        
            },
            {
                skillName:"Skill 2",
                Experience:"2 Year",
                Level:"Beginner"        
            }
        ]

    },
    {
        Name:"Rahul",
        Department:"RPA",
        Role:"Developer",
        skills:[
            {
            skillName:"Skill 1",
            Experience:"1 Year",
            Level:"Beginner"        
            },
            {
                skillName:"Skill 2",
                Experience:"2 Year",
                Level:"Beginner"        
            },
            {
                skillName:"Skill 3",
                Experience:"3 Year",
                Level:"Beginner"        
            }
        ]
    },
    {
        Name:"Yuvraj",
        Department:"Tax",
        Role:"Developer",
        skills:[
            {
            skillName:"Skill 1",
            Experience:"1 Year",
            Level:"Beginner"        
            },
            {
                skillName:"Skill 2",
                Experience:"2 Year",
                Level:"Beginner"        
            },
            {
                skillName:"Skill 3",
                Experience:"3 Year",
                Level:"Beginner"        
            }
        ]
    }
    ]
    return(
        
        <table class='table pt-2'>
            {console.log(profileList)}
            <thead>
                <th>ID</th>
                <th>Employee</th>
                <th>Skills</th>
                <th>Exp</th>
                <th>Level</th>
                <th>Certificate</th>
            </thead>
            <tbody>
                {profileList.map(profile =>
                <EmployeeRow profile={profile} />
                    )}
                {/* <tr>
                <td>User Name</td>
                <td>JavaScript</td>
                <td> 2 Years</td>
                <td> Beginner</td>
                </tr> */}
            </tbody>
        </table>
    )
}


export default DashboardTable;