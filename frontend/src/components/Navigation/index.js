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
              <NavLink exact to="/">
                <img src='/images/favicon.ico' className='home-logo'></img>
                </NavLink>
            </div>
            <div className='navbar-right'>
              <NavLink to='/upload'>
                <i class="fa-thin fa-plus"></i>
              </NavLink>
              {isLoaded && sessionLinks}
            </div>
          </div>
      </div>
    );
}

export default Navigation;
