import { useState,useEffect } from "react";
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBContainer,CDBDropDown,CDBDropDownMenu,CDBDropDownToggle,CDBDropDownItem } from 'cdbreact';
import './addskill.css'

const AddSkillForm = () => {
    const [email, setEmail] = useState('');
   // const [email, setEmail] = useState('');
    const [categoryEnabled, setCategoryEnabled] = useState(false);
    const [skillEnabled,setSkillEnabled] = useState(false)
    const [error, setError] = useState('');
    const [categorys,setCategorys] = useState([]);
    const [skills,setSkills] = useState([]);
    const [newSubSkill,setNewSubSkill] = useState({
      category:"",
      skill:"",
      subSkill:""
    })


    const addSkill = () => {
      console.log(newSubSkill)
      //console.log(newSubSkill)
      fetch("http://localhost:83/api/addnewsubskill",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({...newSubSkill })
      })
      .then(response =>{
        if(response.status === 201){
          console.log("Successfull Added")
          setError("Successfull Added")
        }
        else{
          setError("Unable to Add. Error Code" + response.status)
          //console.log("Error")
        }
      })
      .catch(err =>{
        setError(err.message)
        //console.log(err)
      })
    }

    const handleCategorySelecetion = (category) =>{
      if(category == "Add a new Category"){
        setCategoryEnabled(true)
        setSkills(["Add a new Skill"])
        setSkillEnabled(true)
      }
      else{
        fetchSkills(category)
        setCategoryEnabled(false);
        setNewSubSkill({...newSubSkill,category:category})
      }
      console.log("HandleCategory  Called")
    }
    const handleSkillSelection = (skill) =>{
      if(skill == "Add a new Skill"){
        setSkillEnabled(true)
      }
      else{
        setNewSubSkill({...newSubSkill,skill:skill})
        setSkillEnabled(false)
      }
      console.log("Handle Skill Called")
    }
    const fetchCategorys = () =>{
      fetch("http://localhost:83/api/categories")
      .then((response)=>{
          if(response.redirected){
            window.location.replace(response.url);
  
          }
          else {
            response.json()
              .then((categorylist) => {
                console.log(categorylist)
                
                for(let i = 0; i <categorylist.data.length ; i++){
  
                  setCategorys(oldArray => [...oldArray,categorylist.data[i]]);
                }
                setCategorys(oldArray =>[...oldArray,"Add a new Category"]);
                fetchSkills(categorylist.data[0])
                //setNewSubSkill({...newSubSkill,category:categorylist.data[0].CategoryName})
              })
            }
  
      })
      .catch(err =>{
        console.log(err.message);
        setError(err.message)
      })
    }
  
    const fetchSkills = (category) =>{
      
      console.log("Fetch Skills called")
      fetch("http://localhost:83/api/skillbycategory?" + new URLSearchParams({categoryName:category}))
      .then(response => {
        if(response.redirected){
          window.location.replace(response.url);
        }
        else {
          response.json()
          .then(skillList => {
            setSkills([])
            for(let i =0; i<skillList.data.length;i++){
              setSkills(oldArray => [...oldArray,skillList.data[i]])
            }
              setSkills(oldArray => [...oldArray,"Add a new Skill"])
              setNewSubSkill({...newSubSkill,skill:skillList.data[0],category:category})
          })
        }
      })
      .catch( err =>{
        console.log(err.message)
        setError(err.m)
      })
    }
    useEffect( () =>{ fetchCategorys(); },[]);
    
    return (
      <div class="skill-form-container">
      <CDBContainer>
        <CDBCard style={{ width: '30rem','border-radius':'0px 0px 10px 10px'  }}>
          <CDBCardBody className="mx-4">
            <div className="text-center mt-4 mb-2">
              <p className="h4 font-weight-bold"> Add Skill </p>
            </div>
            <label htmlFor="category">Select a category:</label>
          <br />
          <select id="category" name="category" className='category-dropdown' onChange={e => handleCategorySelecetion(e.target.value)}>
          {categorys.map(category => 
                <option id={category} value={category}>{category}</option>
          )}
          </select>
            { categoryEnabled && <CDBInput style={{'border-radius':'0px'}} label="New Category" type="text" icon="tags" iconClass="text-muted" onInput={e => setNewSubSkill({...newSubSkill,category:e.target.value})}/>}
            <label htmlFor="skill">Select a skill:</label>
          <select id="skill" name="skill" className='skill-dropdown' onChange={e => handleSkillSelection(e.target.value)}>
          {skills.map(skill => 
                <option key={skill} value={skill}>{skill}</option>
          )}
          </select>
           {skillEnabled && <CDBInput style={{'border-radius':'0px'}} label="New Skill" type="text" icon="stream" iconClass="text-muted" onInput={e => setNewSubSkill({...newSubSkill,skill:e.target.value})}/>  }
            <CDBInput style={{'border-radius':'0px'}} label="Sub-Skill-Name" type="text" icon="code-branch" iconClass="text-muted" onInput={e => setNewSubSkill({...newSubSkill,subSkill:e.target.value})} />
          
            {/* <CDBDropDown>
              <CDBDropDownMenu>
                <CDBDropDownItem>Select a Category</CDBDropDownItem>
              </CDBDropDownMenu>
            </CDBDropDown> */}
            <CDBBtn color="primary" style={{ width: '40%' }} className="btn-block mb-3 mt-3 mx-auto" onClick={addSkill}>
              Register
            </CDBBtn>
          </CDBCardBody>
        </CDBCard>
      </CDBContainer>
      </div>
    );
  };
  export default AddSkillForm;