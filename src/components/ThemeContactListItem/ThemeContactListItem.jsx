import React from 'react'
import { useState} from 'react';
import { useHistory } from 'react-router-dom';

import { Box, Paper, Typography, Avatar, Collapse, IconButton, Button } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function ThemeContactListItem(props){
    const history = useHistory();

    const contact = props.contact;
    
    const [detailsOpen, setDetailsOpen] = useState(false);

    return (
        <Paper sx={{ paddingX: 1, marginY: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        size='small'
                        onClick={() => setDetailsOpen(!detailsOpen)}>
                        {detailsOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    <Typography sx={{ marginRight: 1 }}>{contact.name}</Typography>
                    <Typography>{contact?.pronouns}</Typography>
                </Box>
                <Typography>{contact?.mailing_address}</Typography>
            </Box>

            <Collapse
                in={detailsOpen}
            >
                <Box sx={{display: 'flex'}}>
                    <Avatar src = {contact?.photo}/>
                    <Typography variant = 'body2'>{contact?.bio}</Typography>
                    <Button
                        onClick={() => history.push("/ContactDetails/"+contact?.id)}
                        size='small'
                        color='inherit'
                        endIcon={<ArrowForwardIcon />}>
                        to contact page
                    </Button>
                </Box>
            </Collapse>
        </Paper>
    )
}
