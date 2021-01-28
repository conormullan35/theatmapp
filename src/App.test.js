import { render, screen } from "@testing-library/react";
import App from "./App";
import { shallow, mount } from "enzyme";
import React from "react";
import Calculations from "./components/Calculations";
import ConfirmationDialog from "./components/ConfirmationDialog";
import Dashboard from "./components/Dashboard";
import {confirmWithdraw} from "./components/Dashboard";
import Input from "./components/Input";
import NumPad from "./components/NumPad";
import PinCode from "./components/PinCode";
import SplashScreen from "./components/SplashScreen";
import Dialog from '@material-ui/core/Dialog';
import toJson from 'enzyme-to-json';

  const props = {
    initialProps: {
      showDialog: false,
    },
    dashboardProps: {
      showDialog: false,
    },
    calcProps: {
      showDialog: false,
      disp: { 20: 0, 10: 0, 5: 0, total: 25 },
      state: { 20: 7, 10: 15, 5: 4 },
    },
    dialogProps: {
      showDialog: true,
    },
    inputProps: {
      len: 0,
    },
    numProps: {
      leftname: "left",
      rightname: "right",
      disp: { 20: 0, 10: 0, 5: 0, total: 25 },
    },
  };

describe("Test rendering components and they accept passed props", () => {

  const container = shallow(<PinCode {...props.initialProps} />);
  it("renders App component without crashing", () => {
    shallow(<App />);
  });
  it("renders SplashScreen component header without crashing", () => {
    const wrapper = shallow(<SplashScreen />);
    const header = (
      <div className={"behind"}>Please insert your card to continue.</div>
    );
    expect(wrapper.contains(header)).toEqual(true);
  });
  it("renders PinCode component header without crashing", () => {
    expect(container.exists()).toBe(true);
  });

  const shDashboard = shallow(<Dashboard {...props.dashboardProps} />);
  it("renders Dashboard component without crashing", () => {
    expect(shDashboard.exists()).toBe(true);
  });

  const shCalculations = shallow(<Calculations {...props.calcProps} />);
  it("renders Calculations component without crashing", () => {
    expect(shCalculations.exists()).toBe(true);
  });

  const shDialog = shallow(<ConfirmationDialog {...props.dialogProps} />);
  it("renders Dialog component without crashing", () => {
    expect(shDialog.exists()).toBe(true);
  });

  const shInput = shallow(<Input {...props.inputProps} />);
  it("renders Input component without crashing", () => {
    expect(shInput.exists()).toBe(true);
  });

  const shNumPad = shallow(<NumPad {...props.numProps} />);
  it("renders NumPad component without crashing", () => {
    expect(shNumPad.exists()).toBe(true);
  });
});
const wrapper = mount(<Dashboard {...props.dashboardProps} />);
describe("logic", () => {
  
  it("button click - confirm amount", () => {
    wrapper.find(".btnsvn").simulate("click");
    wrapper.find(".confirmBtn").simulate("click");
    const inputValue = wrapper.find(".inputAmount").props().value;
    const expectedValue = "7.00";
    expect(inputValue).toEqual(expectedValue);
    wrapper.unmount();
  });
});

describe("click input buttons", () => {
  it("button click - confirm amount", () => {
    wrapper.mount();
    wrapper.find(".btnfv").simulate("click");
    wrapper.find(".btnfv").simulate("click");
    wrapper.find(".confirmBtn").simulate("click");
    const inputValue = wrapper.find(".inputAmount").props().value;
    const expectedValue = "55.00";
    expect(inputValue).toEqual(expectedValue);
    wrapper.unmount();
  });
});

describe("show dialog box", () => {
  it("when valid amount is entered, show dialog box", () => {
    const shConfirm = mount(<Dashboard {...props.dashboardProps}></Dashboard>);
    shConfirm.find(".btnfv").simulate("click");
    shConfirm.find(".btnfv").simulate("click");
    jest.mock('./components/Dashboard', () => ({ confirmWithdraw: jest.fn() }))
    shConfirm.find(".confirmBtn").simulate("click");
    expect(shConfirm.find(Dialog).length).toBe(1);
  });
});

