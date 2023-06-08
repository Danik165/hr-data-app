import {confirmAlert} from 'react-confirm-alert';
import { useEffect, useState } from 'react';
import './certificatetable.css';
import { MDBIcon } from 'mdb-react-ui-kit';
import { apiurl } from '../../../utils/HostData';
export default function CertificateTable({id}){
    const [userCertificates,setUserCertificates] = useState([]);

    const [errorMsg,setErrorMsg] = useState('')
    const handleEditCertificate = (index) =>{
        console.log("Handle Edit Called for ",index);
    }
    
    const delCertificateConfirmation = (index) =>{
        console.log("Del Confirmation Called for ",index);
        confirmAlert({
            title:"Confirm Remove",
            message:"Are you sure you want to remove this skill?",
            buttons:[
              {
                label:"Yes",
                onClick:() => removeCertificate(index)
              },  
              {
                label:"No",
                onClick:() => {return false}
              }  
            ]  
          })  
    }


    const removeCertificate = (index) =>{
        console.log("Remove Certificate Called for",index)
    }
    const fetchCertificate = ({url}) =>{
        fetch(url)
        .then((response)=>{
            if(response.redirected){
                window.location.replace(res.url);
            }
            else if(response.status == 200){
                response.json()
                .then(data =>{
                   // console.log(data)
                    setUserCertificates(data.data)
                })
            }
        })
        .catch(err =>{
            console.log(err);
            setErrorMsg(err.message)
        })
    }

    useEffect(() =>{
        if(id){
            const adminUrl = apiurl + "/certificatesofuser?" + new URLSearchParams({userId:id})
            fetchCertificate({url:adminUrl});
        }
        else{
            const userUrl = apiurl + "/certificates";
            fetchCertificate({url:userUrl})
        }
    },[])
    return(
        <div class='certificate-table-container'>
           <table>
            <thead>
                <tr>
                    <th>Certificate Name</th>
                    <th>Issue Date</th>
                    <th>Valid Till Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {userCertificates.map((obj,i) =>(
                    <tr key={obj.User_CertificatesID}>
                        <td>{obj.CertificateName}</td>
                        <td>{new Date(obj.Certificate_issue_date).toDateString().slice(3)}</td>
                        <td>{new Date(obj.Certificate_validity_date).toDateString().slice(3)}</td>
                        <td>
                            <button onClick={() => handleEditCertificate(obj.User_CertificatesID)} ><MDBIcon fas icon="pen" /></button>
                            <button onClick={() => delCertificateConfirmation(obj.User_CertificatesID)} ><MDBIcon fas icon="trash-alt" /></button>
                        </td>
                    </tr>
                ))}
            </tbody>
           </table>
        </div>
    )
}