import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [experience, setExperience] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/employees')
      .then((response) => response.json())
      .then((data) => setEmployees(data));
  }, []);

  const addEmployee = () => {
    if (!name || !experience) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }


    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, experience }),
    };
    fetch("http://localhost:5000/employees", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при добавлении сотрудника");
        }
        return response.json();
      })
      .then((data) => setEmployees([...employees, data]))
      .catch((error) => alert(error.message));
  };

  const updateEmployee = (id) => {
    const newName = prompt('Введите новое имя сотрудника:');

    const newExperience = prompt('Введите новый опыт работы сотрудника:');

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName, experience: newExperience }),
    };

    fetch(`http://localhost:5000/employees/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setEmployees(
          employees.map((employee) =>
            employee.id === id ? { ...employee, name: data.name, experience: data.experience } : employee
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

  return (
    <div className="App">
      <h1>Сотрудники</h1>
      <input
        type="text"
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Опыт работы"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      />
      <button onClick={addEmployee}>Добавить сотрудника</button>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} - {employee.experience}
            <button onClick={() => updateEmployee(employee.id)}>Редактировать</button>
            <button onClick={() => deleteEmployee(employee.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
