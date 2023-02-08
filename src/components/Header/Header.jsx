import { flexbox } from '@mui/system';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
// import './Header.css';


// libraries

// components
import { Typography, Button, AppBar, Box, Toolbar, } from '@mui/material'


export default function Header(props) {
  const dispatch = useDispatch()
  const history = useHistory()
  let user = props.user;
  // console.log(user);

  let location = useLocation().pathname;
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    history.push('/login');
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h4" color="inherit" sx={{ textDecoration: 'none', flexGrow: 1 }}>
            MN Women's Press Content Manager
          </Typography>


          {user.id ?
            <>
              <Button sx={{ textTransform: 'none' }} color="inherit" onClick={() => history.push('/adminpage')}>admin</Button>
              <Button sx={{ textTransform: 'none' }} color="inherit" onClick={handleLogout}>logout</Button>
            </>
            :
            <Button color="inherit" onClick={() => history.push('/login')} sx={{ textTransform: 'none' }}>login</Button>
          }



          {/* <Button component = "avatar" src='images/prof-pics/Paolo-prof-pic.png' color="inherit" onClick={() => navigate('/login')}/> */}
        </Toolbar>
      </AppBar>

    </Box>



  )
}