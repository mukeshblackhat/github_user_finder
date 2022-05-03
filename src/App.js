import React , {Component} from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users'
import Search from './components/users/Search'
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
    .get(`https://api.github.com/users?
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
     
     this.setState({users:res.data,loading:false}) //sending the data we got to the main state and reverting back loading to false after getting data 
    }
    //searching github users 
    searchUsers= async text=>{

      this.setState({loading:true})//setting loading true till we get back our data as per requirement 

   const res = await axios
    .get(`https://api.github.com/search/users?q=${text}
    &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
     
     this.setState({users: res.data.items ,loading:false})
    }

    //clearing users form state 
    clearUsers=()=>{
      this.setState({users:[],loading:false})
    }

  render(){
    return (
      <div className="App">
        <Navbar title="github finder"/>
        <div className="container">
          <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers}/>
          <Users loading={this.state.loading} users={this.state.users} ></Users>
          </div>
        
      </div>
    );
  }
  
}

export default App;
