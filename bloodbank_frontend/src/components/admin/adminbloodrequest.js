import {useEffect,useState} from 'react';
import Header from "../patient/header";
import Sidebar from "./sidebar";
import './adminstylesheet.css';
import { AdminBloodRequestList } from '../../services/bloodbankService';
import { AdminBloodRequestEdit } from '../../services/bloodbankService';
function AdminBloodRequest() {
    const [data, setData] = useState([]);
    useEffect(() => {
       
        const fetchData = async () => {
          const result = await AdminBloodRequestList("pending ");
          setData(result.data["list"]);
        };
      
        fetchData();
      },[]); 
    

      const handleClick = (e,status) =>{
        console.log("???????????????",e,status);
        AdminBloodRequestEdit(e,{action:status}).then(response => {
            console.log(response.data);
            alert(response.data["message"]);
            window.location.reload();
        })

    }
      




    return (
        <div>
            <Header />
            <Sidebar />
            <div className="main-content">
              <h2>Blood Request List</h2>
            <table>
  <tr className="tblRow">
    <th>Patient name</th>
    <th>Age</th>
    <th>Blood Group</th>
    <th>Reason</th>
	<th>Unit</th>
    <th>Updated date</th>
    <th>Action</th>
  </tr>
  {data.map(item =><tr>
    <td>{item.patient_name}</td>
    <td>{item.patient_age}</td>
    <td>{item.blood_group_name}</td>
    <td>{item.reason}</td>
    <td>{item.unit}</td>
    <td>{item.updated_date.substring(0,10)}</td>
    <td><button className="buttonn" onClick={() => {handleClick(item.id,"approved")}}>Approved</button><button className="deletebtn" onClick={() => {handleClick(item.id,"rejected")}}>Reject</button></td>
  </tr>)}
  </table>
  </div>
        </div>
        
    )
}

export default AdminBloodRequest;