import React, {Fragment, useContext} from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth/authContext'

const Navbar = ({ title, icon }) => {

  const authContext = useContext(AuthContext)

  const {isAuthenticated, logout, user} = authContext;

  const onLogout = () => {
    logout();
  }
  const authLinks = (
    <Fragment>
      <ul>

      <li>Hey, {user && user.name}</li>
      <li>
        <a onClick={onLogout} href="#!">
         <span >Logout</span>
        </a>
      </li>
      <li>
          <Link to='/about'>About</Link>
          </li>
          </ul>
    </Fragment>
  )
  const guestLinks = (
    <Fragment>
          <ul>
          <li>
            <Link to='/signup'>SignUp</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
          <Link to='/about'>About</Link>
          </li>
          </ul>
    </Fragment>
  )
  return (
    <div className='navbar bg-primary'>
        <h1>
          <i className={icon} /> <i className="fas fa-id-card-alt"></i>{title}
        </h1>
        <ul>
          <li>
            {isAuthenticated ? authLinks : guestLinks}
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