import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [experience, setExperience] = useState('');
  const [knowledge_level, setKnowledge_level] = useState('');
  const [activity, setActivity] = useState('')


  useEffect(() => {
    fetch('http://localhost:5000/employees')
      .then((response) => response.json())
      .then((data) => setEmployees(data));
  }, []);

  const addEmployee = () => {
    if (!name || !experience || !knowledge_level || !activity) {
      alert("Fill all fields.");
      return;
    }



  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, experience, knowledge_level, activity }),
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
      // Clear the input fields
      setName('');
      setExperience('');
      setKnowledge_level('');
      setActivity('');
    })
    .catch((error) => alert(error.message));
}

const updateEmployee = (id) => {
    const newName = prompt('Enter new  name:');
    const newExperience = prompt('Enter new experience:');
    const newKnowledge_level = prompt('Enter new knowledge level:');
    const newActivity = prompt('Enter new activity:');
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName, experience: newExperience, knowledge_level: newKnowledge_level, activity: newActivity }),
    };

    fetch(`http://localhost:5000/employees/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setEmployees(
          employees.map((employee) =>
            employee.id === id ? { ...employee, name: data.name, experience: data.experience, knowledge_level: data.knowledge_level, activity: data.activity } : employee
          )
        );
      });
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

// ...

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
      <input
        type="text"
        placeholder="Experience"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      />
      <input
        type="text"
        placeholder="Knowledge Level"
        value={knowledge_level}
        onChange={(e) => setKnowledge_level(e.target.value)}
      />
      <select value={activity} onChange={(e) => setActivity(e.target.value)}>
        <option value="">Activity</option>
        <option value="HR">HR</option>
        <option value="IT">IT</option>
        <option value="SF">SF</option>
        <option value="VT">VT</option>
        <option value="Admin">Admin</option>
      </select>
      <button onClick={addEmployee}>Add employee</button>
    </form>
    <div className="sort-buttons">
      <button onClick={() => sortEmployees('name')}>Sort by name</button>
      <button onClick={() => sortEmployees('activity')}>Sort by activity</button>
      <button onClick={() => sortEmployees('date')}>Sort by date</button>
    </div>

    <ul>
      {employees.map((employee) => (
        <li key={employee.id}>
          <div className="employee-info">
            <div>Name: {employee.name}</div>
            <div>Experience: {employee.experience}</div>
            <div>Knowledge Level: {employee.knowledge_level}</div>
            <div>Activity: {employee.activity}</div>
          </div>
          <div className="action-buttons">
            <button onClick={() => updateEmployee(employee.id)}>Edit</button>
            <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>


  </div>
);
}

export default App;