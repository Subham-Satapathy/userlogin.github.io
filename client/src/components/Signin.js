import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";


const Signin = () => {

  const[email,setEmail]= useState('');
  const[password,setPassword]= useState('');
  const navigate = useNavigate();
  const loginUser = async(e)=>{
      e.preventDefault();
      const res = await fetch('/signin', {
        method: "POST",
        headers: {
          "Content-Type": "Application/json"
        },
        body: JSON.stringify({
          email, password
        })
      })
      if(res.status===400 || !res){
        window.alert("Enter mandatory fields");
        console.log("Invalid email or password");
      }else if(res.status===421 || !res){
        window.alert("Invalid email or password");
        console.log("Invalid email or password");
      }else{
        window.alert("Authorization is successful!");
        console.log("Signin done");
        navigate("/Users");
      }
  }
  return (
    <>
        <div className="container">
    <h2>Sign In</h2>
    <form method='POST'>
      <div className="input-box">
        <input type="text" name = "email" placeholder="Enter your email" value={email} onChange = {(e)=>setEmail(e.target.value)} required/>
      </div>
      <div className="input-box">
        <input type="password" name = "password" placeholder="Enter your password" value={password} onChange = {(e)=>setPassword(e.target.value)} required/>
      </div>
      <div className="input-box button">
        <input type="Submit" value="Sign In" onClick={loginUser}/>
      </div>
      <div className="text">
        <h3>Don't have an account? <Link to="/Signup">Regsister now</Link></h3>
      </div>
    </form>
  </div>
  
    </>
  )
}

export default Signin

