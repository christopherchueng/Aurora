import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import DemoUser from '../DemoUser';
import './Navigation.css';
import SearchBar from '../SearchBar';

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
          <DemoUser />
        </>
      );
    }

    return (
      <div className='navbar'>
          <div className='navbar-list'>
            <div className='navbar-left'>
              <div className='home-logo-ctn'>
                <div className='home-logo-click'>
                  <NavLink exact to="/">
                    <img className='home-logo' title='Home' src='/images/favicon.ico'></img>
                  </NavLink>
                </div>
              </div>
              <div className='portfolio-logo-ctn'>
                <div className='portfolio-logo-click'>
                  <a href='https://christopherchueng.github.io/'>
                    <i className="fa-solid fa-handshake fa-2xl"></i>
                  </a>
                </div>
              </div>
              <div className='github-logo-ctn'>
                <div className='github-logo-click'>
                  <a href='https://github.com/christopherchueng/Aurora'>
                    <i className="fa-brands fa-github fa-2x"></i>
                  </a>
                </div>
              </div>
              <div className='linkedin-logo-ctn'>
                <div className='linkedin-logo-click'>
                  <a href='https://www.linkedin.com/in/christopher-chueng/'>
                    <i className="fa-brands fa-linkedin fa-2x"></i>
                  </a>
                </div>
              </div>
              <div className='angellist-logo-ctn'>
                <div className='angellist-logo-click'>
                  <a href='https://angel.co/u/christopher-chueng'>
                    <i className="fab fa-angellist fa-2x"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className='navbar-right'>
              <div className='searchbar-ctn'>
                <SearchBar />
              </div>
              <div className='add-track-ctn'>
                {sessionUser && <div className='add-track-click'>
                  <NavLink to='/upload'>
                    <img className='add-track-icon' title='Upload' src='/images/add-track-icon.png'></img>
                  </NavLink>
                </div>}
              </div>
              {isLoaded && sessionLinks}
            </div>
          </div>
      </div>
    );
}

export default Navigation;
