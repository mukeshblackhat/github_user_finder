import React ,{useContext}from 'react'
import Useritems from './Useritems'
import Spinner from '../layout/spinner'
import PropTypes from 'prop-types'
import GithubContext from '../context/github/githubContext'

const Users =()=> {
  const githubContext=useContext(GithubContext);
  const {loading,users}=githubContext;

  if (loading){
    return(<Spinner/>)
  }
   else 
   {
    return (
      <div style={userStyle}>
      {users.map(user=>(
         <Useritems key={user.id} user={user} />
      ))}
      </div>
    )
   }
    
      
}

Users.propTypes={
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
}
const userStyle={
    display:'grid',
    gridTemplateColumns:'repeat(3,1fr)',
    gridGap:'1rem'
}

export default Users