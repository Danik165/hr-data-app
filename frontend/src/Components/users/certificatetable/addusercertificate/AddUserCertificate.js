import { useState } from 'react'
import './AddUserCertificate.css';
import { confirmAlert } from 'react-confirm-alert';
export default function AddUserCertificate({toggleForm}){


    const [newCertificate,setNewCertificate] = useState({
        certificateName:"",
        issueDate:"",
        validityDate:""
    })


    const addCertificate = (e) =>{
        e.preventDefault();
        console.log(newCertificate);
        toggleForm()
        confirmAlert({
            title:"Success",
            message:"Certificate Added",
            buttons:[
              {
                label:"Ok",
              }
            ]
      
          })

    }
    return(
        <div className='add-certificate-form-container'>
            <h2>Add a New Certificate</h2>
            <form className='add-certificate-form'>
                <label>Certificate Name:</label>
                <input type="text" onChange={e => setNewCertificate({...newCertificate,certificateName:e.target.value})}/>

                <label>Issue Date:</label>
                <input type="date" onChange={e => setNewCertificate({...newCertificate,issueDate:e.target.value})}/>

                <label> Valid Till:</label>
                <input type="date" onChange={e => setNewCertificate({...newCertificate,validityDate:e.target.value})}/>

                <button type='submit' onClick={e => addCertificate(e)}> Submit </button>
            </form>
        </div>
    )
}