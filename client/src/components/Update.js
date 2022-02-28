import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const Update = () => {
  const params = useParams();
  const [user, setUser] = useState({
    username: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const updateUser = async (e) => {
    e.preventDefault();
    const username = user;
    console.log(username);
    let result = await fetch(`http://localhost:3000/update/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(username),
    });
    // console.log(result);
    if(result.status===200){
      window.alert("Updated successfully");
    }else{
      window.alert("Could not update your data");
    }
    navigate('/users')
  };

  return (
    <>
      <div className="container">
        <h2>Update your details</h2>
        <form method="POST">
          <div className="input-box">
            <input
              type="email"
              name="username"
              placeholder="Enter your new username"
              value={user.uname}
              onChange={handleInputs}
              required
            />
          </div>
          
          <div className="input-box button">
            <input type="Submit" value="Update" onClick={updateUser} />
          </div>
        </form>
      </div>
    </>
  );
};

export default Update;
