import React, { useState } from 'react'
import {Navigate} from 'react-router-dom';

export default function Loginpage() {

  const [username,setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function login(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/market/user/login',{
      method : 'POST',
      body:JSON.stringify({ username, password}),
      headers:{'Content-Type':'application/json'},
      credentials:'include',
    });
    if (response.ok){
        setRedirect(true);
    } else {
      alert('wrong credentials');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <form onSubmit={login}>
      <input type="text" placeholder='username' value={username} onChange={ev=>setUsername(ev.target.value)} />
      <input type="password" placeholder='password' value={password} onChange={ev=>setPassword(ev.target.value)}/>
      <button>Login</button>
    </form>
  )
}
