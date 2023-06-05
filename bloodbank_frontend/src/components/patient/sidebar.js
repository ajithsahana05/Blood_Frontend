import React from 'react';
import '../stylesheet.css';

function Sidebar() {
 
  return (
    <div className="sidebar">
    <ul>
      <li><a href="/patient/dashboard">Dashboard</a></li>
      <li><a href="/patient/blood/request">Blood Request Made</a></li>
      <li><a href="/patient/blood/request/history">Blood Request History</a></li>
    </ul>
  </div>
  );
}

export default Sidebar;