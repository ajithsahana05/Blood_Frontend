import React from 'react'
import {Route, Routes } from 'react-router-dom';
import About from './About';
import Gallery from './Gallery';
import Sidebarnavigation from './Sidebarnavigation';
function Sidedash() {
  return (
    <div>
        
        <Sidebarnavigation>
        <Routes>
          <Route path="/about"  element={<About />} />
          <Route path="/gallery"  element={<Gallery />} />
          </Routes>
        </Sidebarnavigation>
        
    </div>
  )
}

export default Sidedash;