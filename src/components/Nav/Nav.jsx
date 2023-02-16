import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  const location = useLocation().pathname;
  // console.log('path name: ', location);

  return (
    <div className="nav">
      <div className='navList'>
        {/* If no user is logged in, show these links */}
        {/* {!user.currentUser.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )} */}

        {/* If a user is logged in, show these links */}
        {user.currentUser.id && (
          <>
            {/* <Link className="navLink" to="/user">
              Home
            </Link> */}

            {/* <Link className="navLink" to="/info">
              Info Page
            </Link> */}

            <Link id={location == '/StoriesPage' ? 'active' : ''} className="navLink" to="/StoriesPage">
              Stories
            </Link>

            <Link id={location == '/ContactsPage' ? 'active' : ''} className="navLink" to="/ContactsPage">
              Contacts
            </Link>

            <Link id={location == '/ThemesPage' ? 'active' : ''} className="navLink" to="/ThemesPage">
              Themes
            </Link>

            <Link id={location == '/ArchivePage' ? 'active' : ''}  className="navLink" to="/ArchivePage">
              Archive
            </Link>

            {/* <Link className="navLink" to="/AdminPage">
              Admin
            </Link> */}

            {/* <LogOutButton className="navLink" /> */}
          </>
        )}

        {/* <Link className="navLink" to="/about">
          About
        </Link> */}
      </div>
    </div>
  );
}

export default Nav;
