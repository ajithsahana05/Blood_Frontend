import Header from "../patient/header";
import Sidebar from "./sidebar";
import './adminstylesheet.css';
import { AdminDashboardApi } from "../../services/bloodbankService";
import {useEffect,useState} from 'react';


function AdminDashboard(){
    const [cardData, setData] = useState([]);
    const [cardProfile, setCardProfile] = useState([]);
   
        useEffect(() => {
            const fetchData = async () => {
              const result = await AdminDashboardApi();
              console.log(result.data,"????????????????????");
              setData(result.data["bloodInfo"]);
              setCardProfile(result.data["profile_list"]);
            };
          
            fetchData();
          }, []); 




    const Card = ({ blood_group, stock_unit }) => (
        <div className="card">
          <div className="card-header">
            <h3>{blood_group}</h3>
          </div>
          <div className="card-body">
            <p>{stock_unit}</p>
          </div>
        </div>
      );


      const CardProfileDetail = ({ profile_info, count }) => (
        <div className="card-container">
          <div className="card_inline">
            <h3>{profile_info}</h3>
            <h3>{count}</h3>
          </div>
          
        </div>
      );
    return (
        <div>
            <Header />
            <Sidebar />
            
            <div className="main-content">
        <div className="card-list">
        
    {cardData.map(card => (
      <Card
     
      blood_group={card.blood_group}
      stock_unit={card.stock_unit}
      />
    ))}
  </div> 
    <div>
    {cardProfile.map(card1 => (
      <CardProfileDetail
     
      profile_info={card1.profile_info}
      count={card1.count}
      />
    ))}
    </div>
    </div>
        </div>
    )
}

export default AdminDashboard;