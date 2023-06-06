import React from "react";
import { useState } from "react";
import moment from 'moment';

function Home(sometext){
  // Calender View start
  const [date, setDate] = useState(moment());

  const firstDayOfMonth = moment(date).startOf('month');
  const endDayOfMonth = moment(date).endOf('month');

  const days = [];
  let day = firstDayOfMonth;

  while (day <= endDayOfMonth) {
    days.push(day);
    day = moment(day).add(1, 'day');
  }

  const weeks = [];
  let week = [];

  days.forEach(day => {
    if (week.length > 0 && day.day() === 0) {
      weeks.push(week);
      week = [];
    }

    week.push(day);
  });

  if (week.length > 0) {
    weeks.push(week);
  }


// Calender View End

    const [fontSize, setFontSize] = useState(16);

    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);

    const increaseFontSize = () => {
      setFontSize(fontSize + 2);
    };
    const decreaseFontSize = () => {
      setFontSize(fontSize - 2);
    };

// useEffect(()=> {
//   console.log(sometext);     
// },[]);

const HandlePrint = () => {
  window.print();
}
const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');      
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  }
    return (
    
    <div>
        <p>home</p>
        <div className="App">
  <button onClick={getLocation}>Get Location</button>
  <h1>Coordinates</h1>
  <p>{status}</p>
  {lat && <p>Latitude: {lat}</p>}
  {lng && <p>Longitude: {lng}</p>}
  {sometext.sometext}
  
 
</div>
     {/* Calender View UI*/}
        <div>
        <div>
        <button onClick={() => setDate(moment(date).subtract(1, 'month'))}>
          Prev
        </button>
        <span>{date.format('MMMM, YYYY')}</span>
        <button onClick={() => setDate(moment(date).add(1, 'month'))}>
          Next
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, i) => (
            <tr key={i}>
              {week.map(day => (
                <td key={day.date()}>{day.format('D')}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
        </div>
        <button onClick={HandlePrint}>Print</button>
        <div>
        <button onClick={decreaseFontSize}>decrease Font Size</button><br />
      <button onClick={increaseFontSize}>Increase Font Size</button>
      <p style={{ fontSize: fontSize }}>This is some sample text.</p>
    </div>
    </div>
    )
}
// export default Home;
export default Home;

// // AIzaSyAFf5CnVKFVS3ie46aHi9M3azZaaLCbCFY



// import React, { useEffect, useRef } from 'react';

// function Map() {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     const map = new google.maps.Map(mapRef.current, {
//       center: { lat: 37.7749, lng: -122.4194 },
//       zoom: 12
//     });

//     new google.maps.Marker({
//       position: { lat: 37.7749, lng: -122.4194 },
//       map: map,
//       title: 'San Francisco'
//     });
//   }, []);
//   <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAFf5CnVKFVS3ie46aHi9M3azZaaLCbCFY"></script>
//   return <div ref={mapRef} style={{ height: '500px', width: '100%' }} />;
// }

// export default Map;