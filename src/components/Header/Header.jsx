import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Header.css';


export default function Header(props){
    let user = props.user;
    console.log(user);

    return(
        <div className='header'>
            <div >
                <Link to="/home">
                    <h2 className="title">Women's Press of Minnesota Working Title</h2>
                </Link>
            </div>
            <div>
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
                    <Link className="navLink" to="/AdminPage">
                        Admin
                    </Link>
                </div>
                )}
            </div>
        </div>
    )
}