

//let skillStructure = [
//  {
//    category: "Frontend",
//    skills: [
//      {
//        skill: "HTML",
//        subSkills: ["HTML5", "Semantic HTML"],
//      },
//      {
//        skill: "CSS",
//        subSkills: ["Flexbox", "Grid", "Bootstrap", "SASS", "LESS"],
//      },
//      {
//        skill: "JavaScript",
//        subSkills: ["ES6+", "React", "Vue", "Angular", "jQuery"],
//      },
//    ],
//  },
//  {
//    category: "Backend",
//    skills: [
//      {
//        skill: "Node.js",
//        subSkills: ["Express", "Koa", "Hapi", "Socket.io", "NestJS"],
//      },
//      {
//        skill: "Python",
//        subSkills: ["Django", "Flask", "FastAPI", "PyTorch", "TensorFlow"],
//      },
//      {
//        skill: "Java",
//        subSkills: ["Spring Boot", "Hibernate", "Struts", "JavaFX", "JSP"],
//      },
//    ],
//  },
//  {
//    category: "Full Stack",
//    skills: [
//      {
//        skill: "MERN Stack",
//        subSkills: ["MongoDB", "Express", "React", "Node.js"],
//      },
//      {
//        skill: "MEAN Stack",
//        subSkills: ["MongoDB", "Express", "Angular", "Node.js"],
//      },
//      {
//        skill: "Django + React",
//        subSkills: ["Django", "React", "PostgreSQL"],
//      },
//    ],
//  },
//  {
//    category: "Management",
//    skills: [
//      {
//        skill: "Project Management",
//        subSkills: ["Agile", "Scrum", "Waterfall", "Kanban"],
//      },
//      {
//        skill: "Product Management",
//        subSkills: ["Product Lifecycle Management", "Go-to-Market Strategy", "Competitive Analysis"],
//      },
//      {
//        skill: "People Management",
//        subSkills: ["Coaching", "Conflict Resolution", "Performance Management"],
//      },
//    ],
//  },
//  {
//    category: "IT",
//    skills: [
//      {
//        skill: "Networking",
//        subSkills: ["TCP/IP", "DNS", "VPN", "Firewalls"],
//      },
//      {
//        skill: "Security",
//        subSkills: ["Encryption", "Penetration Testing", "Intrusion Detection"],
//      },
//      {
//        skill: "Databases",
//        subSkills: ["SQL", "NoSQL", "Database Administration", "Data Warehousing"],
//      },
//    ],
//  },
//  {
//    category: "AWS",
//    skills: [
//      {
//        skill: "Compute Services",
//        subSkills: ["EC2", "Lambda", "Elastic Beanstalk", "Batch"],
//      },
//      {
//        skill: "Storage Services",
//        subSkills: ["S3", "EBS", "EFS", "Glacier"],
//      },
//      {
//        skill: "Database Services",
//        subSkills: ["RDS", "DynamoDB", "ElastiCache", "Redshift"],
//      },
//    ],
//  },
//];

let skillStructure=[];
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useEffect, useState } from "react";
import './skilltable.css'

