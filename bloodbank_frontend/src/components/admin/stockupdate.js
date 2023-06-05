import React,{useEffect,useState} from 'react'
import '../stylesheet.css'
import '../patient/sidebarclass.css';
import Sidebar from './sidebar';
import Header from '../patient/header';
import { BloodGroupList } from '../../services/bloodbankService';
import { AdminBloodStockUpdate } from '../../services/bloodbankService';
import {useNavigate} from 'react-router-dom';
function Stockupdate() {
    const navigate = useNavigate();
    const [options,setData] = useState([]);
    const [selectedOption,setSelectedOption] = useState('');
    const [unit,setUnit] = useState('');
    useEffect(() => {
        const fetchData = async () => {
          const result = await BloodGroupList();
          console.log(result.data,"????????????????????");
          setData(result.data["list"]);
        };
      
        fetchData();
      }, []); 


const handleOptionChange = (event) =>{
    setSelectedOption(event.target.value);

}
const handleUnitChange=(event)=>{
    setUnit(event.target.value);
}
const handleSubmit=(event)=>{
    event.preventDefault();
    const formData = {
        stock_unit:Number(unit)
    }
    console.log(formData,selectedOption);
    AdminBloodStockUpdate(Number(selectedOption),formData).then(response =>{
        console.log(response.data);
        if (response.data["status"] === "success") {
            console.log("Yessssssss");
            navigate('/admin/dashboard');
        }
    })
}
  return (
    <div>
        <Header />
        <Sidebar />
    <div className='main-content'>
    <div>stockupdate</div>
    <div class="merkbox">
        <div class="merktitel">
        <form action="/form/submit" method="post" onSubmit={handleSubmit}>
        <div class="textFont">
        <label class="textFont">Blood Group</label>
    
<select className="select1" onChange={handleOptionChange}>

      <option>Select blood group</option> 
      {options.map(option => (
        
        <option value={option.id}>{option.blood_group}</option>
      ))}
    </select>
    </div>
    <div class="textFont">
    <label>Blood Stock(unit)</label>
    <input type="text" onChange={handleUnitChange} /></div>
    <div className='textFont'>
        <button>Update</button>
    </div>
            </form>
            </div></div>
    </div></div>
    )
}

export default Stockupdate;