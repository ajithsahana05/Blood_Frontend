import React from "react";
import {  useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserLogin } from "../services/bloodbankService";
import {useNavigate} from 'react-router-dom';
import './patient/sidebarclass.css';

function Login(){
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const[pwd,setPwd] = useState("");
    
      const handleSubmit = (event) => {
        event.preventDefault(); 
          console.log(email,pwd);
          UserLogin({email:email,password:pwd}).then(response => {
            console.log(response.data);
            if (response.data["status"] === "success") {
                sessionStorage.setItem("userId",response.data["details"]["id"])
                if (response.data["details"]["profile_type"] === 1) {
                    console.log("Patient loginnnn");
                    navigate('/patient/dashboard');
                }
                else {
                    console.log("Donor loginnnn");
                    navigate('/donor/dashboard');
                }
                toast.success(response.data["message"], {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
            }
            else{
                toast.success(response.data["message"], {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
            }
        })
            
      
    
    };


    const handleEmailChange = (event) => {
        setEmail(event.target.value.toLowerCase());
    };

    const handlePwdChange = (event) => {
        setPwd(event.target.value);
    };
    return (
        <div>
            <div class="merkbox">
        <div class="merktitel">
            <p>Login</p>
        </div>
            <form onSubmit={handleSubmit}>
            <div class="textFont">
            <label>Email</label>
            <input type="email" id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$]" onChange={handleEmailChange} name="email" placeholder="Enter your email"  /><br></br>
            </div>
            <div class="textFont">
            <label>Password</label>
            <input type="password" id="pwd" onChange={handlePwdChange} name="pwd" placeholder="Enter your password"  /> <br></br>
            </div>
            <ToastContainer />
            <button class="button">Click</button>
        </form>
            </div>
        </div>
    )
}
export default Login;