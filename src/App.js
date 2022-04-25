import React , {Component} from 'react';
import Navbar from './components/layout/Navbar';
import UserItems from './components/users/Useritems'
import './App.css';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Navbar title="github finder"/>
        <UserItems></UserItems>
      </div>
    );
  }
  
}

export default App;
