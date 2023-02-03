import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CreateNewContactModal from '../../components/CreateNewContactModal/CreateNewContactModal';

export default function ContactsPage(){
    return(
    <>
        <Box sx={{display: 'flex'}}>
            <Typography variant="h3" component="h1">
                Contacts
            </Typography>
            <CreateNewContactModal/>
        </Box>
    </>
    )
}