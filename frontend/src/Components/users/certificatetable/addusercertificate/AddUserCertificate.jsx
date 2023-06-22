import { useEffect, useState } from 'react'
import './AddUserCertificate.css';
import { confirmAlert } from 'react-confirm-alert';
import {apiurl} from '../../../../utils/HostData'

const  certificateProviderList =new Set() ;

export default function AddUserCertificate({id,toggleForm}){

    const [error,setError] = useState('');
    const [certificateList,setCertificateList] = useState([]);
    const [newCertificate,setNewCertificate] = useState({
        Certificate_Name:"",
        Issue_date:"",
        CertificateProvider:"",
        Validity_date:"",
        Certificate_ID:0
    })

    const validateInput = () =>{
        if(newCertificate.Certificate_ID == 0){
            setError("Please Select a Certificate")
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
        if(new Date(newCertificate.Issue_date) >= new Date(newCertificate.Validity_date))
        {
          setError("Validity Date should be later than Issue Date")
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
                    message:"Certificate Added Successfully",
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

    

    const getCertificateList = () =>{
      fetch(apiurl+'/listcertificates')
      .then(response =>{
        if(response.redirected){
          window.location.reload(response.url)
        }
        else if(response.status == 200){
          response.json()
          .then(data =>{
            for (let i=0;i<data.data.length;i++){
             // console.log(data.data[i].CertificateProvider)
              certificateProviderList.add(data.data[i].CertificateProvider)
            }
            setCertificateList(data.data)
            setNewCertificate({...newCertificate,CertificateProvider:data.data[0].CertificateProvider})
          })
        }
      })
      .catch(err =>{
        setError(err.message)
      })
    }

    
    useEffect(()=>{
      getCertificateList();
    },[])
    return(
        <div className='add-certificate-form-container'>
            <h2>Add a New Certificate</h2>
            {console.log(newCertificate)}
            <form className='add-certificate-form'>
                <label>Certificate Provider:</label>
                <select onChange={(e) => setNewCertificate({...newCertificate,CertificateProvider:e.target.value})}>
                  { [...certificateProviderList].map((obj,i) =>
                    <option key={i} value={obj}>{obj}</option>
                    )}
                  </select>
                <label>Certificate Name:</label>
                  <select onChange={(e) => setNewCertificate({...newCertificate,Certificate_ID:e.target.value})}>
                    <option>Select Certificate Name</option>
                {
                   certificateList.filter( obj => obj.CertificateProvider == newCertificate.CertificateProvider).map((obj,i) =>(
                    <option key={obj.CertificateID} value={obj.CertificateID}>{obj.CertificateName}</option>
                   )) 
                }
                </select>
                {/* <input type="text" onChange={e => setNewCertificate({...newCertificate,Certificate_Name:e.target.value})}/> */}

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