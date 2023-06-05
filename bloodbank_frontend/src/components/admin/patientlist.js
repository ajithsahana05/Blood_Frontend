import Header from "../patient/header";
import Sidebar from "./sidebar";
import { AdminPatientAndDonorList } from "../../services/bloodbankService";
import { useEffect,useState } from "react";
import './adminstylesheet.css';
function PatientList() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          const result = await AdminPatientAndDonorList(1);
          console.log(result.data,"????????????????????");
          setData(result.data["profile_list"]);
        };
      
        fetchData();
      }, []);  
    return (
        <div>
            <Header />
            <Sidebar />
         
              <div className="main-content">
            <h2>Patient List</h2>
            <table>
  <tr className="tblRow">
    <th>Name</th>
    <th>Profile</th>
    <th>Blood Group</th>
    <th>Address</th>
	<th>Mobile</th>
    <th>Action</th>
  </tr>
  {data.map(item => <tr>
    <td>{item.name}</td>
    <img
          src= {"https://ibb.co/Bcbb10X"}
          width="70" height="50"
        //   style={{ margin: '2px' }}
          alt="my images"
        />
    <td>{item.blood_group_name}</td>
    <td>{item.address}</td>
    <td>{item.mobile_no}</td>
    <td><button className="buttonn">Edit</button><button className="deletebtn">Delete</button></td>
  </tr>)}
  </table>
  </div>
           
            
        </div>
    )
}

export default PatientList;