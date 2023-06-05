import React from 'react';
import '../stylesheet.css';

function Sidebar() {
 
  return (
    <div className="sidebar">
    <ul>
      <li><a href="/admin/dashboard">Dashboard</a></li>
      <li><a href="/admin/donor/list">Donor</a></li> 
      <li><a href="/admin/patient/list">Patient</a></li> 
      <li><a href="/admin/blood/donation/list">Donation</a></li>
      <li><a href="/admin/blood/request/list">Blood Requests</a></li>
      <li><a href="/admin/blood/request/history">Request History</a></li>
      <li><a href="/admin/blood/stock/update">Blood Stock</a></li>    
    </ul>
  </div>
  );
}

export default Sidebar;