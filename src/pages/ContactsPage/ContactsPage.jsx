import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CreateNewContactModal from '../../components/CreateNewContactModal/CreateNewContactModal';

import './ContactsPage.css'

export default function ContactsPage(){
    return(
    <>
        <div id="page-header">
            <Typography variant="h3" component="h1">
                contacts
            </Typography>
            <CreateNewContactModal/>
        </div>
    </>
    )
}