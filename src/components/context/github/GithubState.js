import React,{useReducer } from 'react'
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    GET_USER,
    CLEAR_USER,
    GET_REPOS,
    SET_LOADING,
    SET_ALERT,
    REMOVE_ALERT } from '../types';

const GithubState = props=>{
    const initialState={
        users:[],
        user:{},
        repo:[],
        loading:false
    }
    const [state , dispatch]=useReducer(GithubReducer , initialState);

    //search users
    const  searchUsers = async text=>{
      
        setLoading();
        
     const res = await axios
      .get(`https://api.github.com/search/users?q=${text}
      &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

       dispatch({
        type:SEARCH_USERS,
        payload:res.data.items
       })
       
       
  
       
      }

    //Get User
    const getUser=async (username)=>{
        setLoading();
       
        const res = await axios
         .get(`https://api.github.com/users/${username}?
         client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
         &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
          
          dispatch({
            type:GET_USER,
            
            payload:res.data

          })
        //   setUser(res.data);
       
      }

    //Get Repos

    //Clear Users

    //Set Loading
    const setLoading=()=>dispatch({type:SET_LOADING})

    return(
        <GithubContext.Provider
        value={{
            users:state.users,
            user:state.user,
            repos:state.repos,
            loading:state.loading,
            searchUsers,
            getUser,
        }}
        >
          {props.children}
        </GithubContext.Provider>

    )

}

export default GithubState;