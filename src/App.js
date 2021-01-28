import React from "react"
import SplashScreen from "./components/SplashScreen"
import Dashboard from "./components/Dashboard"
import PinCode from "./components/PinCode"
import { Route, Switch, Redirect } from "react-router-dom";
import Container from '@material-ui/core/Container';


const App = (props) => {
    
    return (
        <main>
            
            <Container maxWidth="sm">

                <Switch>
                    {/* <Route path="/" component={Home} exact /> */}
                    <Route exact path="/">
                        <Redirect to="/splashscreen" component={SplashScreen} />
                    </Route>
                    <Route path="/splashscreen" component={SplashScreen} />
                    <Route path ="/dashboard" component={Dashboard} />
                    <Route path ="/pincode" component={PinCode} />
                </Switch>
            </Container>
        </main>
    )
}

// import React, { Component } from 'react';
// import Keyboard from 'react-simple-keyboard';
// import 'react-simple-keyboard/build/css/index.css';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';

// class App extends Component {

//   state = {
//     layoutName: "default",
//     input: ""
//   };

//   onChange = input => {
//     this.setState({
//       input: input
//     });
//     console.log("Input changed", input);
//   };

//   onChangeInput = event => {
//     let input = event.target.value;
//     this.setState(
//       {
//         input: input
//       },
//       () => {
//         this.keyboard.setInput(input);
//       }
//     );
//   };
  
//   // onChange = (input) => {
//   //   console.log("Input changed", input);
//   // }

//   onKeyPress = (button) => {
//     console.log("Button pressed", button);
//   }

//   render(){
//     return (
//       <main>
//       <Switch>
//             </Switch>
//       </main>
//       <div>
//       <input 
//         value={this.state.input} 
//         className="input" 
//         placeholder="Tap on the virtual keyboard to start" 
//         onChange={e => this.onChangeInput(e)}/>
	
//       <Keyboard
//         onChange={this.onChange}
//         onKeyPress={this.onKeyPress}
//         theme={"hg-theme-default hg-layout-default myTheme"}
//           layoutName={this.state.layoutName}
//           layout={{
//             default: ["1 2 3", "4 5 6", "7 8 9", " 0 ", "{bksp}"],
//             shift: ["! / #", "$ % ^", "& * (", "{shift} ) +", "{bksp}"]
//           }}
//       />
//       </div>
//     );
//   }
// }
// import logo from './logo.svg';
// import './App.css';
// import React,{ useState } from 'react';
// import Person from './Person/Person'
// import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
// import Keyboard from "react-simple-keyboard";
// import "react-simple-keyboard/build/css/index.css";
// import "./index.css";

// const App = props =>{
//   const state = {
//     layoutName: "default",
//     input: ""
//   };

//   const onChange = input => {
//     this.setState({ input });
//     console.log("Input changed", input);
//   };

//   const onKeyPress = button => {
//     console.log("Button pressed", button);

//     /**
//      * If you want to handle the shift and caps lock buttons
//      */
//     if (button === "{shift}" || button === "{lock}") this.handleShift();
//   };

//   const handleShift = () => {
//     const layoutName = this.state.layoutName;

//     this.setState({
//       layoutName: layoutName === "default" ? "shift" : "default"
//     });
//   };

//   const onChangeInput = event => {
//     const input = event.target.value;
//     this.setState({ input });
//     this.keyboard.setInput(input);
//   };

//   const[numbval, setNumber] = useState('');
  


//   const [personsState, setPersonsState] = useState({
//       numberpad: [
//         { num: '1'},
//         { num: '2'},
//         { num: '3'},
//         { num: '4'},
//         { num: '5'},
//         { num: '6'},
//         { num: '7'},
//         { num: '8'},
//         { num: '9'},
//         { num: '0'}

//       ]});
    
//       const switchNameHanlder = () => {
//         setPersonsState({
//           persons: [
//             { name: 'Maximilian', age: 28},
//             { name: 'Manu', age: 29},
//             { name: 'Max', age: 26},
//           ]
//         })
//       }

//   // state ={
//   //   persons: [
//   //     { name: 'Max', age: 28},
//   //     { name: 'Manu', age: 29},
//   //     { name: 'Max', age: 26},
      
//   //   ],
//   //   otherState: 'some other value'
//   // }

//   // switchNameHanlder = () => {
//   //   this.setState({
//   //     persons: [
//   //       { name: 'Maximilian', age: 28},
//   //       { name: 'Manu', age: 29},
//   //       { name: 'Max', age: 26},
//   //     ]
//   //    })
//   // }
    
//     return(
//       <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />

//         <div>
//           <input
//             value={this.state.input}
//             placeholder={"Tap on the virtual keyboard to start"}
//             onChange={this.onChangeInput}
//           />
//           <Keyboard
//             keyboardRef={r => (this.keyboard = r)}
//             layoutName={this.state.layoutName}
//             onChange={this.onChange}
//             onKeyPress={this.onKeyPress}
//           />
//         </div>


//         <div class="simple-keyboard"></div>
//         <ButtonGroup color="primary" aria-label="outlined primary button group">
//           <Button onClick={() => { alert('One') }}>One</Button>
//           <Button onClick={() => { alert('Two') }}>Two</Button>
//           <Button onClick={() => { alert('Three') }}>Three</Button>
//         </ButtonGroup>
//         <ButtonGroup color="primary" aria-label="outlined primary button group">
//           <Button>Four</Button>
//           <Button>Five</Button>
//           <Button>Six</Button>
//         </ButtonGroup>
//         <ButtonGroup color="primary" aria-label="outlined primary button group">
//           <Button>Seven</Button>
//           <Button>Eight</Button>
//           <Button>Nine</Button>
//         </ButtonGroup>
//         <ButtonGroup color="primary" aria-label="outlined primary button group">
//           <Button>Zero</Button>
//         </ButtonGroup>

//         <Button variant="outlined" onClick={() => { alert('clicked') }}>Click me</Button>
//         <p>
//           Edit <code>src/App.js</code> and save to reload this bich.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//           >
//           Learn React
//         </a>
//         </header>
      
//     </div>
//     )
//   }



export default App;