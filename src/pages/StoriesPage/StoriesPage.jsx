
import React from 'react';
import { useState } from 'react';

// libraries

// components
import StoryListItem from '../../components/StoryListItem/StoryListItem'
import StoryCreateEditModal from '../../components/StoryCreateEditModal/StoryCreateEditModal';

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Box, Button, IconButton, Typography, Modal } from '@mui/material'

// internal
import { largeModal } from '../../__style'

import { story } from '../../sampleData';

export default function StoriesPage() {

  const [createMode, setCreateMode] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  const handleClickPlus = () => {
    setModalOpen(true)
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant='h3'>Stories Page</Typography>
        <IconButton onClick={handleClickPlus}>
          <ControlPointIcon />
        </IconButton>
      </Box>
      <StoryListItem story={story} createMode={createMode} setCreateMode={setCreateMode} />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}>
        <Box sx={largeModal}>
          <StoryCreateEditModal />
        </Box>
      </Modal>

    </Box>
  )
}