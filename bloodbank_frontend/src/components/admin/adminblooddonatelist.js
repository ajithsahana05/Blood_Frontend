import Header from "../patient/header";
import Sidebar from "./sidebar";
import './adminstylesheet.css';
import {useEffect,useState} from 'react';
import { AdminBloodDonationList } from "../../services/bloodbankService";
import { AdminBloodDonationEdit } from "../../services/bloodbankService";
function BloodDonationList() {
    const [data, setData] = useState([]);
    useEffect(() => {
       
        const fetchData = async () => {
          const result = await AdminBloodDonationList("pending");
          setData(result.data["list"]);
          console.log(result.data,"????????");
       
        };
      
        fetchData();
      },[]); 

      const handleClick = (e,status) =>{ 
        console.log(e,status);
        AdminBloodDonationEdit(e,{action:status}).then(response => {
          if (response.data["status"] === "success") {
            window.location.reload();
          }
        })
        
      }
    return (
        <div>
            <Header />
            <Sidebar />
            <div className="main-content">
            <h2>Blood Donate List</h2>
            <table>
  <tr className="tblRow">
    <th>Name</th>
    <th>Age</th>
    <th>Blood Group</th>
    <th>disease</th>
	<th>Unit</th>
    <th>Updated date</th>
    <th>Action</th>
  </tr>
  {data.map(item => <tr>
    <td>{item.name}</td>
    <td>{item.age}</td>
    <td>{item.blood_group_name}</td>
    <td>{item.disease}</td>
    <td>{item.unit}</td>
    <td>{item.updated_date}</td>
    <td><button className="buttonn" onClick={() => {handleClick(item.id,"approved")}}>Approved</button><button className="deletebtn" onClick={() => {handleClick(item.id,"rejected")}}>Reject</button></td>
  </tr>)}
  </table>
  </div>
        </div>
    )
}

export default BloodDonationList;