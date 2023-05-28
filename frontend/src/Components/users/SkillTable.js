

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
        subSkills: ["Flexbox", "Grid", "Bootstrap"],
      },
      {
        skill: "JavaScript",
        subSkills: ["ES6+", "React", "Vue", "Angular"],
      },
    ],
  },
  {
    category: "Backend",
    skills: [
      {
        skill: "Node.js",
        subSkills: ["Express", "Koa", "Hapi"],
      },
      {
        skill: "Python",
        subSkills: ["Django", "Flask", "FastAPI"],
      },
      {
        skill: "Java",
        subSkills: ["Spring Boot", "Hibernate", "Struts"],
      },
    ],
  },
  // Additional categories go here...
];

import { useState } from "react";
import './skilltable.css'

const UserPage = () => {
  const [category, setCategory] = useState("");
  const [skill, setSkill] = useState("");
  const [subSkill, setSubSkill] = useState([]);
  const [year, setYear] = useState("");
  const [level, setLevel] = useState("");
  const [userSkills, setUserSkills] = useState([
    {
      category: 'Frontend',
      skill: 'HTML',
      subSkills: ['HTML5', 'Semantic HTML'],
      years: '2 Years',
      level: 'Intermediate'
    },
    // Add more existing skills here...
  ]);

  const addSubSkill = () => {
    setUserSkills([...userSkills, { category, skill, subSkill }]);
    setCategory("");
    setSkill("");
    setSubSkill("");
  };
  const handleSubSkillSelect = (e) => {
  const options = e.target.options;
  const value = [];
  for (let i = 0, l = options.length; i < l; i++) {
    if (options[i].selected) {
      value.push(options[i].value);
    }
  }
  setSubSkill(value);
};
const handleSubSkillChange = (sub) => {
    if (subSkill.includes(sub)) {
      setSubSkill(subSkill.filter(s => s !== sub));
    } else {
      setSubSkill([...subSkill, sub]);
    }
  };


const removeSubSkill = (index) => {
  setUserSkills(userSkills.filter((_, i) => i !== index));
};

  const skillOptions = category ? skillStructure.find(({ category: c }) => c === category)?.skills : [];


  const subSkillOptions = skill ? skillOptions.find(({ skill: s }) => s === skill)?.subSkills : [];
const addSkill = () => {
  setUserSkills([...userSkills, { category, skill, subSkills: subSkill, years: year, level: level }]);
  setCategory("");
  setSkill("");
  setSubSkill([]);
  setYear("");
  setLevel("");
};

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
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {userSkills.map(({ category, skill, subSkills, years, level }, i) => (
          <tr key={i}>
            <td>{category}</td>
            <td>{skill}</td>
            <td>{subSkills.join(', ')}</td>
            <td>{years}</td>
            <td>{level}</td>
            <td>
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

      <button onClick={addSkill}>Add Skill</button>
    </div>
  )}
</div>
  </div>
);

};

export default UserPage;