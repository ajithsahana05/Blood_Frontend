import React,{useState} from 'react'

function Checkbox() {
    const [JObject, setJsonData] = useState([{"name":"Eat","check":"false"},{"name":"Sleep","check":"false"},{"name":"Repeat","check":"false"}]);
    // const JObject = [{"name":"Eat","check":"false"},{"name":"Sleep","check":"false"},{"name":"Repeat","check":"false"}]

function handleCheckboxEatChange(event) {
    const value = event.target.value;
    const isChecked = event.target.checked;
    console.log(value,isChecked);
    if (isChecked) {
        for (var i=0; i<JObject.length; i++) 
        {
              if (JObject[i].name === value) {
                JObject[i].check = "true";
                break;
              }
              
        }
        setJsonData(JObject);
    } else {
        for (var ii=0; ii<JObject.length; ii++) 
        {
              if (JObject[ii].name === value) {
                JObject[ii].check = "false";
                break;
              }
              
        }
        setJsonData(JObject);
    }

    console.log(JObject,"????????????");
  }


return (
    <div>
        {JObject.map(item => (
        <div key={item.id}>
          <label>
            <input
              type="checkbox"
              value={item.name}
            //   checked={jsonData.includes(item.id)}
              onChange={handleCheckboxEatChange}
            />
            {item.name}
          </label><br></br>
          <button>edit {item.name}</button>
          <button>delete {item.name}</button>

        </div>
      ))}
    </div>
  )
}

export default Checkbox;