import React from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';


import { smallCard } from '../../__style'

export default function ThemeSearchCard(props) {

  const {
    theme,
    inputValues,
    setInputValues
  } = props

  const handleRemoveTheme = () => {
    console.log('removing theme')
    setInputValues({ ...inputValues, theme: inputValues.theme.filter(el => el.id !== theme.id) })
  }

  return (
    <Paper sx={{ ...smallCard, height: 30,width: '90%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>{theme.name}</Typography>
        <IconButton sx={{ height: 24, width: 24 }} onClick={handleRemoveTheme}>
          <CloseIcon sx={{ heigh: 20, width: 20 }} />
        </IconButton>
      </Box>
    </Paper>
  )
}
