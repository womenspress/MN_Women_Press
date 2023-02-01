import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <div className='navList'>
        {/* If no user is logged in, show these links */}
        {!user.currentUser.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.currentUser.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <Link className="navLink" to="/StoriesPage">
              Stories Page
            </Link>

            <Link className="navLink" to="/ArchivePage">
              Archive Page
            </Link>

            <Link className="navLink" to="/ContactsPage">
              Contacts Page
            </Link>

            <Link className="navLink" to="/ThemesPage">
              Themes Page
            </Link>

            <Link className="navLink" to="/AdminPage">
              Admin Page
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
