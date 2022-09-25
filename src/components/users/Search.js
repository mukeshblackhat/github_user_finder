import React, {useState , useContext} from 'react'
import GithubContext from '../context/github/githubContext';

const  Search =({showClear , clearUsers, setAlert})=> {
     const [text , setText]=useState();
     const githubContext = useContext(GithubContext);

   const  onSubmit=(e)=>{
        e.preventDefault();
        if(text===''){
           setAlert('Please write something....','light')
        }
        else {
            githubContext.searchUsers(text);
            setText('');
        }
       
    };
  const   onChange=(e)=>{
        setText(e.target.value)
    };
 
     
    return (
      <div>
        <form  
        onSubmit={onSubmit}
         className="form">
            <input type="text" name="text" placeholder="Search User..." value={text} onChange={onChange} />
            <input type="submit" value="search" className="btn btn-dark btn-block"/>
            
        </form>
        {showClear && <button className="btn btl-light btn-block" onClick={clearUsers}>Clear</button>}
        

      </div>
    )

}

export default Search