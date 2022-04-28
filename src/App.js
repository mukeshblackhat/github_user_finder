import React , {Component} from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users'
import './App.css';
import axios from 'axios';

class App extends Component {
  state={
    users:[],
    loading:false
  }
  async componentDidMount(){

     this.setState({loading:true})//setting loading true till we get back our data as per requirement 

   const res = await axios
    .get('https://api.github.com/users');
     
     this.setState({users:res.data,loading:false}) //sending the data we got to the main state and reverting back loading to false after getting data 

    
    
  }
  render(){
    return (
      <div className="App">
        <Navbar title="github finder"/>
        <div className="container">
          <Users loading={this.state.loading} users={this.state.users}></Users>
          </div>
        
      </div>
    );
  }
  
}

export default App;
