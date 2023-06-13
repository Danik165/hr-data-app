import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import "./enteremail.css";
import logo from "../../Images/logo.png";
import { apiurl } from '../../utils/HostData';


const EnterEmail = () =>{
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [error,setError ] = useState('');
    const generateOTP = () =>{
        fetch(apiurl+"/forgotpassword?"+ new URLSearchParams({emailId:email}))
        .then((response)=>{
          response.json()
          .then((data) => {
              if(response.status == 200){
                navigate('/newpassword')

              }
              else{
                setError(data.message)
              }
          })
        })
        .catch(err =>{
            setError(err.message)
            console.log(err)
        })
    }
    return(
     
      <div class='d-flex justify-content-center align-items-center h-100 '>
      <div class="card d-flex justify-content-center align-items-center pt-3 pb-2" id="enter-email-card">
        <img class="card-img-top img-fluid" src={logo} alt="Jeevan Logo" id='Jeevan-logo-img-2' />
        <div class="card-body d-flex flex-column justify-content-center align-items-center mt-1">
          <h4 class="card-title ">Enter Email</h4 >
          <input type="email" class="input-field " value={email} onChange={(e) => setEmail(e.target.value)} required />
          {error &&  <p className="err-message">{error}</p>}
          <button type="submit" class="otp-btn mt-3" onClick={generateOTP}>Generate OTP</button>
        </div>
      </div>
      </div>
    )
};  

export default EnterEmail;
