import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button className='profile-btn' title='Menu' onClick={openMenu}>
        <i className="fas fa-user-circle fa-3x" />
      </button>
      {showMenu && (
        <div className='profile-dropdown-menu'>
          <ul className="profile-dropdown">
            <a className='dropdown-nav' href='https://github.com/christopherchueng/Aurora'><li>Github</li></a>
            <a className='dropdown-nav' href='https://github.com/christopherchueng/Aurora'><li>Github</li></a>
            <a className='dropdown-nav' href='https://github.com/christopherchueng/Aurora'><li>Github</li></a>
            <a className='dropdown-nav' href='https://github.com/christopherchueng/Aurora'><li>Github</li></a>
            <a className='dropdown-nav' href='https://github.com/christopherchueng/Aurora'><li>Github</li></a>
            <a className='dropdown-nav' href='https://github.com/christopherchueng/Aurora'><li>Github</li></a>
            <li className='dropdown-nav' onClick={logout}>Logout</li>
          </ul>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
