import React, {useState, useEffect }from 'react';
import { Link} from "react-router-dom";
const Usersdata = () => {
        const[users, setUser] = useState([]);

        useEffect(()=>{
            getUsers();
        },[])
        const getUsers = async()=>{
            let result = await fetch('http://localhost:3000/users');
            result = await result.json();
            setUser(result);
        }
        console.warn(users);

        return(
            <>
            
        <div className="main">
            <div class="container_u">
            {
                users.map((item)=>{
                    return(
                        <div class="tab">
                            <div class="tab-header" key={item.id}>
                                
                                <div class="name">
                                    <h1 class="mx-3">{item.username}</h1>
                                </div>
                                <div class="email mx-3">
                                    <h3>Email:{item.email}</h3>
                                </div>
                                
                                <div className='btn'>
                                <Link to= {"/update/"+item._id}>
                                    <button id="button3">Update</button>
                                </Link>
                                </div>
                            </div>
                    
                        </div>
                )
                })
            }
                
    
            </div>
        </div>
            </>
        )
}

export default Usersdata
