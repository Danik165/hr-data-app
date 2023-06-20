import React, { useEffect, useState } from 'react';
// import { Doughnut, Bar } from 'react-chartjs-2';
import './Statistics.css';
import { apiurl } from '../../utils/HostData';


const parseYears = (years) => {
    if (years === '1 Year') {
        return 1;
    }
    if (years === 'More than 5 Years') {
        return 6;
    }
    return parseInt(years);
};

const parseLevel = (level) => {
    switch (level) {
        case 'Beginner':
            return 1;
        case 'Intermediate':
            return 2;
        case 'Advanced':
            return 3;
        case 'Expert':
            return 4;
        default:
            return 0;
    }
};

const levelToWords = (level) => {
    switch (Math.round(level)) {
        case 1:
            return 'Beginner';
        case 2:
            return 'Intermediate';
        case 3:
            return 'Advanced';
        case 4:
            return 'Expert';
        default:
            return 'Unrated';
    }
};

const UserStats = () => {
    const [userData, setUserData] = useState(null);
    const [allData, setAllData] = useState(null);

    useEffect(() => {

        fetch(apiurl+'/getallskills')
            .then(response => {
                if(response.redirected) {
                    window.location.replace(response.url);
                }
                else{
                response.json()
                    .then(setUserData)
                }});

        fetch(apiurl+'/skilllist')
            .then(response =>
                {
                if(response.redirected) {
                    window.location.replace(response.url);
                }
                else{
                response.json()
                    .then(setAllData);
                }});
    }, []);

    if (userData && allData) {
        let totalYears = 0;
        let totalLevel = 0;
        let maxYearsSkill = '';
        let maxYears = 0;
        let maxLevelSkill = '';
        let maxLevel = 0;

        const userCategories = {};
        const userSkills = new Set();

        userData.data.forEach((skill) => {
            const years = parseYears(skill.years);
            const level = parseLevel(skill.level);
            totalYears += years;
            totalLevel += level;

            if (years > maxYears) {
                maxYears = years;
                maxYearsSkill = skill.skill;
            }

            if (level > maxLevel) {
                maxLevel = level;
                maxLevelSkill = skill.skill;
            }

            userCategories[skill.category] = (userCategories[skill.category] || 0) + 1;
            userSkills.add(skill.skill);
        });

        const avgYears = totalYears / userData.data.length;
        const avgLevel = totalLevel / userData.data.length;

        const allSkills = {};
        const popularCategories = {};
        let totalSkills = 0;

        allData.data.forEach((category) => {
            category.skills.forEach((skill) => {
                allSkills[skill.skill] = (allSkills[skill.skill] || 0) + 1;
                totalSkills++;
                popularCategories[category.category] = (popularCategories[category.category] || 0) + 1;
            });
        });

        const uniqueSkills = Object.entries(allSkills)
            .filter(([skill, count]) => userSkills.has(skill))
            .sort((a, b) => a[1] - b[1])
            .slice(0, 3);

        const popularSkillInUserSet = Object.keys(allSkills).filter((skill) => userSkills.has(skill));

        return (
            <div>
                <h2>Your Skills Statistics</h2>
                <p>Number of skills: {userData.data.length}</p>
                <p>Average years of experience per skill: {avgYears.toFixed(2)}</p>
                <p>Average level of experience per skill: {levelToWords(avgLevel)}</p>
                <p>Skill with most years of experience: {maxYearsSkill} ({maxYears} years)</p>
                <p>Skill with highest level of experience: {maxLevelSkill} (Level {levelToWords(maxLevel)})</p>
                <h2>Comparative Statistics</h2>
                <p>Your unique skills: {uniqueSkills.map(([skill, count]) => `${skill} (found in ${count} other users)`).join(', ') || 'None'}</p>
                <p>Your popular skills: {popularSkillInUserSet.join(', ') || 'None'}</p>
                <p>Your skills distribution compared to the overall skill distribution:</p>
    {Object.entries(userCategories).map(([category, count]) =>
        <p key={category}>For the "{category}" category, it forms {Math.round(count / userData.data.length * 100)}% of your skills, while it forms {Math.round((popularCategories[category] || 0) / totalSkills * 100)}% of all skills in the platform.</p>
    )}
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
};

export default UserStats;
