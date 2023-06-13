import { useEffect, useState } from "react"

export default function AddUserSkill(){

    const [skillStructure,setSkillStructure] = useState([])
    const [newSkill,setNewSkill] = useState({
        category:"",
        skill:"",
        subSkill:[],
        level:"",
        years:""
    })
    
    var skillList =[];
    var subSkillList = [];


    const handleCategorySelection = (categoryName) =>{
        setNewSkill({...newSkill,category:categoryName})
        skillList = skillStructure.find(({ category: c }) => c === categoryName)?.skills
    }

    const handleSkillSelection = (skillName) =>{
        setNewSkill({...newSkill,skill:skillName})
        subSkillList = skillOptions.find(({ skill: s }) => s === skillName)?.subSkills 
    }
    const getSkillStructure = () =>{
        fetch(apiurl+"/skilllist")
        .then(res =>{
          if(res.redirected){
          window.location.replace(res.url);
            }
          else if(res.status == 200){
            res.json()
             .then(data =>{
                setSkillStructure(data.data);
            })
            }
    
        })
        .catch(err =>{
            console.log(err.message)
        })
    
    }

    useEffect(()=>{
        getSkillStructure()
    },[])
    return(
        <div className="user-skill-form">
            <select onChange={(e) => handleCategorySelection(e.target.value)} value={category}>
                <option value="">Select category</option>
                {skillStructure.map(({ category }, i) => (
                <option key={i} value={category}>{category}</option>
                ))}
            </select>

                    
            <select onChange={(e) => setSkill(e.target.value)} value={skill}>
                <option value="">Select skill</option>
                {skillOptions.map(({ skill }, i) => (
                    <option key={i} value={skill}>{skill}</option>
                ))}
            </select>
            
 
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
            


            <div>
            <select
                value={year}
                onChange={(e) => setNewSkill({...newSkill,years:e.target.value})}
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
                onChange={(e) => setNewSkill({...newSkill,level:e.target.value})}
            >
                <option value="">Level of Expertise</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
            </select>

            <button onClick={addSkill} disabled={!category || !skill || !subSkill.length || !year || !level }>Add Skill</button>
                </div>
        </div>
    )
}