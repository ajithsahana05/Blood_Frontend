
import React from "react";
import {  useState } from 'react';
import {useEffect} from 'react';
import Header from "../patient/header";
import Sidebar from "./sidebar";
import "../patient/sidebarclass.css"
import { DonationProfileHistory } from "../../services/bloodbankService";

function DonationHistory(){
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          const result = await DonationProfileHistory(sessionStorage.getItem("userId"));
          console.log(result.data,"????????????????????");
          setData(result.data["list"]);
        };
      
        fetchData();
      }, []);  
    return (
        <div>
            <Header />
            <Sidebar />
            <div className="main-content">
            <h2>My Donation History</h2>

<table>
  <tr className="tblRow">
    <th>Donor Name</th>
    <th>Donor Age</th>
    <th>Disease</th>
    <th>Blood Group</th>
	<th>Unit</th>
	<th>Date</th>
    <th>Status</th>
  </tr>
  {data.map(item => <tr>
    <td>{item.name}</td>
    <td>{item.age}</td>
    <td>{item.disease}</td>
    <td>{item.blood_group_name}</td>
    <td>{item.unit}</td>
    <td>{item.updated_date.substring(0,10)}</td>
    <td>{item.status}</td>
  </tr>)}
  </table>
  </div>
        </div>
    )
}

export default DonationHistory;