describe("confirming amount and getting money", () => {
  it("should return notes images and hide the numberpad", () => {
    wrapper.mount();
    wrapper.find(".btnfv").simulate("click");
    wrapper.find(".btnfv").simulate("click");

    jest.mock('./components/Dashboard', () => ({ confirmWithdraw: jest.fn() }))
    const diWr = mount(<ConfirmationDialog {...props.ConfirmationDialog} />);
    wrapper.find(".confirmBtn").simulate("click");
    jest.mock('./components/ConfirmationDialog', () => ({ handleOpen: jest.fn() }))
    wrapper.find("#openBtn").first().simulate("click");
    expect(wrapper.find('img').length).toBe(3);
    wrapper.unmount();
  });
});

describe("confirming amount and getting money overdraft", () => {
  it("should return notes images and hide the numberpad", () => {
    wrapper.mount();
    wrapper.find(".btntw").simulate("click");
    wrapper.find(".btnnne").simulate("click");
    wrapper.find(".btnzr").simulate("click");
    jest.mock('./components/Dashboard', () => ({ confirmWithdraw: jest.fn() }))
    const diWr = mount(<ConfirmationDialog {...props.ConfirmationDialog} />);
    wrapper.find(".confirmBtn").simulate("click");
    jest.mock('./components/ConfirmationDialog', () => ({ handleOpen: jest.fn() }))
    wrapper.find("#openBtn").first().simulate("click");
    expect(wrapper.find('.ovrDrft').length).toBe(1);
    wrapper.unmount();
  });
});

describe("Enter a value not available given the notes in the atm (29)", () => {
  it("is not possible to dispense, throw error", () => {
    const wrEr = mount(<Dashboard {...props.initialProps}></Dashboard>);
    const jsdomAlert = window.alert;  // remember the jsdom alert
    window.alert = () => {}; 
    wrEr.find(".btntw").simulate("click");
    wrEr.find(".btnnne").simulate("click");
    jest.mock('./components/Dashboard', () => ({ confirmWithdraw: jest.fn() }))
    const diWr = mount(<ConfirmationDialog {...props.ConfirmationDialog} />);
    wrEr.find(".confirmBtn").simulate("click");
    jest.mock('./components/ConfirmationDialog', () => ({ handleOpen: jest.fn() }))
    wrEr.find("#openBtn").first().simulate("click");
    expect(wrEr.find('.slideInD').length).toBe(0);
    wrEr.unmount();
    window.alert = jsdomAlert; 
  });
});

describe("test pin logic", () => {
  it("should not expect a value other than 1234", () => {
    const pc = mount(<PinCode {...props.initialProps} />);
    const jsdomAlert = window.alert;  // remember the jsdom alert
    window.alert = () => {}; 
    pc.mount();
    pc.find(".btntw").simulate("click");
    pc.find(".btnnne").simulate("click");
    pc.find(".btnzr").simulate("click");
    jest.mock('./components/PinCode', () => ({ verifyPin: jest.fn() }))
    pc.find(".confirmBtn").first().simulate("click");
    expect(pc.props().showDialog).toBe(false);
    pc.unmount();
    window.alert = jsdomAlert; 
  });
});

describe("snapshots", () => {
  it("App snapshot", () => {
    const tree = shallow(<App/>);
    expect(toJson(tree)).toMatchSnapshot();
  });
  it("Calculations snapshots", () => {
    const clSh = shallow(<Calculations {...props.calcProps} />);
    expect(toJson(clSh)).toMatchSnapshot();
  });
  it("Dialog snapshot", () => {
    const cdSh = shallow(<ConfirmationDialog />);
    expect(toJson(cdSh)).toMatchSnapshot();
  });
  it("Dashboard snapshots", () => {
    const dbSh = shallow(<Dashboard/>);
    expect(toJson(dbSh)).toMatchSnapshot();
  });
  it("Input snapshot", () => {
    const inSh = shallow(<Input />);
    expect(toJson(inSh)).toMatchSnapshot();
  });
  it("NumPad snapshots", () => {
    const npSh = shallow(<NumPad/>);
    expect(toJson(npSh)).toMatchSnapshot();
  });
  it("PinCode snapshot", () => {
    const pcdSh = shallow(<PinCode />);
    expect(toJson(pcdSh)).toMatchSnapshot();
  });
  it("SplashScreen snapshot", () => {
    const ssSh = shallow(<SplashScreen />);
    expect(toJson(ssSh)).toMatchSnapshot();
  });
});