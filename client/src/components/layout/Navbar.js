
  
import React from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

const Navbar = ({ title, icon }) => {
  return (
    <div className='navbar bg-primary'>
        <h1>
          <i className={icon} /> <i className="fas fa-id-card-alt"></i>{title}
        </h1>
        <ul>
          <li>
            <Link to='/'>home</Link>
          </li>
          <li>
            <Link to='/about'>about</Link>
          </li>
          <li>
            <Link to='/signup'>Signup</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </ul>
    </div>
  );
};


Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'MyContacts',
  icon: 'fas fa-id-card-alt'
};

export default Navbar;