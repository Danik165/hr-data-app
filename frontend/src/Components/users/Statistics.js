import React, { useEffect, useState } from 'react';

const UserStats = ({ userSkills }) => {
  const [topSkills, setTopSkills] = useState([]);
  const [skillsToImprove, setSkillsToImprove] = useState([]);

  const numberOfSkills = userSkills.length;
  const averageLevel = userSkills.reduce((acc, skill) => acc + skill.level, 0) / numberOfSkills;

  useEffect(() => {
    // Assuming that skills have a 'level' field that is a numerical value
    const sortedSkills = [...userSkills].sort((a, b) => b.level - a.level);

    setTopSkills(sortedSkills.slice(0, 5)); // Get top 5 skills
    setSkillsToImprove(sortedSkills.slice(-5)); // Get 5 skills to improve
  }, [userSkills]);

  return (
    <div className="stats-container">
      <h2>Your Skills Statistics</h2>
      <div className="stat-item">
        <h3>Number of Skills</h3>
        <p>{numberOfSkills}</p>
      </div>
      <div className="stat-item">
        <h3>Average Skill Level</h3>
        <p>{averageLevel}</p>
      </div>
      <div className="stat-item">
        <h3>Top Skills</h3>
        {topSkills.map(skill => <p key={skill.id}>{skill.name} - {skill.level}</p>)}
      </div>
      <div className="stat-item">
        <h3>Skills to Improve</h3>
        {skillsToImprove.map(skill => <p key={skill.id}>{skill.name} - {skill.level}</p>)}
      </div>
      {/* Add more statistics here... */}
    </div>
  );
};

export default UserStats;
