import React, { useState, useEffect } from "react";
import ConfirmationDialog from "./ConfirmationDialog";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const NumPad = (props) => {
  //Import Props
  const { leftName } = props;
  const { rightName } = props;
  const { disp } = props;
  const { setDisp } = props;
  const { leftAction } = props;
  const { rightAction } = props;

  //Update the value field to the total
  function addToInput(val) {
    setDisp((prevState) => ({
      ...prevState,
      total: disp.total + val,
    }));
  }

  //Action button functions
  function doSomethingLeft() {
    leftAction();
  }
  function doSomethingRight() {
    rightAction();
  }

  return (
    //JSX for numberpad
    <div className="app">
      <div className="calc-wrapper">
        <div className="row">
          <button className="button-wrapper btnsvn" onClick={() => addToInput(7)}>
            7
          </button>
          <button className="button-wrapper btnegt" onClick={() => addToInput(8)}>
            8
          </button>
          <button className="button-wrapper btnnne" onClick={() => addToInput(9)}>
            9
          </button>
        </div>
        <div className="row">
          <button className="button-wrapper btnfr" onClick={() => addToInput(4)}>
            4
          </button>
          <button className="button-wrapper btnfv" onClick={() => addToInput(5)}>
            5
          </button>
          <button className="button-wrapper btnsx" onClick={() => addToInput(6)}>
            6
          </button>
        </div>
        <div className="row">
          <button className="button-wrapper btnon" onClick={() => addToInput(1)}>
            1
          </button>
          <button className="button-wrapper btntw" onClick={() => addToInput(2)}>
            2
          </button>
          <button className="button-wrapper btnthr" onClick={() => addToInput(3)}>
            3
          </button>
        </div>
        <div className="row">
          <button className="button-wrapper clearBtn" onClick={() => doSomethingLeft()}>
            {leftName}
          </button>
          <button className="button-wrapper btnzr" onClick={() => addToInput(0)}>
            0
          </button>
          <button className="button-wrapper confirmBtn" onClick={() => doSomethingRight()}>
            {rightName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NumPad;
