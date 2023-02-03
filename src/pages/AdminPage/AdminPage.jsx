import { TextField, Typography, Box, Grid, Button, Card, CardActions, CardContent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


export default function AdminPage() {
    const dispatch = useDispatch();

    const allUsers = useSelector(store => store.user.allUsers);
    const [unauthorizedUsers, setUnauthorizedUsers] = useState([]);
    const [authorizedUsers, setAuthorizedUsers] = useState([]);
    const [viewState, setViewState] = useState('unauthorized')

    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_USERS'})
    }, [])

    useEffect(() => {
            setAuthorizedUsers(allUsers.filter((e) => e.access === true));
            setUnauthorizedUsers(allUsers.filter((e) => e.access === false));
    }, [allUsers]);


    const handleAuthorizeClick = (user) => {
        dispatch({ type: 'SET_USER_ACCESS', payload: { userId: user.id, access: !user.access } });
        console.log('in handleAuthorizeClick', user.id, !user.access);
    }

    const handleDeleteClick = (user) => {
        dispatch({ type: 'DELETE_USER', payload: { userId: user.id } });
        console.log('in handleDeleteClick', user.id)
    }

    return (
        <div className="container">
            <Box >
                <Typography variant='h3'>User Access</Typography>
                <Box display='flex' flexDirection='row-reverse'>
                    <Button variant={(viewState === 'unauthorized' ? 'contained' : 'outlined')} color='warning' onClick={() => setViewState('unauthorized')}>Unauthorized Users</Button>
                    <Button variant={(viewState === 'authorized' ? 'contained' : 'outlined')} color='success' onClick={() => setViewState('authorized')}>Authorized Users</Button>
                </Box>
                <Box sx={{ backgroundColor: 'primary.light' }}>
                    <Grid container space={2}>
                        {viewState === 'unauthorized' ?
                            unauthorizedUsers.map(user => {
                                return (
                                    <Grid item xs={3} key={user.id} sx={{ border: 1, m: 1 }}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant='h5'>{user.username}</Typography>
                                                <Typography variant='h6' mt={2}>Status: Pending</Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button variant='contained' color='success' onClick={() => handleAuthorizeClick(user)}>Activate</Button>
                                                <Button variant='contained' color='error' onClick={() => handleDeleteClick(user)}>Delete</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                )
                            })
                            :
                            authorizedUsers.map(user => {
                                return (
                                    <Grid item xs={3} key={user.id} sx={{ border: 1, m: 1 }}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant='h5'>{user.username}</Typography>
                                                <Typography variant='h6' mt={2}>Authorized</Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button variant='contained' color='warning' onClick={() => handleAuthorizeClick(user)}>Deactivate</Button>
                                                <Button variant='contained' color='error' onClick={() => handleDeleteClick(user)}>Delete</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Box>
            </Box>
        </div>
    );
}