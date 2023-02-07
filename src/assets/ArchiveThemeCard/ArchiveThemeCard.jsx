import React from 'react'

// libraries

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
          theme.date
        </Typography>
      </Box>
      {/* <Typography variant='body2' fontSize = {12}>{theme.description}</Typography> */}
    </Paper>
  )
}
