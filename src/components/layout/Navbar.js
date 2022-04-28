import React from 'react'
import PropTypes from 'prop-types'

const Navbar =({title})=> {
  
    return (
      <nav className='navbar bg-primary'>
          <h1>
            <i className="fab fa-github"  />{title}
          </h1>
        
      </nav>
    )
  
}
Navbar.defaultProps={
  title:'github finder'
}
Navbar.propTypes={
  
 title: PropTypes.string.isRequired
}

export default Navbar