import React from "react";
import {  useState } from 'react';
import {useEffect} from 'react';
// import axios from 'axios';
import  {UserSignup}  from "../services/bloodbankService";
import {useNavigate} from 'react-router-dom';
import { BloodGroupList } from "../services/bloodbankService";
import './patient/sidebarclass.css';
// ChangeEvent
function Signup(){
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [age,setAge] = useState("");
    const [address,setAddress] = useState("");
    const [email,setEmail] = useState("");
    const [mobileno,setMobileNo] = useState("");
    const [disease,setDisease] = useState("");
    const [password,setPwd] = useState("");
    const [profiletype,setProfileType] = useState("");
    const [file, setFile] = useState(null);
    const [selectedOption, setSelectedOption] = useState("");
    const [options, setData] = useState([]);
    const [formValid, setFormValid] = useState(false);


    useEffect(() => {
      const fetchData = async () => {
        const result = await BloodGroupList();
        console.log(result.data,"????????????????????");
        setData(result.data["list"]);
      };
    
      fetchData();
    }, []);


  
    // const [name, setName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name',name);
        formData.append('profile_image', file);
        formData.append('age',age);
        formData.append('address',address);
        formData.append('email',email);
        formData.append('mobile_no',mobileno);
        formData.append('disease',disease);
        formData.append('password',password);
        formData.append('blood_group',selectedOption);
        formData.append('profile_type',profiletype);

        UserSignup(formData)
      .then(response => {
        console.log(response.data);
        if (response.data["status"] === "success") {
          alert(response.data["message"]);
        navigate('/login');
        }
        else{
          alert("Something went wrong");
        }
        
      })
      .catch(error => {
        console.log(error);
      });


  };

  

  const handlePwdChange = (event) => {
    setPwd(event.target.value);
    // checkFormValidity();
  }


  const handleNameChange = (event) => {
    const re = /^[A-Za-z]+$/;
    if (re.test(event.target.value) || event.target.value === "") {
      setName(event.target.value);
      checkFormValidity();
    }
    
  }
  const handleAgeChange = (event) => {
    setAge(event.target.value);
  }
  const handleEmailChange = (event) => {
    setEmail(event.target.value.toLowerCase());
    checkFormValidity();
  }
  const handleMobileChange = (event) => {
    setMobileNo(event.target.value);
  }
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  }
  const handleDiseaseChange = (event) => {
    setDisease(event.target.value);
  }
  const handleProfileTypeChange = (event) => {
    setProfileType(event.target.value);
    checkFormValidity();
    
  }
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  }
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value,"?????????????????");
    checkFormValidity();
    setSelectedOption(event.target.value);
    checkFormValidity();
  };

  // const checkFormValidity = () => {
  //   if (name !== "" && email !== "" && password !== "" && selectedOption !== "" && profiletype !== "") {
  //     setFormValid(true);
  //   } else {
  //     setFormValid(false);
  //   }
  // }

  const checkFormValidity = () => {
    if (name !== "" && email !== "" && selectedOption !== ""  && profiletype !== "") {
      setFormValid(true);
      console.log("Yesssssssssssss");
    } else {
      setFormValid(false);
      console.log("Noooooooooooooooo");
    }
  }
const profileTypeOption = [{"id":1,"type":"Patient"},{"id":2,"type":"Donor"}]





    return (
      
        <div>
          <div class="merkbox">
        <div class="merktitel">
            <p>Login</p>
        </div>
             <form onSubmit={handleSubmit}>
                <input type="text" id="name" onChange={handleNameChange} name="name" maxLength={20} placeholder="Enter your name" /><br></br>
                <input type="number" id="age" onChange={handleAgeChange} name="age" maxLength={2} placeholder="Enter your age"/><br></br>
                <input type="email" id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$]" onChange={handleEmailChange} name="email" placeholder="Enter your email"  /><br></br>
                <input type="number" id="mobileno" onChange={handleMobileChange} maxLength={10} name="mobileno" placeholder="Enter your mobile no"/><br></br>
                <input type="text" id="address" onChange={handleAddressChange}  name="address" placeholder="Enter your address"/><br></br>
                <input type="text" id="disease" onChange={handleDiseaseChange} name="disease" placeholder="Enter your disease"/><br></br>
                <input type="password" id="pwd" onChange={handlePwdChange} name="pwd" placeholder="Enter your password"  /> <br></br>
                <select class="select1" onChange={handleProfileTypeChange} >
                <option>Select Profile Type</option>
                {profileTypeOption.map(option => (
        <option value={option.id}>{option.type}</option>
      ))}
                </select><br></br>
                {/* <input type="text" id="profiletype" onChange={handleProfileTypeChange} name="profiletype" placeholder="Enter your password"/> <br></br> */}
                <input type="file" id="profileimage" name="profileimage" onChange={handleFileChange} /><br></br>
                
      <select class="select1" onChange={handleOptionChange} >
      <option>Select blood group</option> 
      {options.map(option => (
        
        <option value={option.id}>{option.blood_group}</option>
      ))}
    </select><br></br>
      <button class="button" type="submit" disabled={!formValid}>Upload File</button><br></br>
    </form>
        </div>
        </div>
    )
}

export default Signup; 