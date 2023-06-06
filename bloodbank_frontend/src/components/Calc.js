import React,{ useState } from 'react'

function Calc() {
    const [input,setInput] = useState("");
    const [output,setOutput] = useState("");

    function InputHandle(value) {
        setInput(input+value);
        // setOutput(input+value);
    }

    function Calculate() {
        setOutput(input);
    }
    function Clear() {
        setInput("");
        setOutput("");
    }
    function DelClear() {
        // const inputValue = 
        const delInput = input.substring(0,input.length-1);
        setInput(delInput);
    }
  return (
    <div>
        <div>
        <input type='text' value = {input} /> <br />
        {/* <input type='text' value = {output} /> <br /> */}
        <label>{output}</label>
        </div>
    <div>
        <button onClick={() =>InputHandle("1")}>1</button>
        <button onClick={() =>InputHandle("2")}>2</button>
        <button onClick={() =>InputHandle("3")}>3</button>
        <button onClick={() =>InputHandle("4")}>4</button>
        <button onClick={() =>InputHandle("+")}>+</button>
        </div>
        <div>
        <button onClick={() =>InputHandle("5")}>5</button>
        <button onClick={() =>InputHandle("6")}>6</button>
        <button onClick={() =>InputHandle("7")}>7</button>
        <button onClick={() =>InputHandle("8")}>8</button>
        <button onClick={() =>InputHandle("-")}>-</button>
        </div>
        <div>
        <button  onClick={() =>InputHandle("9")}>9</button>
        <button  onClick={() =>InputHandle("0")}>0</button>
        <button  onClick={() =>InputHandle("*")}>*</button>
        <button  onClick={() => Calculate()}>=</button>
        <button  onClick={() => Clear()}>c</button>
        </div>
        <div>
        <button  onClick={() =>InputHandle("/")}>/</button>
        <button  onClick={() =>InputHandle("%")}>%</button>
        <button  onClick={() =>InputHandle(".")}>.</button>
        <button  onClick={() =>DelClear()}>Del</button>
        
        </div>

    </div>
  )
}

export default Calc;