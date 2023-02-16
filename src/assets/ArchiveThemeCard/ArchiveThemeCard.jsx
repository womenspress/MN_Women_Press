import React from 'react'

// libraries
import {DateTime} from 'luxon'

// components
import { Box, Paper, Typography } from '@mui/material'

export default function ArchiveThemeCard(props) {

  const {
    theme,
    setSelectedTheme
  } = props

const handleClick= () =>{
  setSelectedTheme(theme)
}

  return (
    <Paper sx={{ margin: .5, padding: 1, overflow: 'hidden', overflowY: 'scroll', cursor: 'pointer' }} onClick = {handleClick}>
      <Box sx = {{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography variant='h6'>
          {theme.name}
        </Typography>
        <Typography variant = 'body2'>
          {DateTime.fromISO(theme.month_year).toFormat('MMMM, yyyy')}
        </Typography>

      </Box>
    </Paper>
  )
}
