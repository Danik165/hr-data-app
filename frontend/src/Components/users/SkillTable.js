

const skillStructure = [
  {
    category: "Frontend",
    skills: [
      {
        skill: "HTML",
        subSkills: ["HTML5", "Semantic HTML"],
      },
      {
        skill: "CSS",
        subSkills: ["Flexbox", "Grid", "Bootstrap", "SASS", "LESS"],
      },
      {
        skill: "JavaScript",
        subSkills: ["ES6+", "React", "Vue", "Angular", "jQuery"],
      },
    ],
  },
  {
    category: "Backend",
    skills: [
      {
        skill: "Node.js",
        subSkills: ["Express", "Koa", "Hapi", "Socket.io", "NestJS"],
      },
      {
        skill: "Python",
        subSkills: ["Django", "Flask", "FastAPI", "PyTorch", "TensorFlow"],
      },
      {
        skill: "Java",
        subSkills: ["Spring Boot", "Hibernate", "Struts", "JavaFX", "JSP"],
      },
    ],
  },
  {
    category: "Full Stack",
    skills: [
      {
        skill: "MERN Stack",
        subSkills: ["MongoDB", "Express", "React", "Node.js"],
      },
      {
        skill: "MEAN Stack",
        subSkills: ["MongoDB", "Express", "Angular", "Node.js"],
      },
      {
        skill: "Django + React",
        subSkills: ["Django", "React", "PostgreSQL"],
      },
    ],
  },
  {
    category: "Management",
    skills: [
      {
        skill: "Project Management",
        subSkills: ["Agile", "Scrum", "Waterfall", "Kanban"],
      },
      {
        skill: "Product Management",
        subSkills: ["Product Lifecycle Management", "Go-to-Market Strategy", "Competitive Analysis"],
      },
      {
        skill: "People Management",
        subSkills: ["Coaching", "Conflict Resolution", "Performance Management"],
      },
    ],
  },
  {
    category: "IT",
    skills: [
      {
        skill: "Networking",
        subSkills: ["TCP/IP", "DNS", "VPN", "Firewalls"],
      },
      {
        skill: "Security",
        subSkills: ["Encryption", "Penetration Testing", "Intrusion Detection"],
      },
      {
        skill: "Databases",
        subSkills: ["SQL", "NoSQL", "Database Administration", "Data Warehousing"],
      },
    ],
  },
  {
    category: "AWS",
    skills: [
      {
        skill: "Compute Services",
        subSkills: ["EC2", "Lambda", "Elastic Beanstalk", "Batch"],
      },
      {
        skill: "Storage Services",
        subSkills: ["S3", "EBS", "EFS", "Glacier"],
      },
      {
        skill: "Database Services",
        subSkills: ["RDS", "DynamoDB", "ElastiCache", "Redshift"],
      },
    ],
  },
];


import { useEffect, useState } from "react";
import './skilltable.css'

const UserPage = ({id}) => {
  const [category, setCategory] = useState("");
  const [skill, setSkill] = useState("");
  const [subSkill, setSubSkill] = useState([]);
  const [year, setYear] = useState("");
  const [level, setLevel] = useState("");
  const [certificate, setCertificate] = useState("");
  const [userSkills, setUserSkills] = useState([
    // {
    //   category: 'Frontend',
    //   skill: 'HTML',
    //   subSkills: ['HTML5', 'Semantic HTML'],
    //   years: '2 Years',
    //   level: 'Intermediate',
    //   certificate: 'Yes'
    // },
    // Add more existing skills here...
  ]);


const handleSubSkillChange = (sub) => {
    if (subSkill.includes(sub)) {
      setSubSkill(subSkill.filter(s => s !== sub));
    } else {
      setSubSkill([...subSkill, sub]);
    }
  };

const handleEditSkill = (index) => {
  const skillToEdit = userSkills[index];
  setCategory(skillToEdit.category);
  setSkill(skillToEdit.skill);
  setSubSkill(skillToEdit.subSkills);
  setYear(skillToEdit.years);
  setLevel(skillToEdit.level);
  setCertificate(skillToEdit.certificate);
  setUserSkills(userSkills.filter((_, i) => i !== index));
};

const removeSubSkill = (index) => {
  setUserSkills(userSkills.filter((_, i) => i !== index));
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
       console.log(data);
       let tempobj;
       for(let i=0;i<data.length;i++)
       {
          let subSkillList = [];
          tempobj = {category:data[i].CategoryName,skill:data[i].SkillName,years:data[i].experience,level:data[i].level,certificate:"YES"}
          for(let j=0;j<data[i].subSkillName.length;j++){
            subSkillList.push(data[i].subSkillName[j].SubSkillName)
          }
          console.log(subSkillList)
          tempobj.subSkills = subSkillList
         console.log(tempobj)
         setUserSkills((arr) => [...arr,tempobj])
        }
       })
    }
  })
  .catch(err =>{
    console.log("Error in fetchin subskills",err)
  })
}
 
useEffect(() =>{
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
          {userSkills.map(({ category, skill, subSkills, years, level, certificate }, i) => (
            <tr key={i}>
              <td>{category}</td>
              <td>{skill}</td>
              <td>{subSkills.join(', ')}</td>
              <td>{years}</td>
              <td>{level}</td>
              <td>{certificate}</td>
              <td>
                <button onClick={() => handleEditSkill(i)}>Edit</button>
                <button onClick={() => removeSubSkill(i)}>Remove</button>
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