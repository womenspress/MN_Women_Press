import React from 'react';
import {Box, Typography, Paper} from '@mui/material'

export default function TagSearchCard({tag}) {
  return (
    <Paper>
      <Typography>{tag.name}</Typography>
    </Paper>
  )
}
