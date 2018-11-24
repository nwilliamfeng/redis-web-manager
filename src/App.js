import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Shell} from './components'
require('./assets/styles/react-contextmenu.css'); //这里react-contextmenu.css需要在全局里声明

class App extends Component {
  render() {

    return (
      <div className="App">
         <Shell/>
      </div>
    );
  }
}

export default App;
