import { useState } from 'react'
import './AddUserCertificate.css';
import { confirmAlert } from 'react-confirm-alert';
import {apiurl} from '../../../../utils/HostData'
export default function AddUserCertificate({id,toggleForm}){


    const [newCertificate,setNewCertificate] = useState({
        Certificate_Name:"",
        Issue_Date:"",
        Validity_Date:""
    })


    const addCertificate = (e) =>{
        e.preventDefault();
        console.log(newCertificate);
        var inserturl,tempObj;
        if(id){
              inserturl = apiurl + "/certificateofuser"
             tempObj = {...newCertificate,userId:id}
         }
         else{
            inserturl = apiurl + "/ceriticate";
            tempObj = {...newSkill}
         }

         fetch(inserturl,{
            method:"POST",
            headers:{
              'Content-Type':"application/json"
            },
            body:JSON.stringify({...tempObj})
        
          })
          .then(response =>{
            if(response.redirected){
              window.location.replace(response.url);
            }
            else if(response.status == 201){
                toggleForm()
                confirmAlert({
                    title:"Success",
                    message:"Skill Set Added Successfully",
                    buttons:[
                      {
                        label:"Ok",
                        onClick:() => window.location.reload()
                      }
                    ]
              
                  })
            }
          })
          .catch(err =>{
            console.log(err)
          })




       

    }
    return(
        <div className='add-certificate-form-container'>
            <h2>Add a New Certificate</h2>
            <form className='add-certificate-form'>
                <label>Certificate Name:</label>
                <input type="text" onChange={e => setNewCertificate({...newCertificate,Certificate_Name:e.target.value})}/>

                <label>Issue Date:</label>
                <input type="date" onChange={e => setNewCertificate({...newCertificate,Issue_Date:e.target.value})}/>

                <label> Valid Till:</label>
                <input type="date" onChange={e => setNewCertificate({...newCertificate,Validity_Date:e.target.value})}/>

                <button type='submit' onClick={e => addCertificate(e)}> Submit </button>
            </form>
        </div>
    )
}