import {useEffect,useState} from 'react';
import Header from "../patient/header";
import Sidebar from "./sidebar";
import './adminstylesheet.css';
import { AdminBloodRequestList } from '../../services/bloodbankService';

function AdminBloodRequestHistory() {
    const [data, setData] = useState([]);
    useEffect(() => {
       
        const fetchData = async () => {
          const result = await AdminBloodRequestList("all");
          setData(result.data["list"]);
       
        };
      
        fetchData();
      },[]); 

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="main-content">
              <h2>Blood Request History</h2>
            <table>
  <tr className="tblRow">
    <th>Patient name</th>
    <th>Age</th>
    <th>Blood Group</th>
    <th>Reason</th>
	<th>Unit</th>
    <th>Updated date</th>
    <th>status</th>
  </tr>
  {data.map(item => <tr>
    <td>{item.patient_name}</td>
    <td>{item.patient_age}</td>
    <td>{item.blood_group_name}</td>
    <td>{item.reason}</td>
    <td>{item.unit}</td>
    <td>{item.updated_date.substring(0,10)}</td>
    <td>{item.status}</td>
  </tr>)}
  </table>
  </div>
        </div>
    )
}

export default AdminBloodRequestHistory;