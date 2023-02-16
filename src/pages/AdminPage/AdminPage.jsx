import { Typography, Box, Grid, Button, Card, CardActions, CardContent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckIcon from '@mui/icons-material/Check';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';


export default function AdminPage() {
  const dispatch = useDispatch();

  const allUsers = useSelector(store => store.user.allUsers);
  const currentUser = useSelector(store => store.user.currentUser);
  const [unauthorizedUsers, setUnauthorizedUsers] = useState([]);
  const [authorizedUsers, setAuthorizedUsers] = useState([]);
  const [viewState, setViewState] = useState('unauthorized')

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_USERS' })
  }, [])

  useEffect(() => {
    // does not include logged in user in list (someone else would need to change their access or delete the user)
    setAuthorizedUsers(allUsers.filter((e) => e.access === true && e.id !== currentUser.id));
    setUnauthorizedUsers(allUsers.filter((e) => e.access === false));
  }, [allUsers]);


  const handleAuthorizeClick = (user) => {
    dispatch({ type: 'SET_USER_ACCESS', payload: { userId: user.id, access: !user.access } });
  }

  // TODO: add confirmation modal before deleting a user
  const handleDeleteClick = (user) => {
    dispatch({ type: 'DELETE_USER', payload: { userId: user.id } });
  }

  return (
    <div className="container">
      <Box >
        <Typography variant='h3'>User Access</Typography>
        <Box display='flex' flexDirection='row-reverse' mb={'1px'}>
          <Button variant={(viewState === 'unauthorized' ? 'contained' : 'outlined')} sx={{ color: 'primary', borderColor: 'primary', borderRadius: 2 }} onClick={() => setViewState('unauthorized')}>Unauthorized Users</Button>
          <Button variant={(viewState === 'authorized' ? 'contained' : 'outlined')} sx={{ color: 'primary', borderColor: 'primary', borderRadius: 2 }} onClick={() => setViewState('authorized')}>Authorized Users</Button>
        </Box>
        <Box sx={{
          backgroundColor: 'grey.100',
          minHeight: '60vh',
          border: '1px solid #951c2a',
          borderRadius: 2,
          boxShadow: 2,
          padding: 2,
        }}>
          <Grid container space={2}>
            {viewState === 'unauthorized' ?
              unauthorizedUsers.map(user => {
                return (
                  <Card sx={{ width: '250px', border: '1px solid #951c2a', borderRadius: 1, m: 1 }}>
                    <CardContent>
                      <Typography variant='h5'>{user.username}</Typography>
                      <Typography variant='h6' mt={2}>Status: Pending</Typography>
                    </CardContent>
                    <CardActions display='flex' flexDirection='row' sx={{ justifyContent: 'center' }}>
                      <Button variant='contained' sx={{ color: 'primary', borderColor: 'primary' }} onClick={() => handleAuthorizeClick(user)}>Activate <CheckIcon sx={{ pl: 1 }} /></Button>
                      <Button variant='contained' color='error' onClick={() => handleDeleteClick(user)}>Delete <DeleteForeverIcon sx={{ pl: 1 }} /></Button>
                    </CardActions>
                  </Card>
                )
              })
              :
              authorizedUsers.map(user => {
                return (
                  <Card sx={{ width: '250px', border: '1px solid #951c2a', borderRadius: 1, m: 1 }}>
                    <CardContent>
                      <Typography variant='h5'>{user.username}</Typography>
                      <Typography variant='h6' mt={2}>Authorized</Typography>
                    </CardContent>
                    <CardActions >
                      <Button variant='contained' sx={{ color: 'primary', borderColor: 'primary' }} onClick={() => handleAuthorizeClick(user)}>Deactivate <DoDisturbIcon sx={{ pl: 1 }} /></Button>
                    </CardActions>
                  </Card>
                )
              })
            }
          </Grid>
        </Box>
      </Box>
    </div>
  );
}