import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { Paper, Typography, TextField, Button, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

function LoginPage() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();


  const login = (e) => {
    console.log('logging in user: ', username)
    e.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
      // if login is successful, move the user to their dashboard
      history.push('/StoriesPage')
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }

  const loginStyle = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: 5,
    width: 300,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (

    <Paper sx={loginStyle}>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <Box
        component='form'
        className='login-form'
        onSubmit={login}
        sx={formStyle}
      >
        <Typography style={{ textAlign: 'center', width: 300 }} variant='h4' sx={{ mb: 2 }}>Welcome to MN Women's Press Content Manager</Typography>
        <Box>
          <TextField
            size="small"
            sx={{ width: 150, marginX: 'auto', marginY: 1 }}
            label='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /></Box>
        <Box>
          <TextField
            size="small"
            sx={{ width: 150, marginX: 'auto', marginY: 1 }}
            label='password'
            value={password}
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          /></Box>
        <Box sx={{ mt: 2 }}>
          <Button onClick={() => history.push('/register')}>register</Button>
          <Button type='submit'>log in</Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default LoginPage;
