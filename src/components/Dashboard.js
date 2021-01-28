import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import BalanceCalcu from "./Calculations.js";
import ConfirmationDialog from "./ConfirmationDialog.js";
import "../css/Dashboard.css";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import twnote from "../images/twnote.png";
import fvnote from "../images/fvnote.png";
import tnnote from "../images/tnnote.png";
import Collapse from "@material-ui/core/Collapse";
import NumPad from "./NumPad";

const Dashboard = (props) => {

  //Declare Variables
  const tw = 20;
  const tn = 10;
  const fv = 5;
  const initDisp = { 20: 0, 10: 0, 5: 0, total: "" };
  const [disp, setDisp] = useState({ 20: 0, 10: 0, 5: 0, total: "" });
  const [open, setOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [state, setState] = useState({ 20: 7, 10: 15, 5: 4 });
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, isDisabled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [checked, setChecked] = useState(false);
  const [runBal, setRunBal] = useState(false);
  const [atmBalance, setAtmBalance] = useState(310);
  const [balance, setBalance] = useState(220);

  const history = useHistory();

  //Return to Splash Screen when clicked
  const cancel = useCallback(() => history.push("/SplashScreen"), [history]);
  const handleOnClick = useCallback(() => history.push("/SplashScreen"), [
    history,
  ]);
  
  //Styling conditionals to update on state changes
  let style = { backgroundColor: "transparent" };
  let balWarn = "snd white";
  if (!visible) style.display = "none";
  if (balance < 0)  balWarn = "snd red";

  //Clear input
  function cancelCourse() {
    setDisp((prevState) => ({
      ...prevState,
      total: "",
    }));
    if (disabled) {
      isDisabled(false);
    }
  }

  //Switch state to trigger confirm withdrawl dialog
  function confirmWithdraw() {
    setShowDialog(true);
  }

  function submitHandler(e){
    e.preventDefault()
  }

  //Use Effect statements to watch state changes and trigger relevant actions 
  useEffect(() => {
    setChecked((prevLoading) => !prevLoading);
  }, [visible]);

  useEffect(() => {
    setChecked((prevLoading) => !prevLoading);
  }, [visible]);

  useEffect(() => {
    if (disp.total > atmBalance) {
      alert("There is not enough money in the ATM Sorry");
    } else setRunBal((prevLoading) => !prevLoading);
  }, [isLoading]);

  useEffect(() => {
    const calcBal = Number(20 * state[tw] + 10 * state[tn] + 5 * state[fv]);
    setAtmBalance(calcBal);
  }, [visible]);

  //Reset the input and return to input screen
  function reset() {
    setShowDialog(false);
    setVisible((prevLoading) => !prevLoading);
    setDisp(initDisp);
  }

  //Update the input when number is entered
  function handleChange(e){
    const { name, value } = e.target;
    setDisp((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //Create JSX code for the dialog component to confirm if the user wishes to withdraw the amount
  const rn = (
    <ConfirmationDialog
      balance={balance}
      open={open}
      setOpen={setOpen}
      setBalance={setBalance}
      setIsLoading={setIsLoading}
      isLoading={isLoading}
      setVisible={setVisible}
      isDisabled={isDisabled}
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      value={disp.total}
      limits={setState}
    >
      <CheckCircleOutlineIcon />
    </ConfirmationDialog>
  );


  return (


    <React.Fragment>

      {/* User Information, balance and overdraft */}
      <h2 className="name">Welcome Michael</h2>
      <div id="dashboardWrap">
        <div className="topWrap">
          <div className="three">
            <div className="ca first">
              <p>Balance</p>
              <p className={balWarn}>£{balance}.00</p>
            </div>
            <div className="ca last">
              <p>Overdraft Limit</p>
              <p className={"snd "}>£100.00</p>
            </div>
          </div>
        </div>

        {/* Numberpad and input elements */}
        <div className={"twoCards"}></div>
        <form id="formid" onSubmit={submitHandler}>
          <input
            className="inputAmount"
            value={disp.total + ".00"}
            type="numeric"
            style={{ fontFamily: "BebasNeue-Regular" }}
            onChange={handleChange}
            name="total"
            disabled={disabled}
            readOnly
          />
        </form>
        <div style={style}>
          <NumPad
            disp={disp}
            open={open}
            setOpen={setOpen}
            setDisp={setDisp}
            leftName={<HighlightOffIcon></HighlightOffIcon>}
            rightName={rn}
            leftAction={cancelCourse}
            rightAction={confirmWithdraw}
            showDialog={showDialog}
            setShowDialog={setShowDialog}
          ></NumPad>
          <div className="row">
            <button className="withdrBtn cancel" onClick={cancel}>CANCEL TRANSACTION</button>
          </div>
        </div>

        <div className="bN">
        {/*Only show the cash dispensed after the amount has been confirmed */}
          {!visible ? (
            <div className="slideInD">
              {/*Warn user if they are in their overdraft */}
              {balance < 0 ? (
                <div className="ovrDrft">WARNING YOU ARE IN YOUR OVERDRAFT</div>
              ) : null}
              {/*Transition Animation */}
              <Collapse direction="down" in={!checked}>

                {/*Based on the calculated cash distribution, display the images of the relevant note and amount to the right */}
                <div>
                  <p>HERE IS YOUR £{disp.total} CASH:</p>
                  {disp[tw] ? (
                    <div className="dispNotes">
                      <img alt={""} src={twnote}/>
                      <span>X{disp[tw]}</span>
                    </div>
                  ) : null}
                  {disp[tn] ? (
                    <div className="dispNotes">
                      <img alt={""} src={tnnote}/>
                      <span>X{disp[tn]}</span>
                    </div>
                  ) : null}
                  {disp[fv] ? (
                    <div className="dispNotes">
                      <img alt={""} src={fvnote}/>
                      <span>X{disp[fv]}</span>
                    </div>
                  ) : null}

                  <div className="optBtn">
                    <button className="withdrBtn cancel" onClick={handleOnClick}>
                      EJECT CARD
                    </button>
                    <button className="withdrBtn another" onClick={reset}>
                      MAKE ANOTHER WITHDRAWL?
                    </button>
                  </div>
                </div>
              </Collapse>

              {runBal && (
                <BalanceCalcu
                  state={state}
                  setState={setState}
                  disp={disp}
                  value={disp["total"]}
                  setDisp={setDisp}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  open={open}
                  setOpen={setOpen}
                ></BalanceCalcu>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
