import React, { Component } from 'react'

class Search extends Component {
    state={
        text:'',
     
    };
    onSubmit=(e)=>{
        e.preventDefault();
        this.props.searchUsers(this.state.text);
        this.setState({text:''});
    };
    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    };
  render() {
    return (
      <div>
        <form  
        onSubmit={this.onSubmit}
         className="form">
            <input type="text" name="text" placeholder="Search User..." value={this.state.text} onChange={this.onChange} />
            <input type="submit" value="search" className="btn btn-dark btn-block"/>
            
        </form>
        <button className="btn btl-light btn-block" onClick={this.props.clearUsers}>Clear</button>

      </div>
    )
  }
}

export default Search