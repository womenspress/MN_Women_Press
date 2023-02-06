import React from 'react';
import {Box, Typography, Paper} from '@mui/material'

export default function ThemeSearchCard({theme}) {
  return (
    <Paper>
      <Typography>{theme.name}</Typography>
    </Paper>
  )
}
