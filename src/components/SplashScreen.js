import React, { useCallback, useState} from "react";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from "@material-ui/core/styles";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import "../App.css";


const SplashScreen = (props) => {

  //Declare variables
  const [checked, setChecked] = React.useState(true)

  //Progress to next screen once clicked
  const history = useHistory()
  const handleOnClick = useCallback(() => history.push("/PinCode"), [
    history,
  ]);

  //Timeout is necessary to display animation
  const handleChange = () => {
    setChecked((prev) => !prev);
    window.setTimeout(handleOnClick, 1000);
  };

  return (
    //JSX for Splash Screen
    <div className={'root'}>
      <div className={'behind'}>Please insert your card to continue.</div>
      <div className={'cardSlot'}></div>
      <div className={"cardDiv"}>
        
        <Collapse direction="down" in={checked} mountOnEnter unmountOnExit>
          <div >
            <button className= 'cardBtn' onClick={handleChange}><FontAwesomeIcon icon={faCreditCard} /></button>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default SplashScreen;