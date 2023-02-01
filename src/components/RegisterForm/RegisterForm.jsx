import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, TextField, Paper, Box, Typography, Button } from '@mui/material';



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
    justifyContent:'center',
    alignItems:'center',
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

  return (
<Container>
      <Paper sx={loginStyle}>
        <Box
          component='form'
          sx={formStyle}
          className="formPanel"
          onSubmit={registerUser}>
          <Typography variant='h3'>Welcome!</Typography>
          <Typography textAlign='center' variant='body1'>enter a username and password to create your account</Typography>
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
      </Paper>
    </Container>


    // <form className="formPanel" onSubmit={registerUser}>
    //   <h2>Register User</h2>
    //   {errors.registrationMessage && (
    //     <h3 className="alert" role="alert">
    //       {errors.registrationMessage}
    //     </h3>
    //   )}
    //   <div>
    //     <label htmlFor="username">
    //       Username:
    //       <input
    //         type="text"
    //         name="username"
    //         value={username}
    //         required
    //         onChange={(event) => setUsername(event.target.value)}
    //       />
    //     </label>
    //   </div>
    //   <div>
    //     <label htmlFor="password">
    //       Password:
    //       <input
    //         type="password"
    //         name="password"
    //         value={password}
    //         required
    //         onChange={(event) => setPassword(event.target.value)}
    //       />
    //     </label>
    //   </div>
    //   <div>
    //     <input className="btn" type="submit" name="submit" value="Register" />
    //   </div>
    // </form>
  );
}

export default RegisterForm;
