import { useState } from 'react'
import './AddUserCertificate.css';
import { confirmAlert } from 'react-confirm-alert';
import {apiurl} from '../../../../utils/HostData'
export default function AddUserCertificate({id,toggleForm}){

    const [error,setError] = useState('')
    const [newCertificate,setNewCertificate] = useState({
        Certificate_Name:"",
        Issue_date:"",
        Validity_date:""
    })

    const validateInput = () =>{
        if(newCertificate.Certificate_Name == ""){
            setError("Certificate Name cannot be Null")
            return false;
        }
        if(newCertificate.Issue_date == ''){
          setError("Issue Date cannot be null")
          return false
        }
        if(newCertificate.Validity_date == ''){
          setError("Validity Date cannot be null")
          return false
        }
        if(new Date(newCertificate.Issue_date) > new Date(newCertificate.Validity_date))
        {
          setError("Issue Date cannot be later than validitity date")
          return false
        }
        return true
    }

    const addCertificate = (e) =>{
        e.preventDefault();
        if(validateInput()){
        var inserturl,tempObj;
        if(id){
              inserturl = apiurl + "/certificateofuser"
             tempObj = {...newCertificate,userId:id}
         }
         else{
            inserturl = apiurl + "/certificate";
            tempObj = {...newCertificate}
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
            setError(err.message)
          })
        }
    }
    return(
        <div className='add-certificate-form-container'>
            <h2>Add a New Certificate</h2>
            <form className='add-certificate-form'>
                <label>Certificate Name:</label>
                <input type="text" onChange={e => setNewCertificate({...newCertificate,Certificate_Name:e.target.value})}/>

                <label>Issue Date:</label>
                <input type="date" onChange={e => setNewCertificate({...newCertificate,Issue_date:e.target.value})}/>

                <label> Valid Till:</label>
                <input type="date" onChange={e => setNewCertificate({...newCertificate,Validity_date:e.target.value})}/>
                <p>{error}</p>
                <button type='submit' onClick={e => addCertificate(e)}> Submit </button>
            </form>
        </div>
    )
}