
import React from "react";
import {  useState } from 'react';
import {useEffect} from 'react';
import Header from "../patient/header";
import Sidebar from "./sidebar";
import "../patient/sidebarclass.css"
import { BloodGroupList } from "../../services/bloodbankService";
import {useNavigate} from 'react-router-dom';
import { DonationRequestCreateAPI } from "../../services/bloodbankService";

function DonationRequest(){
    const navigate = useNavigate();
    const [options, setData] = useState([]);
    const [name,setName] = useState("");
    const [age,setAge] = useState("");
    const [disease,setDisease] = useState("");
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
            name:name,
            age:age,
            disease:disease,
            blood_group:Number(selectedOption),
            unit:unit
        }
        DonationRequestCreateAPI(formData).then(response => {
            if (response.data["status"] === "success") {
                alert(response.data["message"]);
                navigate('/donor/blood/donation/requesthistory');
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
        const handlediseaseChange = (event) => {
            setDisease(event.target.value)
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
            <div className="main-content">
            <div class="merkbox">
        <div class="merktitel">
    <p>
      DONATE  BLOOD
    </p>
  </div>
  <form action="/form/submit" method="post" onSubmit={handleSubmit}>
    <div class="textFont">
      <label>Donor name</label>
      <input type="text" onChange={handleNameChange} />
    </div>
    <div class="textFont">
      <label>Donor age</label>
      <input type="text" onChange={handleAgeChange} />
    </div>
    <div class="textFont">
      <label>disease</label>
      <input type="text" onChange={handlediseaseChange} />
    </div>
    <div>
    <label class="textFont">Blood Group</label>
   
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
    )
}

export default DonationRequest;