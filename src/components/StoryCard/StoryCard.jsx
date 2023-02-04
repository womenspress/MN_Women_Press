import React from 'react';
import {Box, Typography} from '@mui/material';

export default function StoryCard({ story }) {
  return (
    <Box>
      <Typography variant = 'body2'>{story?.title}</Typography>
      <Typography variant = 'body2'>{story?.publication_date}</Typography>
    </Box>
  )
}
