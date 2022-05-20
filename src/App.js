import React , {Component, Fragment} from 'react';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import './App.css';
import axios from 'axios';
import Alert from './components/layout/Alert'
import About from './components/pages/About'

class App extends Component {
  state={
    users:[],
    user:{},
    loading:false,
    alert:null
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
    //single user info 
    getUser=async (username)=>{
      this.setState({loading:true})//setting loading true till we get back our data as per requirement 
      
      const res = await axios
       .get(`https://api.github.com/users/${username}?
       client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
       &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        
        this.setState({user: res.data ,loading:false})
    }

    //clearing users form state 
    clearUsers=()=>{
      this.setState({users:[],loading:false})
    }
    //setting alert
    setAlert=(msg,type)=>{
       this.setState({alert:{msg:msg,type:type}});
       

       setTimeout(()=>this.setState({alert:null}),5000)
    }

  render(){
    const {users , loading ,user}=this.state;
    return (
      <Router>
      <div className="App">
        <Navbar title="github finder"/>
        <div className="container">
          <Alert alert={this.state.alert}/>
          <Switch>
            <Route
              exact path='/'
             render ={props=>(
                <Fragment>
                  <Search 
                    searchUsers={this.searchUsers} 
                    clearUsers={this.clearUsers} 
                    showClear={users.length>0?true:false} 
                    setAlert={this.setAlert}/>

                 <Users 
                   loading={loading} 
                   users={users} />
                </Fragment>
             )
            }
            />
            <Route exact path='/about' component={About}/>
            <Route exact path='/user/:login' render={props=>(
              <User {...props} getUser={this.getUser} user={user} loading={loading}/>
            )} />
          </Switch>
          

          

          </div>
        
      </div>
      </Router>
    );
  }
  
}

export default App;
