import React, { useState } from 'react';
import {Navigate} from 'react-router-dom';

export default function VerifyMail() {

  const [otp,setOTP] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function verifymail(e){
    e.preventDefault();
    fetch('http://localhost:4000/market/user/verifyOTP',{
            method:'POST',
            body:JSON.stringify({otp}),
            headers:{'Content-Type' : 'application/json'},
          });
          setRedirect(true);
    } 

  if (redirect) {
    return <Navigate to={'/'} />
  }


  return (
    <form onSubmit={verifymail}>
      <input type="number" placeholder='OTP' value={otp} onChange={e => setOTP(e.target.value)}/>
      <button>Submit</button>
    </form>
  )
}
