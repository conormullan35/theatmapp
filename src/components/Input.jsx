import React from "react";
import "../css/Input.css";

const Input = (props) =>{

  //Import props
  const {len} = props;

  //Initially set all background to a transparent fill
  let elems = new Array(4).fill('transparent')

  //Depending on how many elements in string, fill each circle
  for(var i=0;i<len;i++){
    elems[i]='white';
  }

  return (
    //JSX for pin circles
    <div className="input">
      <div className="circle" id={'one'} style={{backgroundColor: elems[0]}}></div>
      <div className="circle" id={'two'} style={{backgroundColor: elems[1]}}></div>
      <div className="circle" id={'three'} style={{backgroundColor: elems[2]}}></div>
      <div className="circle" id={'four'} style={{backgroundColor: elems[3]}}></div>
    </div>
    );
  }

export default Input;