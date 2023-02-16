import React from 'react';
import { useHistory, } from 'react-router-dom';
import './LandingPage.css';


// CUSTOM COMPONENTS
import { Box, Typography, Button, Paper } from '@mui/material'

function LandingPage() {
  const history = useHistory();

  const toRegister = () =>{
    history.push('/register')
  }

  return (
    <Box className="container" bgcolor = 'grey.100' sx = {{width: 550, margin: 'auto'}}>
      {/* <ContactListItem contact={contact}/> */}
      <Paper sx={{ width: 450, margin: 'auto', paddingY: 3, paddingX: 5 }}>
        <Typography variant='h2' sx={{ textAlign: 'center', marginBottom: 3 }}>Welcome!</Typography>
        <Typography variant='body1'><b>MN Women's Press Content Manager</b> is a full-stack desktop web application designed to streamline the pipeline of stories from ideation to publication and serve as a repository for contacts, themes, and archived stories for the MN Women's Press.
        </Typography>
        <br />
        <Typography>To start, create a profile by <b>registering</b> below. You will have to wait for permission from an existing user before you can then access the database.</Typography>
        <br />
        <Typography>Application designed and written by Josh Clemons, Anthony Dampier, Paolo Debuque, Brett Gebbie, and Victoria Mertens of Prime Digital Academy's Shawl cohort.</Typography>
        <br />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            sx={{ textTransform: 'none' }}
            size='large'
            variant='contained'
            onClick= {toRegister}
          >register</Button>
        </Box>
      </Paper>
      
    </Box>
  );
}

export default LandingPage;
