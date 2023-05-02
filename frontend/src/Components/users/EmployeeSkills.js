import React, { useState, useEffect } from "react";


function EmployeeSkills({ accessToken, userProfile }) {
  const [employeeId, setEmployeeId] = useState(null);
  const [employeeDepartment, setEmployeeDepartment] = useState("");
  const [employeeSkills, setEmployeeSkills] = useState([{ skill: "", level: "", years: "" }]);
  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState("");
  const [years, setYears] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [saveMessage, setSaveMessage] = useState("");

    useEffect(() => {
    if (userProfile && userProfile.employee_id) {
      setEmployeeId(userProfile.employee_id);
    }
  }, [userProfile]);

  const handleSkillChange = (index, field, value) => {
    const newSkills = [...employeeSkills];
    newSkills[index][field] = value;
    setEmployeeSkills(newSkills);
  };

  const addSkill = () => {
    setEmployeeSkills([...employeeSkills, { skill: "", level: "", years: "" }]);
  };

  const removeSkill = (index) => {
    const newSkills = [...employeeSkills];
    newSkills.splice(index, 1);
    setEmployeeSkills(newSkills);
  };

  const editSkill = (index) => {
  const skillToEdit = employeeSkills[index];
  const updatedSkills = [...employeeSkills];
  updatedSkills[index] = { ...skillToEdit };
  setEmployeeSkills(updatedSkills);
  setEditingIndex(index);
};

const saveSkills = () => {
  let emptyFieldFound = false;

  employeeSkills.forEach((skillObj) => {
    if (!skillObj.skill || !skillObj.level || !skillObj.years) {
      emptyFieldFound = true;
    }
  });

  if (emptyFieldFound) {
    setSaveMessage("Please fill in all fields before saving.");
  } else {
    if (editingIndex !== null) {
      const updatedSkills = [...employeeSkills];
      updatedSkills[editingIndex] = { skill, level, years };
      setEmployeeSkills(updatedSkills);
      setEditingIndex(null);
    }
    submitSkillsToDB();
  }
};


const submitSkillsToDB = () => {
  const requestBody = {
    employee_id: employeeId,
    skills: employeeSkills,
  };
  console.log('Request body:', requestBody);
  fetch("http://localhost:5000/save-skills", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      employee_id: employeeId,
      skills: employeeSkills,
    }),
  })
    .then((response) => {
      if (response.ok) {
        setSaveMessage("Skills saved successfully!");
      } else {
        setSaveMessage("Failed to save skills. Please try again.");
      }
    })
    .catch((error) => {
      setSaveMessage("Failed to save skills. Please try again.");
    });
};




  return (
    <div>
      {employeeSkills.map((skill, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Skill or Technology"
            value={skill.skill}
            onChange={(e) => handleSkillChange(index, 'skill', e.target.value)}
          />

          <select value={skill.level} onChange={(e) => handleSkillChange(index, 'level', e.target.value)}>
            <option value="">Knowledge level</option>
            <option value="Novice">Novice</option>
            <option value="Beginner">Beginner</option>
            <option value="Skillful">Skillful</option>
            <option value="Experienced">Experienced</option>
            <option value="Expert">Expert</option>
          </select>

          <select value={skill.years} onChange={(e) => handleSkillChange(index, 'years', e.target.value)}>
            <option value="">Number of years</option>
            <option value="<1">&lt;1</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="5+">5+</option>
          </select>

          {employeeSkills.length > 1 && (
            <button type="button" onClick={() => removeSkill(index)}>
              Remove
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={addSkill}>Add skill</button>
      <button type="button" onClick={saveSkills}>Save Skills</button>
        <p>{saveMessage}</p>


      <table>
        <thead>
          <tr>
            <th>Skill</th>
            <th>Level</th>
            <th>Years</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeeSkills.map((skill, index) => (
            <tr key={index}>
              <td>{skill.skill}</td>
              <td>{skill.level}</td>
              <td>{skill.years}</td>
              <td>
                <button onClick={() => editSkill(index)}>Edit</button>
                <button onClick={() => removeSkill(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default EmployeeSkills;