const UserPage = ({id}) => {
  const [category, setCategory] = useState("");
  const [skill, setSkill] = useState("");
  const [subSkill, setSubSkill] = useState([]);
  const [year, setYear] = useState("");
  const [level, setLevel] = useState("");
  const [certificate, setCertificate] = useState("");
  const [userSkills, setUserSkills] = useState([ ]);

//  const addSubSkill = () => {
//    setUserSkills([...userSkills, { category, skill, subSkill }]);
//    setCategory("");
//    setSkill("");
//    setSubSkill("");
//  };
//  const handleSubSkillSelect = (e) => {
//  const options = e.target.options;
//  const value = [];
//  for (let i = 0, l = options.length; i < l; i++) {
//    if (options[i].selected) {
//      value.push(options[i].value);
//    }
//  }
//  setSubSkill(value);
//};
const delConfirmation = ({index}) =>{
  confirmAlert({
    title:"Confirm Remove",
    message:"Are you sure you want to remove this skill?",
    buttons:[
      {
        label:"Yes",
        onClick:() => removeSubSkill(index)
      },
      {
        label:"No",
        onClick:() => {return false}
      }
    ]
  })
}

const handleSubSkillChange = (sub) => {
    
    if (subSkill.includes(sub)) {
      setSubSkill(subSkill.filter(s => s !== sub));
    } else {
      setSubSkill([...subSkill, sub]);
    }
  };

const handleEditSkill = (index) => {

  const skillToEdit = userSkills.filter((obj,i) => obj.listId === index)[0];

  setCategory(skillToEdit.category);
  setSkill(skillToEdit.skill);
  setSubSkill(skillToEdit.subSkills);
  setYear(skillToEdit.experience);
  setLevel(skillToEdit.level);
  setCertificate("Yes");
  setUserSkills(userSkills.filter((obj, i) => obj.listId !== index));
};

const removeSubSkill = async (index) => {
  fetch("http://localhost:5000/api/deleteuser?" + new URLSearchParams({userskillId:index}),{
    method:"DELETE"
  } )
  .then(response => {
    if(response.status == 200){
      setUserSkills(userSkills.filter((obj, i) => obj.listId !== index));
    }
  })
  .catch(err =>{
    console.log(err)
    alert("Error in Removing User Skill Try Again");
  })
 
};

const skillOptions = category ? skillStructure.find(({ category: c }) => c === category)?.skills : [];


const subSkillOptions = skill ? skillOptions.find(({ skill: s }) => s === skill)?.subSkills : [];
const addSkill = () => {
  setUserSkills([...userSkills, { category, skill, subSkills: subSkill, years: year, level: level, certificate }]);
  setCategory("");
  setSkill("");
  setSubSkill([]);
  setYear("");
  setLevel("");
  setCertificate("");
};


const fetchSubSkillsbyid = async () =>{

  fetch("http://localhost:5000/api/getallskills?" + new URLSearchParams({userId:id}))
  .then(response =>{
    if(response.redirected){
      window.location.replace(response.url);
    }
    else if(response.status ==200){
      response.json()
      .then(skillList =>{
        const data = skillList.data;
       let tempobj;
       for(let i=0;i<data.length;i++)
       {
          tempobj = {listId:data[i].UsersSkillID,category:data[i].category,skill:data[i].skill,subSkills:data[i].subSkills,years:data[i].experience,level:data[i].level,certificate:"YES"}
         setUserSkills((arr) => [...arr,tempobj])
        }
       })
    }
  })
  .catch(err =>{
    console.log("Error in fetchin subskills",err)
  })
}

const getSkillStructure = () =>{
    fetch("http://localhost:5000/api/skilllist")
    .then(res =>{
      if(res.redirected){
      window.location.replace(res.url);
        }
      else if(res.status == 200){
        res.json()
         .then(data =>{
            console.log(data.data)
            skillStructure = data.data;
            console.log("Skill Structure= " ,skillStructure)
        })
        }

    })
    .catch(err =>{
        console.log(err.message)
    })

}
 
useEffect(() =>{
    getSkillStructure();
    if(id){
      fetchSubSkillsbyid()
    }
    else{
      console.log("Fetch sub skills for the user")
    }
  },[])
return (
    <div className="main-content">
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Skill</th>
            <th>Subskill</th>
            <th>Years</th>
            <th>Level</th>
            <th>Certificate</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userSkills.map(({ listId,category, skill, subSkills, years, level, certificate }, i) => (
            <tr key={listId}>
              <td>{category}</td>
              <td>{skill}</td>
              <td>{subSkills.join(', ')}</td>
              <td>{years}</td>
              <td>{level}</td>
              <td>{certificate}</td>
              <td>
                <button onClick={() => handleEditSkill(listId)}>Edit</button>
                <button onClick={() => delConfirmation({index:listId})}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    <div>
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="">Select category</option>
        {skillStructure.map(({ category }, i) => (
          <option key={i} value={category}>{category}</option>
        ))}
      </select>
      {category && (
        <select onChange={(e) => setSkill(e.target.value)} value={skill}>
          <option value="">Select skill</option>
          {skillOptions.map(({ skill }, i) => (
            <option key={i} value={skill}>{skill}</option>
          ))}
        </select>
      )}

      {skill && subSkillOptions.length > 0 && (
        <div>
          {subSkillOptions.map((sub, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={subSkill.includes(sub)}
                onChange={() => handleSubSkillChange(sub)}
              />
              {sub}
            </label>
          ))}
        </div>
      )}

      {subSkill.length > 0 && (
    <div>
      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
      >
        <option value="">Years of Experience</option>
        <option value="1 year">1 Year</option>
        <option value="2 years">2 Years</option>
        <option value="3 years">3 Years</option>
        <option value="4 years">4 Years</option>
        <option value="5 years">5 Years</option>
        <option value="More than 5 years">More than 5 Years</option>
      </select>

      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      >
        <option value="">Level of Expertise</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
        <option value="Expert">Expert</option>
      </select>
      <select
            value={certificate}
            onChange={(e) => setCertificate(e.target.value)}
          >
            <option value="">Certificate</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

 <button onClick={addSkill} disabled={!category || !skill || !subSkill.length || !year || !level || !certificate}>Add Skill</button>
    </div>
  )}
</div>
  </div>
);

};

export default UserPage;