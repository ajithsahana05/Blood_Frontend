import React from 'react'
import '../stylesheet.css';
import { NavLink } from 'react-router-dom';
function Sidebarnavigation() {
  return (
    <div className="sidebar">
    {/* <ul>
      <li><a href="/about">About</a></li>
      <li><a href="/gallery">Gallery</a></li>
      
    </ul> */}
    <nav>
        <ul>
            <NavLink to='/about' >
                <li>
                    <div className='menu-text'>About</div>
                </li>
            </NavLink>
        </ul>
    </nav>
  </div>
  )
}

export default Sidebarnavigation