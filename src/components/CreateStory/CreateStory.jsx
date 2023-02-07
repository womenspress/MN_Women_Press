import React from 'react'
import { Box } from '@mui/material'

export default function CreateStory({createMode}) {
  return (
    <Box display='flex' flexDirection='row' justifyContent='space-between'>
      {createMode? 'Create Story': 'Edit Story'}
    </Box>
  )
}
