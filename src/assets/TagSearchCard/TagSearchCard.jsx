import React from 'react';

//components
import { Box, Typography, Paper, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

//internal
import { smallCard } from '../../__style'

export default function TagSearchCard(props) {

  const {
    tag,
    inputValues,
    setInputValues
  } = props

  const handleRemoveTag = () => {
    console.log('removing tag')
    setInputValues({ ...inputValues, tags: inputValues.tags.filter(el => el.id !== tag.id) })
  }


  return (
    <Paper sx={{ ...smallCard, height: 30, width: 150 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ width: 120, overflow: 'hidden', }}>{tag.name}</Typography>

        <IconButton sx={{ height: 24, width: 24 }} onClick={handleRemoveTag}>
          <CloseIcon sx={{ heigh: 20, width: 20 }} />
        </IconButton>
      </Box>
    </Paper>
  )
}
