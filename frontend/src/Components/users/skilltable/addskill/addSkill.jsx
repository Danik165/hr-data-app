import { useEffect, useState } from "react";
import { apiurl } from "../../../../utils/HostData";
import { confirmAlert } from "react-confirm-alert";
import "./addSkill.css";
export default function AddUserSkill({ id, toggleModal }) {
  //var inserturl = "dgsd";
  const [skillStructure, setSkillStructure] = useState([]);
  const [newSkill, setNewSkill] = useState({
    category: "Select Category",
    skill: "Select Skill",
    subSkillList: [],
    level: "",
    years: "",
  });

  const [skillList, setSkillList] = useState([]);
  const [subSkillList, setSubSkillList] = useState([]);
  const [userSubSkills, setUserSubSkills] = useState([]);
  const [error, setError] = useState("");

  const handleCategorySelection = (categoryName) => {
    if (categoryName === "Select Category") {
      setNewSkill({ ...newSkill, category: "Select Category" });
      setSkillList([]);
      setSubSkillList([]);
      setUserSubSkills([]);
    } else {
      setNewSkill({ ...newSkill, category: categoryName });
      setSkillList(
        skillStructure.find(({ category: c }) => c === categoryName)?.skills
      );
      setSubSkillList([]);
      setUserSubSkills([]);
      unselectskill();
    }
  };

  const handleSkillSelection = (skillName) => {
    console.log(skillName);
    if (skillName === "Select Skill") {
      setNewSkill({ ...newSkill, skill: "Select Skill" });
      setSubSkillList([]);
      setUserSubSkills([]);
      return;
    } else {
      setNewSkill({ ...newSkill, skill: skillName });
      setSubSkillList(
        skillList.find(({ skill: s }) => s === skillName)?.subSkills
      );
      setUserSubSkills([]);
      unselectall();
    }
  };
  const getSkillStructure = () => {
    fetch(apiurl + "/skilllist")
      .then((res) => {
        if (res.redirected) {
          window.location.replace(res.url);
        } else if (res.status == 200) {
          res.json().then((data) => {
            setSkillStructure(data.data);
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const unselectskill = () => {
    document.getElementById("skill-dropdown").selectedIndex = 0;
  };

  const unselectall = () => {
    var inputs = document.querySelectorAll(".subskill-check");
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].checked = false;
    }
  };
  const handleSubSkillChange = (sub) => {
    setUserSubSkills([...userSubSkills, sub]);
    //setNewSkill({...newSkill,subSkillList:userSubSkills})
  };

  function validateInput() {
    if (newSkill.category === "Select Category") {
      setError("Please Select Category");
      return false;
    }
    if (newSkill.skill === "Select Skill") {
      setError("Please Select Skill");
      return false;
    }
    if (userSubSkills.length === 0) {
      setError("Please Select Sub Skill");
      return false;
    }
    if (newSkill.years === "") {
      setError("Please Select Years");
      return false;
    }
    if (newSkill.level === "") {
      setError("Please Select Level");
      return false;
    }

    return true;
  }
  const addSkill = async () => {
    var inserturl, tempObj;
    if (validateInput()) {
      if (id) {
        inserturl = apiurl + "/addSkillforuser";
        tempObj = { ...newSkill, subSkillList: userSubSkills, userId: id };
      } else {
        inserturl = apiurl + "/addSkill";
        tempObj = { ...newSkill, subSkillList: userSubSkills };
      }
      fetch(inserturl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...tempObj }),
      })
        .then((response) => {
          if (response.redirected) {
            window.location.replace(response.url);
          } else if (response.status == 201) {
            toggleModal();
            confirmAlert({
              title: "Success",
              message: "Skill Set Added Successfully",
              buttons: [
                {
                  label: "Ok",
                  onClick: () => window.location.reload(),
                },
              ],
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    getSkillStructure();
  }, []);

  return (
    <div className="user-skill-form">
      <h2> Add User Skill Form</h2>
      <select onChange={(e) => handleCategorySelection(e.target.value)}>
        <option key={0} value="Select Category">
          Select category
        </option>
        {skillStructure.map(({ category }, i) => (
          <option key={i} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => handleSkillSelection(e.target.value)}
        id="skill-dropdown"
      >
        <option key={0} value="Select Skill">
          Select skill
        </option>
        {skillList.map(({ skill }, i) => (
          <option key={i} value={skill}>
            {skill}
          </option>
        ))}
      </select>

      {subSkillList != [] &&
        subSkillList.map((sub, index) => (
          <label key={index}>
            <input
              type="checkbox"
              //  checked={subSkill.includes(sub)}
              onChange={() => handleSubSkillChange(sub)}
              className="subskill-check"
            />
            {sub}
          </label>
        ))}

      <select
        onChange={(e) => setNewSkill({ ...newSkill, years: e.target.value })}
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
        onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
      >
        <option value="">Level of Expertise</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
        <option value="Expert">Expert</option>
      </select>

      {error && <p className="err-message">*{error}</p>}
      <button onClick={addSkill}>Add Skill</button>
    </div>
  );
}
