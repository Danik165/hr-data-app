import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [activity, setActivity] = useState('');
  const [skills, setSkills] = useState([{ skill: '', level: '', years: '' }]);

  useEffect(() => {
    fetch('http://localhost:5000/employees')
      .then((response) => response.json())
      .then((data) => setEmployees(data));
  }, []);

  const addEmployee = () => {
    if (!name || !activity || !skills || skills.length === 0) {
      alert("Fill all fields.");
      return;
    }
    const emptySkillIndex = skills.findIndex(skill => !skill.level || !skill.years);
    if (emptySkillIndex >= 0) {
      alert(`Fill the skill level and years for skill ${emptySkillIndex + 1}.`);
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, activity, skills }),
    };
    fetch("http://localhost:5000/employees", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error with adding employee");
        }
        return response.json();
      })
      .then((data) => {
        setEmployees([...employees, data]);
        setName('');
        setActivity('');
        setSkills([{ skill: '', level: '', years: '' }]);
      })
      .catch((error) => alert(error.message));
  };


  const updateEmployee = (id) => {
    const newName = prompt('Enter new name:');
    const newActivity = prompt('Enter new activity:');
    const updatedSkills = skills.map((skill, index) => {
      const newSkill = prompt(`Enter new skill for skill ${index + 1}:`);
      const newLevel = prompt(`Enter new level for skill ${index + 1}:`);
      const newYears = prompt(`Enter new number of years for skill ${index + 1} (options: <1, 1, 2, 3, 4, 5, 5+):`);
      return { ...skill, skill: newSkill, level: newLevel, years: newYears };
    });

    if (newName && newActivity && updatedSkills.every(skill => skill.skill && skill.level && skill.years)) {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, activity: newActivity, skills: updatedSkills }),
      };

      fetch(`http://localhost:5000/employees/${id}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setEmployees(
            employees.map((employee) =>
              employee.id === id ? { ...employee, name: data.name, activity: data.activity, skills: data.skills } : employee
            )
          );
        });
    }
  };

  const addSkill = () => {
    setSkills([...skills, { skill: '', level: '', years: '' }]);
  };

  const removeSkill = (index) => {
    if (skills.length > 1) {
      const updatedSkills = [...skills];
      updatedSkills.splice(index, 1);
      setSkills(updatedSkills);
    }
  };


  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index][field] = value;
    setSkills(updatedSkills);
  };

  const deleteEmployee = (id) => {
    const requestOptions = {
      method: 'DELETE',
    };

    fetch(`http://localhost:5000/employees/${id}`, requestOptions).then((response) => {
      if (response.status === 200) {
        setEmployees(employees.filter((employee) => employee.id !== id));
      }
    });
  };

  const sortEmployees = (sortBy) => {
    const sortedEmployees = [...employees].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'activity') {
        return a.activity.localeCompare(b.activity);
      } else if (sortBy === 'date') {
        return new Date(a.created_at) - new Date(b.created_at);
      } else {
        return 0;
      }
    });
    setEmployees(sortedEmployees);
  };

  return (
    <div className="App">
      <h1>Employees</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={activity} onChange={(e) => setActivity(e.target.value)}>
          <option value="">Activity</option>
          <option value="HR">HR</option>
          <option value="IT">IT</option>
          <option value="SF">SF</option>
          <option value="VT">VT</option>
          <option value="TAX">TAX</option>
          <option value="FIN">FIN</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        {skills.map((skill, index) => (
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

            {skills.length > 1 && <button type="button" onClick={() => removeSkill(index)}>
              Remove
            </button>}
          </div>
        ))}
        <button type="button" onClick={addSkill}>
          Add skill
        </button>
        <button onClick={addEmployee}>Add employee</button>
  </form>
  <div className="sort-buttons">
    <button onClick={() => sortEmployees('name')}>Sort by name</button>
    <button onClick={() => sortEmployees('activity')}>Sort by activity</button>
    <button onClick={() => sortEmployees('date')}>Sort by date</button>
  </div>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Activity</th>
        <th>Skills</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {employees.map((employee) => (
        <tr key={employee.id}>
          <td>{employee.name}</td>
          <td>{employee.activity}</td>
          <td>
            <table>
              <thead>
                <tr>
                  <th>Skill</th>
                  <th>Level</th>
                  <th>Years</th>
                </tr>
              </thead>
              <tbody>
                {employee.skills.map((skill, index) => (
                  <tr key={index}>
                    <td>{skill.skill}</td>
                    <td>{skill.level}</td>
                    <td>{skill.years}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
         <td>
              <button onClick={() => updateEmployee(employee.id)}>Edit</button>
              <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}
export default App;
