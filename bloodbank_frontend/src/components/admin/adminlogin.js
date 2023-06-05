import React from "react";
import { useState } from 'react';
import { AdminLoginApi } from "../../services/bloodbankService";
import {useNavigate} from 'react-router-dom';

function AdminLogin() {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const[pwd,setPwd] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault(); 
        console.log(email,pwd,"?????????");
        AdminLoginApi({email:email,password:pwd}).then(response =>{
            console.log(response.data)
            if (response.data["status"] === "success") {
                alert(response.data["message"]);
                navigate('/admin/dashboard');
            }

        })

    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value.toLowerCase());
    };
    const handlePwdChange = (event) => {
        setPwd(event.target.value);
    };
    return(
        <div>
            <div class="merkbox">
        <div class="merktitel">
            <p>Login</p>
        </div>
            <form onSubmit={handleSubmit}>
            <input type="email" id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$]" name="email" onChange={handleEmailChange} placeholder="Enter your email"  /><br></br>
            <input type="password" id="pwd" name="pwd" onChange={handlePwdChange} placeholder="Enter your password"  /> <br></br>
            <button class="button">Click</button>
        </form>
            
        </div>
        </div>
    )
}

export default AdminLogin;