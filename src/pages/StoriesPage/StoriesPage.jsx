import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import StoryListItem from '../../components/StoryListItem/StoryListItem'
import StoryCreateEditModal from '../../components/StoryCreateEditModal/StoryCreateEditModal';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Box, Button, IconButton, Typography, Modal } from '@mui/material'

// internal
import { largeModal } from '../../__style'
// import { story } from '../../sampleData';

export default function StoriesPage() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_ALL_STORIES' })
    dispatch({ type: 'GET_ALL_CONTACTS' })
    // dispatch({ type: 'GET_ALL_THEMES' })
    // dispatch({ type: 'GET_ALL_TAGS' })
  }
    , [])

  const allStories = useSelector(story=>story.stories.allStories)

  //! temporary fix. const allStories = useSelector(store => store.stories.allStories);

  // createMode: will the big story modal be in create or edit mode?
  const [createMode, setCreateMode] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClickPlus = () => {
    setModalOpen(true)
  }

  const handleClose = () =>{
    setModalOpen(false)
    dispatch({type: 'CLEAR_TEMP_STORY'})
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant='h3'>Stories Page</Typography>
        <IconButton onClick={handleClickPlus}>
          <ControlPointIcon />
        </IconButton>
      </Box>
{allStories.length && allStories?.map(story => {
        return (
          <StoryListItem key = {story.title} story={story} createMode={createMode} setCreateMode={setCreateMode} />
        )
      })}

      <Modal
        open={modalOpen}
        onClose={handleClose}>
        <Box sx={largeModal}>
          <StoryCreateEditModal setModalOpen = {setModalOpen} createMode={createMode} />
        </Box>
      </Modal>

    </Box>
  )
}