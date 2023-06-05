import React from "react";
import Header from "./header";
import {useEffect,useState} from 'react';
import Sidebar from "./sidebar";
import './sidebarclass.css';
import { ProfileDashboard } from "../../services/bloodbankService";
function PatientDashboard(){
  const [cardData, setData] = useState([]);
  console.log(sessionStorage.getItem("userId"));
  useEffect(() => {
    const fetchData = async () => {
      const result = await ProfileDashboard(sessionStorage.getItem("userId"));
      console.log(result.data,"????????????????????");
      setData(result.data["dashboard_list"]);
    };
  
    fetchData();
  }, []);      
      const Card = ({ title, count }) => (
        <div className="card">
          <div className="card-header">
            <h3>{title}</h3>
          </div>
          <div className="card-body">
            <p>{count}</p>
          </div>
        </div>
      );



    return (
        <div>
        <Header />
        <Sidebar />
        <main>
          <div className="main-content">
        <div className="card-list">
    {cardData.map(card => (
      <Card
        // key={card.id}
        // id={card.id}
        title={card.title}
        count={card.count}
      />
    ))}
  </div>
  </div>
        </main>
    </div>
    )
}

export default PatientDashboard;