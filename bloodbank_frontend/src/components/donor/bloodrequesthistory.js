import React from "react";
import {  useState } from 'react';
import {useEffect} from 'react';
import Header from "../patient/header";
import Sidebar from "./sidebar";
import "../patient/sidebarclass.css"
import { BloodRequestByProfileId } from "../../services/bloodbankService";
function DonorBloodRequestHistory(){
    const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await BloodRequestByProfileId(sessionStorage.getItem("userId"));
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
            <div>
<h2>My Blood Request</h2>

<table>
  <tr className="tblRow">
    <th>Patient Name</th>
    <th>Patient Age</th>
    <th>Reason</th>
    <th>Blood Group</th>
	<th>Unit</th>
	<th>Date</th>
    <th>Status</th>
  </tr>
  
  {data.map(item => <tr>
    <td>{item.patient_name}</td>
    <td>{item.patient_age}</td>
    <td>{item.reason}</td>
    <td>{item.blood_group_name}</td>
	<td>{item.unit}</td>
    <td>{item.updated_date.substring(0,10)}</td>
    <td>{item.status === "approved" ? <button class="buttonn">Approved</button> : item.status === "rejected" ? <button class="pending_buttonn">  Rejected</button> : null}</td>
    
    
  </tr>)
}
</table>

  </div>
            </div>
        </div>
    )
}

export default DonorBloodRequestHistory;