import React, {useState} from 'react';

import { Link } from "react-router-dom";

import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const[user, setUser] = useState({
    username:"",email:"",password:"",cpassword:""
  });
  let name,value;
  const handleInputs = (e)=>{
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({...user, [name]:value});
    
  }
  const navigate = useNavigate();
  //Sending data to db using fetch API
  const sendData = async (e)=>{
      e.preventDefault();
      const{username, email, password, cpassword} = user;
      const res = await fetch("/signup",{
        method: "POST",
        headers: {
          "Content-Type": "Application/json"
        },
        body: JSON.stringify({
          username, email, password, cpassword
        })
      });
      if(res.status===422 || !res){
        window.alert("Password does not match");
        console.log("Registartion failed");
      }else if(res.status===451 || !res){
        window.alert("User already exists");
        console.log("Registartion failed");
      }else if(res.status===428 || !res){
        window.alert("Fill all mandatory fields");
        console.log("Registartion failed");
      }else{
        window.alert("User registration is successful!");
        console.log("Registartion done");
        navigate("/Signin");
      }
  }

  return (
    <>
      <div className="container">
    <h2>Register Now</h2>
    <form method='POST'>
      <div className="input-box">
        <input type="email" name = "username" placeholder="Enter your username" value={user.uname} onChange={handleInputs} required/>
      </div>
      <div className="input-box">
        <input type="text" name = "email" placeholder="Enter your email" value={user.email} onChange={handleInputs} required/>
      </div>
      <div className="input-box">
        <input type="password" name = "password" placeholder="Create your password" value={user.password} onChange={handleInputs} required/>
      </div>
      <div className="input-box">
        <input type="password" name = "cpassword" placeholder="Confirm your password" value={user.cpassword} onChange={handleInputs} required/>
      </div>
      <div className="input-box button">
        <input type="Submit" value="Register Now" onClick={sendData}/>
      </div>
      <div className="text">
        <h3>Already have an account? <Link to="/Signin">Signin now</Link></h3>
      </div>
    </form>
  </div>
    </>
  )
}

export default Signup

