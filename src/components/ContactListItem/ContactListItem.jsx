import React from 'react'
import { useState } from 'react'

import { Box, Paper, Typography, Avatar, Collapse, IconButton } from '@mui/material'
import StoryCard from '../StoryCard/StoryCard'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ContactListItem({ contact }) {

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
          <Typography>{contact.pronouns}</Typography>
        </Box>
        <Typography>{contact.location}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* TODO: once roles are included we can uncomment the below */}
          {/* <Typography sx={{ marginRight: 1 }}>{contact.roles[0]}</Typography> */}
          {/* {contact.roles[1] && <Typography>• {contact.roles[1]}</Typography>} */}
        </Box>
      </Box>

      <Collapse
        in={detailsOpen}
      >
        <Box sx={{display: 'flex'}}>
          <Avatar src = {contact.photo}/>
          <Typography variant = 'body2'>{contact.bio}</Typography>
          <Box>
            <Typography variant = 'body2'>most recent contribution:</Typography>
            <StoryCard story={contact.stories[0]}/>

          </Box>
        </Box>
      </Collapse>
    </Paper>
  )
}
