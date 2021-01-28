import React from "react";
import "../App.css";
import NumPad from "./NumPad";
import Input from "./Input";
import { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const PinCode = (props) => {

  //Declare variables, sample pin is 1234
  const correctPin = 1234;
  const fill = 'transparent';
  const cross = <HighlightOffIcon />
  const tick = <CheckCircleOutlineIcon />;

  //Import props
  const {showDialog} = props;
  const {setShowDialog}  = props;

  //Declare Hooks
  const [input, setInput] = useState({total: ''});
  const [validInput, setValidInput] = useState('calc-wrapper ')

  //Next screen is Dashboard
  const history = useHistory();
  const handleOnClick = useCallback(() => history.push("/Dashboard"), [
    history,
  ]);

  //Check if correct pin and continue
  function verifyPin(pinValue) {
    if (correctPin == pinValue) {
      setValidInput('calc-wrapper ');
      handleOnClick();
    }
    if (correctPin != pinValue) {
      setValidInput('calc-wrapper invalidinput');
      setInput({total: ""});
    }
  }

  //Clear inpit
  function clearInput(){
    setInput({total: ""});
  }

  return (
    <React.Fragment>
      <div className="behind">Please enter your PIN to continue.</div>
      <div className="app">
        <div className={validInput}>
        <Input len={input['total'].length} type="password" fill={fill} input={input['total']} />
          <div className="row"></div>
          <NumPad
            disp={input}
            showDialog={showDialog}
            setDisp={setInput}
            setShowDialog={setShowDialog}
            leftName={cross}
            rightName={tick}
            leftAction={clearInput}
            rightAction={() => verifyPin(input['total'])}
          ></NumPad>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PinCode;
