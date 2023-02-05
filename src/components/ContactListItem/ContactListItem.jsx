import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom';

import { Box, Button, Paper, Typography, Avatar, Collapse, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import StoryCard from '../StoryCard/StoryCard'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ContactListItem({ contact }) {
  const history = useHistory()

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
        <Typography>{contact.mailing_address}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ marginRight: 1 }}>{contact.roles[0]?.name}</Typography>
          {contact.roles[1] && <Typography>• {contact.roles[1].name}</Typography>}
        </Box>
      </Box>
      <Collapse
        in={detailsOpen}
      >
        <Box display='flex' flexDirection='row' justifyContent='space-between'>
          <Box sx={{ display: 'flex' }}>
            <Avatar src={contact.photo} />
            <Typography variant='body2'>{contact.bio}</Typography>
            <Box>
              <Typography variant='body2'>most recent contribution:</Typography>
              <StoryCard story={contact.stories[0]} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size='small'>
              <EditIcon />
            </IconButton>
            <IconButton size='small'>
              <DeleteIcon />
            </IconButton>
            <Button
              onClick={() => history.push(`/ContactDetails/${contact.id}`)}
              size='small'
              color='inherit'
              endIcon={<ArrowForwardIcon />}>
              to contact page
            </Button>
          </Box>
        </Box>


      </Collapse>
    </Paper>
  )
}
