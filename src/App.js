import React , {useState,useEffect, Fragment} from 'react';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import './App.css';
import axios from 'axios';
import Alert from './components/layout/Alert'
import About from './components/pages/About'

const App=()=> {
  const [users , setUsers]=useState([]);
  const [user, setUser]=useState({});
  const [loading,setLoading]=useState(false);
  const [alert,setAlert]=useState(null);
  const [repos,setRepos]=useState([]);
  
  //  useEffect(()=>{
  //   setLoading(true);
  //   //  this.setState({loading:true})//setting loading true till we get back our data as per requirement 

  //  const res = await axios
  //   .get(`https://api.github.com/users?
  //   client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
  //   &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //     setUser(res.data);
  //     setLoading(false)
  //   //  this.setState({users:res.data,loading:false}) //sending the data we got to the main state and reverting back loading to false after getting data 
  //   })
    //searching github users 
   const  searchUsers= async text=>{
      
      setLoading(true)//setting loading true till we get back our data as per requirement 
      
   const res = await axios
    .get(`https://api.github.com/search/users?q=${text}
    &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
     setUsers(res.data.items);
     setLoading(false);
     

     
    }
    //single user info 
    const getUser=async (username)=>{
      setLoading(true)
      // this.setState({loading:true})//setting loading true till we get back our data as per requirement 
      
      const res = await axios
       .get(`https://api.github.com/users/${username}?
       client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
       &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        
        // this.setState({user: res.data ,loading:false})
        setUser(res.data);
        setLoading(false);
    }

    //get user repos 
    const getUserRepos=async (username)=>{
      // this.setState({loading:true})//setting loading true till we get back our data as per requirement 
      setLoading(true);
      const res = await axios
       .get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&
       client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
       &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        
        // this.setState({repos: res.data ,loading:false})
        setRepos(res.data);
        setLoading(false);
    }

    //clearing users form state 
    const  clearUsers=()=>{
      setUsers([]);setLoading(false);
      // this.setState({users:[],loading:false})
    }
    //setting alert
    const showAlert=(msg,type)=>{
      //  this.setState({alert:{msg:msg,type:type}});
       setAlert({msg:msg,type:type});
       

       setTimeout(()=>setAlert(null),5000)
    }

  
    // const {users , loading ,user ,repos}=this.state;
    return (
      <Router>
      <div className="App">
        <Navbar title="github finder"/>
        <div className="container">
          <Alert alert={alert}/>
          <Switch>
            <Route
              exact path='/'
             render ={props=>(
                <Fragment>
                  <Search 
                    searchUsers={searchUsers} 
                    clearUsers={clearUsers} 
                    showClear={users.length>0?true:false} 
                    setAlert={showAlert}/>

                 <Users 
                   loading={loading} 
                   users={users} />
                </Fragment>
             )
            }
            />
            <Route exact path='/about' component={About}/>
            <Route exact path='/user/:login' render={props=>(
              <User 
                {...props}
                getUser={getUser}
                getUserRepos={getUserRepos}
                user={user} 
                repos={repos}
                loading={loading}

              />
            )} />
          </Switch>
          

          

          </div>
        
      </div>
      </Router>
    );

  
}

export default App;
