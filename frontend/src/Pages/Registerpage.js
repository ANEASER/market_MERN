import React, { useState } from 'react'
import {Navigate} from 'react-router-dom';

export default function Registerpage() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email , setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function register(e){
      e.preventDefault();
      const response = await fetch('http://localhost:4000/market/user/register',{
        method:'POST',
        body:JSON.stringify({username,password,email,firstname,lastname}),
        headers:{'Content-Type' : 'application/json'},
      });
      if (response.status === 200){
        alert('register success');
        setRedirect(true);
      } else {
        alert('registration failed');
      }

  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <form onSubmit={register}>
      <input type="text" placeholder='username' value={username} onChange={e => setUsername(e.target.value)}/>
      <input type="password" placeholder='password' value={password} onChange={e => setPassword(e.target.value)}/>
      <input type="text" placeholder='email' value={email} onChange={e => setEmail(e.target.value)}/>
      <input type="text" placeholder='firstname' value={firstname} onChange={e => setFirstname(e.target.value)}/>
      <input type="text" placeholder='lastname' value={lastname} onChange={e => setLastname(e.target.value)}/>
      <button>Register</button>
    </form>
  )
}
