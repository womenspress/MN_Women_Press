import React from 'react';
import { useState } from 'react';
import { Box, Collapse, Button, Typography, Paper } from '@mui/material';

import StatusDropdown from '../../assets/StatusDropdown/StatusDropdown';

/* 
elements to display in the 


*/

export default function StoryListItem({ story }) {

  const [collapseOpen, setCollapseOpen] = useState(false)

  // function to determine color of the status circle
  const statusColor = (story) => {
    return 'red'
  }

  const statusStyle = {
    bgcolor: statusColor(story),
    width: 16,
    height: 16,
    borderRadius: '50%'
  }

  const author = story.contacts.filter(contact=>contact.role==='author');

  return (
    <Paper>
      <Box sx={{ display: 'flex' }}>
        <Box sx={statusStyle}></Box>
        <Typography>{story.title}</Typography>
        <Typography>{author[0].name}</Typography>
        <StatusDropdown story={story}/>
        <Button onClick={() => setCollapseOpen(true)}>open collapse</Button>
      </Box>


      <Collapse in={collapseOpen}>
        <Box>
          more info
          <Button onClick={() => setCollapseOpen(false)}>close collapse</Button>
        </Box>
      </Collapse>
    </Paper>
  )
}
