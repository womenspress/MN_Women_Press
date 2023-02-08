import { flexbox } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Header.css';


export default function Header(props){
    let user = props.user;
    // console.log(user);

    let location = useLocation().pathname;

    return(
        <div className='header'>
            <div >
                <Link to="/home">
                    <h2 className="title">Women's Press of Minnesota Working Title</h2>
                </Link>
            </div>
            <div id='links'>
                {/* If no user is logged in, show these links */}
                {!user.id && (
                // If there's no user, show login/registration links
                <Link className="navLink" to="/login">
                    Login / Register
                </Link>
                )}

                {/* If a user is logged in, show these links */}
                {user.id && (
                <div className='headerButtons'>
                    <LogOutButton className="navLink" />
                    <Link id={location == '/AdminPage' ? 'activeHeader' : ''} className="navLink" to="/AdminPage">
                        Admin
                    </Link>
                </div>
                )}
            </div>
        </div>
    )
}