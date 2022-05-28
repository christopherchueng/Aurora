import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
      sessionLinks = (
        <ProfileButton user={sessionUser} />
      );
    } else {
      sessionLinks = (
        <>
          <LoginFormModal />
          <SignupFormModal />
        </>
      );
    }

    return (
      <div className='navbar'>
          <div className='navbar-list'>
            <div className='navbar-left'>
              <NavLink exact to="/">Home</NavLink>
            </div>
            <div className='navbar-right'>
              {isLoaded && sessionLinks}
            </div>
          </div>
      </div>
    );
}

export default Navigation;
