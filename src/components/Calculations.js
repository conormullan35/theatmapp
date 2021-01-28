import React, { useEffect } from "react";

const Calculations = (props) => {
  
  //Declare variables
  const five = 5;
  const ten = 10;
  const twenty = 20;

  //Declare variables
  const { state } = props;
  const { disp } = props;

  const value = disp["total"];


  //Parameters are amount - the amount requested and limits - the amount left in the atm
  const GetMoney = (amount, limits) => {
  //Greedy algorithm to select the distribution of notes based on the parameters supply and demand
    let recur = (amount, nominals) => {
      if (amount == 0) return {};
      if (!nominals.length) return;
      let nominal = nominals[0];
      let count = Math.min(limits[nominal], Math.floor(amount / nominal));
      for (let i = count; i >= 0; i--) {
        let result = recur(amount - i * nominal, nominals.slice(1));
        if (result)
          return i
            ? {
                [nominal]: i,
                ...result,
              }
            : result;
      }
    };
    //Recur function until total amount is reached
    return recur(
      amount,
      Object.keys(state)
        .map(Number)
        .sort((a, b) => b - a)
    );
  };

  //Loop through the atm note inventory and update the number of notes accordingly
  function adjustStock(output) {
    for (var key in state) {
      if (state.hasOwnProperty(key)) {
        for (var keyb in output) {
          if (output.hasOwnProperty(keyb)) {
            if (key == keyb) {
              state[key] = state[key] - output[keyb];
              if (state[key] <= 0) {
                delete state[key];
              }
            }
          }
        }
      }
    }
  }

  //Call the GetMoney function and store results as an array
  const returnval = GetMoney(value, state);

  //Methods to update the dispensed state based on the note value
  const setTw = () => {
    props.setDisp((prevState) => ({
      ...prevState,
      20: returnval[20],
    }));
  };
  const setTn = () => {
    props.setDisp((prevState) => ({
      ...prevState,
      10: returnval[10],
    }));
  };
  const setFv = () => {
    props.setDisp((prevState) => ({
      ...prevState,
      5: returnval[5],
    }));
  };

  //Once the state is changed, call the update functions to update the amount of notes dispensed
  useEffect(() => {
    if (returnval) {
      if (returnval[20] && returnval[20] != disp[twenty]) {
        setTw();
      }
      if (returnval[10] && returnval[10] != disp[ten]) {
        setTn();
      }
      if (returnval[5] && returnval[5] != disp[five]) {
        setFv();
      }
    }
  }, [state]);

  adjustStock(returnval);
  return null;
};

export default Calculations;
