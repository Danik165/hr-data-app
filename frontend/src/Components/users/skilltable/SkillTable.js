import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useEffect, useState } from "react";
import './skilltable.css';
import { MDBIcon } from 'mdb-react-ui-kit';
import { apiurl } from '../../../utils/HostData';
import AddUserSkill from './addskill/AddSkill';
import {
  Button, Modal, ModalFooter,
  ModalHeader, ModalBody
} from "reactstrap"




const UserPage = ({id}) => {
  const [category, setCategory] = useState("");
  const [skill, setSkill] = useState("");
  const [subSkill, setSubSkill] = useState([]);
  const [year, setYear] = useState("");
  const [level, setLevel] = useState("");
  const [certificate, setCertificate] = useState("");
  const [userSkills, setUserSkills] = useState([]);
  const [skillStructure,setSkillStructure] = useState([]);
  const [showAddSkillForm,setShowAddSkillForm] = useState(false)

  const toggleAddSkillForm = () => setShowAddSkillForm(!showAddSkillForm);

const skillOptions = category ? skillStructure.find(({ category: c }) => c === category)?.skills : [];


const subSkillOptions = skill ? skillOptions.find(({ skill: s }) => s === skill)?.subSkills : [];


const delConfirmation = ({index}) =>{
  confirmAlert({
    title:"Confirm Remove",
    message:"Are you sure you want to remove this skill?",
    buttons:[
      {
        label:"Yes",
        onClick:() => removeSubSkill(index)
      },  
      {
        label:"No",
        onClick:() => {return false}
      }  
    ]  
  })  
}  

const handleSubSkillChange = (sub) => {
    
    if (subSkill.includes(sub)) {
      setSubSkill(subSkill.filter(s => s !== sub));
    } else {
      setSubSkill([...subSkill, sub]);
    }  
  };  

const handleEditSkill = (index) => {

  const skillToEdit = userSkills.filter((obj,i) => obj.listId === index)[0];

  setCategory(skillToEdit.category);
  setSkill(skillToEdit.skill);
  setSubSkill(skillToEdit.subSkills);
  setYear(skillToEdit.years);
  setLevel(skillToEdit.level);
  setUserSkills(userSkills.filter((obj, i) => obj.listId !== index));
  removeSubSkill(index)
};  

const removeSubSkill = async (index) => {
  fetch(apiurl+"/deleteuserskill?" + new URLSearchParams({userskillId:index}),{
    method:"DELETE"
  } )  
  .then(response => {
    if(response.status == 200){
      setUserSkills(userSkills.filter((obj, i) => obj.listId !== index));
      confirmAlert({
        title:"Success",
        message:"Skill Removed Successfully",
        buttons:[
            {
                label:"Ok"
            }
        ]
        })
    }  
  })  
  .catch(err =>{
    console.log(err)
    alert("Error in Removing User Skill Try Again");
  })  
 
};  


const fetchSubSkillsbyid = async (url) =>{

  fetch(url)
  .then(response =>{
    if(response.redirected){
      window.location.replace(response.url);
    }
    else if(response.status ==200){
      response.json()
      .then(skillList =>{
        const data = skillList.data;

      setUserSkills([...data])

       })
    }
  })
  .catch(err =>{
    console.log("Error in fetchin subskills",err)
  })
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
 
useEffect(() =>{
    getSkillStructure();
    if(id){
      const url = apiurl+"/getallskillsofuser?" + new URLSearchParams({userId:id})
      fetchSubSkillsbyid(url)
    }
    else{
        const userUrl = apiurl+"/getallskills";
        fetchSubSkillsbyid(userUrl)
      //console.log("Fetch sub skills for the user")
    }
  },[])
return (
  <div className='skill-container'>
    <div className='skill-header'>
      <h2 >Skills</h2>
      <button onClick={toggleAddSkillForm} >Add new skill</button>
        <Modal isOpen={showAddSkillForm}  toggle={toggleAddSkillForm}>
            <ModalBody>
              <AddUserSkill id={id} toggleModal={toggleAddSkillForm}/>
            </ModalBody>

      </Modal>
    </div> 
    <div className="main-content">
      <table className="overflow-hidden">
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
          {userSkills.map(({ listId,category, skill, subSkills, years, level, certificate }, i) => (
            <tr key={listId}>
              <td>{category}</td>
              <td>{skill}</td>
              <td>{subSkills.join(', ')}</td>
              <td>{years}</td>
              <td>{level}</td>
              <td>
                {/* <button onClick={() => handleEditSkill(listId)} ><MDBIcon fas icon="pen" /></button> */}
                <button onClick={() => delConfirmation({index:listId})} ><MDBIcon fas icon="trash-alt" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

};

export default UserPage;
