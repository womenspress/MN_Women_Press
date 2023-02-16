import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, TextField, Box, Typography, Button } from '@mui/material';



function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }


  return (
    <Container>
      <Box
        component='form'
        sx={{ ...formStyle, bgcolor: 'white', marginTop: 4 }}
        className="formPanel"
        onSubmit={registerUser}>
        <Typography variant='h4' gutterBottom>register</Typography>
        <Typography textAlign='center' variant='body1' gutterBottom sx={{ marginX: 6 }}>enter a username and password to create your account</Typography>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
        <Box>
          <TextField
            type="text"
            name="username"
            size='small'
            label='username'
            value={username}
            sx={{ width: 150, marginX: 'auto', marginY: 1 }}
            required
            onChange={(event) => setUsername(event.target.value)}

          />
        </Box>
        <Box>
          <TextField
            type="password"
            label='password'
            name="password"
            size='small'
            value={password}
            sx={{ width: 150, marginX: 'auto', marginY: 1 }}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </Box>
        <Button type='submit'>Register</Button>
      </Box>
    </Container>

  );
}

export default RegisterForm;
