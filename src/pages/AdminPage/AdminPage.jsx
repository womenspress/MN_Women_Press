import { TextField, Typography, Box, Grid, Button, Card, CardActions, CardContent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

export default function AdminPage() {
    const dispatch = useDispatch();

    const allUsers = useSelector(store => store.user.allUsers);
    const [unauthorizedUsers, setUnauthorizedUsers] = useState([]);
    const [authorizedUsers, setAuthorizedUsers] = useState([]);
    const [viewState, setViewState] = useState('unauthorized')

    useEffect(() => {
        // this if statement is only here because the server is returning status 200 and setting it to redux.
        // when the query is updated the if can be removed
        if (allUsers !== 'OK') {
            setAuthorizedUsers(allUsers.filter((e) => e.access === true));
            setUnauthorizedUsers(allUsers.filter((e) => e.access === false));
        }
    }, [allUsers]);




    // the following two blocks of data can be removed when the query is in place
    // the variables will also need to be updated in the corresponding 'map' functions in the return object
    const unauthorizedTest = [
        { id: 1, username: 'josh', access: false },
        { id: 2, username: 'paolo', access: false },
        { id: 3, username: 'victoria', access: false },
        { id: 4, username: 'brett', access: false },
        { id: 5, username: 'anthony', access: false },
    ]
    const authorizedTest = [
        { id: 1, username: 'josh1', access: true },
        { id: 2, username: 'paolo2', access: true },
        { id: 3, username: 'victoria3', access: true },
        { id: 4, username: 'brett4', access: true },
        { id: 5, username: 'anthony5', access: true },
    ]

    const handleAuthorizeClick = (user) => {
        dispatch({ type: 'SET_USER_ACCESS', payload: { userId: user.id, access: !user.access } });
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
                            unauthorizedTest.map(user => {
                                return (
                                    <Grid item xs={3} key={user.id} onClick={() => handleAuthorizeClick(user)} sx={{ border: 1, m: 1 }}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant='h5'>{user.username}</Typography>
                                                <Typography variant='h6'>Unauthorized</Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button>Activate User</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                )
                            })
                            :
                            authorizedTest.map(user => {
                                return (
                                    <Grid item xs={3} key={user.id} sx={{ border: 1, m: 1 }}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant='h5'>{user.username}</Typography>
                                                <Typography variant='h6'>Authorized</Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button>Deactivate User</Button>
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