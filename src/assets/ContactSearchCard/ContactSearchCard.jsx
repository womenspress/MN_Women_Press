import React from 'react';
import {Box, Typography, Paper} from '@mui/material'

export default function ContactSearchCard({contact}) {
  return (
    <Paper>
      <Typography>{contact.name}</Typography>
    </Paper>
  )
}
