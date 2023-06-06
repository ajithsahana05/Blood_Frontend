
import React,{useState,useEffect} from 'react'
import './stylesheet.css';
import Loader from './Loader';
// import Home from './Home';
import axios from 'axios';
function Testcom() {
  const [phn,setPhone] = useState('');
  const [val,setVal] = useState('');
  const [errorr,setErrorr] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
      setSuccessMessage('');
    }, 3000);
  };

  const [value, setValue] = useState("");
  const suggestions = ["Apple", "Banana", "Cherry", "Date"];

  function handleInputChange(event) {
    setValue(event.target.value);
  }
 
    // const DataShare = "Data sample test";
    const [sample,setSample] = useState('');
    // const [sample1,setSample1] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    // const [name, setName] = useState('');
    const [suggestion,setSuggestions] = useState('');

    console.log(suggestion);
    useEffect(() => {

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      const fetchData = async () => {
        const result = await axios("https://jsonplaceholder.typicode.com/users");
        
        setSuggestions(result.data);
        
      };
      fetchData();
      
      const isChecked = localStorage.getItem('isChecked') === 'true';
      setIsChecked(isChecked);
    }, []);
    
    function handleCheckboxChange(event) {
      const isChecked = event.target.checked;
      setIsChecked(isChecked);
      localStorage.setItem('isChecked', isChecked);
  
    }
    const HandleClick1=(e) =>{
      // console.log(e.target.value.trimLeft());
      setSample(e.target.value);
      
      
    }
  const HandleClick=() =>{
    setSample(sample.trim())
    // console.log(e.target.value.trimLeft());
    // setSample(e.target.value.trim());
    // console.log(e.target.value.trimLeft());
    
  }

  const HandleSubmit=()=>{
    console.log(sample,"**************");
  }

  const HandleLower=(e)=> {
    console.log(e.target.value.toLowerCase().trim(),"&&&&&&&&&&&");
  }
  

  const HandleValidate = (event) => {
   
    setVal(event.target.value.toUpperCase());
    // const value1 = event.target.value.toUpperCase(); // Convert to uppercase
    // if (/^[A-Z]{0,3}\d{0,3}$/.test(value1)) { // Check pattern
    //   setVal(value1);
    // }

  }


  const HandlePhoneNumberChange = (event) => {
    const rawPhoneNumber = event.target.value.replace(/\D/g, ''); // remove all non-numeric characters
    let formattedPhoneNumber = '';
    if (rawPhoneNumber.length > 0) {
      formattedPhoneNumber = rawPhoneNumber.substring(0, 3) + '-' + rawPhoneNumber.substring(3, 6) + '-' + rawPhoneNumber.substring(6);
    }
    setPhone(formattedPhoneNumber);
  }

const HandleBtnValidate = () => {
  if (/^[A-Z]{0,3}\d{0,3}$/.test(val)) { // Check pattern
      setErrorr('');
    }
    else {
      setErrorr("Input value must contain example pattern.,ex ABC123");
    }

}


  return (
    <div>This is the content of the Header component
      {isLoading ? <Loader /> : null}
      <input type="text" value={sample}  onChange={HandleClick1}/> <br></br>
      <button onClick={HandleClick}>Space Btn</button>
      <input type="text" onChange={HandleLower} /> <br></br>
      <input type='submit' name='OOk' onClick={HandleSubmit} />
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        Checkbox Label
      </label>
      {/* <input type="text" id="name" name="name" value={name} onChange={handleInputChange} /> */}
      <label htmlFor="fruits">Select a fruit:</label>
      <input
        type="text"
        id="fruits"
        value={value}
        onChange={handleInputChange}
        list="fruits-list"
      />
      <datalist id="fruits-list">
        {suggestions.map((item) => (
          <option key={item.name} value={item.name} />
        ))}
      </datalist><br></br>

      {showPopup && <div className="popup">{successMessage}</div>}
      <button onClick={() => handleSuccess('Success!')}>Popups</button>
      <div></div>
          <input type='text' value={val} onChange={HandleValidate} maxLength={6}/><br></br>
          {errorr && <div>{errorr}</div>}<br></br>
          <button onClick={HandleBtnValidate}>Click</button>



          <input type="text" value = {phn} onChange={HandlePhoneNumberChange} /><br></br>

    </div>
  )
 
}

export default Testcom;

