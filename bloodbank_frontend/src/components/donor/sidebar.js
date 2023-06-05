import React from 'react';
import '../stylesheet.css';
function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li><a href="/donor/dashboard">Dashboard</a></li>
        <li><a href="/donor/blood/donation/request">Donor Request Made</a></li>
        <li><a href="/donor/blood/donation/requesthistory">Donor History</a></li>
        <li><a href="/donor/blood/request">Blood Request Made</a></li>
        <li><a href="/donor/blood/request/history">Blood Request History</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;