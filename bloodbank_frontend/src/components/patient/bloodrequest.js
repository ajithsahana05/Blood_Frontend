/* eslint-disable react/style-prop-object */
import React from "react";
import {  useState } from 'react';
import {useEffect} from 'react';
import Header from "./header";
import Sidebar from "./sidebar";
import './sidebarclass.css';
import { BloodGroupList,BloodRequestCreate } from "../../services/bloodbankService";
import {useNavigate} from 'react-router-dom';

function BloodRequest(){
    const navigate = useNavigate();
    const [options, setData] = useState([]);
    const [name,setName] = useState("");
    const [age,setAge] = useState("");
    const [reason,setReason] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [unit,setUnit] = useState("");

    useEffect(() => {
        const fetchData = async () => {
          const result = await BloodGroupList();
          console.log(result.data,"????????????????????");
          setData(result.data["list"]);
        };
      
        fetchData();
      }, []);

const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            profile_id:sessionStorage.getItem("userId"),
            patient_name:name,
            patient_age:age,
            reason:reason,
            blood_group:Number(selectedOption),
            unit:unit
        }
        BloodRequestCreate(formData).then(response => {
            if (response.data["status"] === "success") {
                alert(response.data["message"]);
                navigate('/patient/blood/request/history');
            }
            else {
                alert(response.data["message"]);
            }
        })

      }

const handleNameChange = (event) => {
    setName(event.target.value);
  }

const handleAgeChange = (event) => {
    setAge(event.target.value)
}
const handleReasonChange = (event) => {
    setReason(event.target.value)
}
const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

    return (
        <div>
            <Header />
        <Sidebar />

        <div className="main-content1" > 
        <div class="merkbox">
        <div class="merktitel">
    <p>
        BLOOD REQUEST
    </p>
  </div>
  <form action="/form/submit" method="post" onSubmit={handleSubmit}>
    <div class="textFont">
      <label>Patient name</label>
      <input type="text" onChange={handleNameChange} />
    </div>
    <div class="textFont">
      <label>Patient age</label>
      <input type="text" onChange={handleAgeChange} />
    </div>
    <div class="textFont">
      <label>Reason</label>
      <input type="text" onChange={handleReasonChange} />
    </div>
    <div>
    <label class="textFont">Blood Group</label>
    {/* <select className="select1" >
    <option value="">Please choose an option</option>
    <option value="dog">Dog</option>
    <option value="cat">Cat</option>
    <option value="hamster">Hamster</option>
    <option value="parrot">Parrot</option>
    <option value="spider">Spider</option>
    <option value="goldfish">Goldfish</option>
</select> */}
<select className="select1" onChange={handleOptionChange}>

      <option>Select blood group</option> 
      {options.map(option => (
        
        <option value={option.id}>{option.blood_group}</option>
      ))}
    </select>
  </div>
  <div class="textFont">
  <label>Unit (in ml)</label>
  <input type="text" onChange={handleUnitChange} />
</div>
<button class="button">DONATE</button>
  </form>
        </div>
        </div>
        </div>

      
    );
}

export default BloodRequest;