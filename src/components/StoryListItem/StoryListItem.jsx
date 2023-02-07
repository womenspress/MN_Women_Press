import React from 'react';
import { useState } from 'react';

// libraries

// libraries
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'

import { DateTime } from 'luxon';


import { Box, Collapse, Button, Grid, Typography, Paper, Modal, IconButton, Tooltip } from '@mui/material';

import StatusDropdown from '../../assets/StatusDropdown/StatusDropdown';
import CreateStory from '../CreateStory/CreateStory';
import ColorStatusHover from '../../assets/ColorStatusHover/ColorStatusHover';


import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// internal
import { largeModal, smallModal } from '../../__style';
import { makeStatusColor } from '../../modules/makeStatusColor';
import ListTags from '../ListTags/ListTags';

/* 
elements to display in the 


*/

export default function StoryListItem(props) {

  const {
    story,
    createMode,
    setCreateMode,
    setModalOpen
  } = props

  const dispatch = useDispatch();

  const history = useHistory();

  const [collapseOpen, setCollapseOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // builds an array of deadlines on story for later use
  const deadlines = [{ name: 'Rough draft', date: DateTime.fromISO(story.rough_draft_deadline) }, { name: 'Final draft', date: DateTime.fromISO(story.final_draft_deadline) }, { name: 'Publication', date: DateTime.fromISO(story.publication_date) }];

  const upcomingDeadlines = deadlines.filter((date) => date.date > DateTime.now())

  // function to determine color of the status circle
  /* 
   */

  // console.log('story list item, story:', story)

  const statusColor = makeStatusColor(story)

  const statusStyle = {
    bgcolor: statusColor.color,
    width: 16,
    height: 16,
    borderRadius: '50%'
  }

  const getTransform = (position) => {
    // mousePos: [x,y]
    // bottom right corner
    if (position.x > 1200 && position.y > 900) return 'translate(-5%,-5%)';
    // bottom
    if (position.x > 1200) return 'translate(-95%,-105%)';
    // right
    if (position.y > 750) return 'translate(-5%,-105%)';
    // else
    return 'translate(-5%,5%)'
  }

  const author = story.contacts?.filter(contact => contact.story_association === 'author');



  const handleDeleteOpen = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY })
    setDeleteOpen(true);
  }

  const handleEditOpen = () => {
    dispatch({ type: 'SET_TEMP_STORY', payload: story })
    setModalOpen(true);
    setCreateMode(false);
  }

  const handleEditClose = () => {
    setCreateMode(true);
    console.log('in handleEditClose')
    dispatch({type: 'CLEAR_TEMP_STORY'});
    setModalOpen(false);
  }

  const handleDelete = () => {
    dispatch({ type: 'DELETE_STORY', payload: story.id })
    setDeleteOpen(false)
  }

  return (
    <Paper sx={{ paddingX: 1, marginY: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Grid container space={1} display='flex' flexDirection='row' alignItems='center'>
          <Grid item xs={5}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title={statusColor.notes}>
                <Box sx={statusStyle}></Box>
              </Tooltip>
              <IconButton
                size='small'
                onClick={() => setCollapseOpen(!collapseOpen)}>
                {collapseOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}
              </IconButton>
              <Typography>{story.title}</Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Typography>Theme: {story.theme[0]?.name}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>{author.length ? <>Author: {author[0].name}</> : null}</Typography>
          </Grid>
          <Grid item xs={2} display='flex' flexDirection='row-reverse'>
            <StatusDropdown story={story} />
          </Grid>
        </Grid>


      </Box>

      {/* --------------- collapse ---------------- */}
      <Collapse in={collapseOpen}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography>
              {upcomingDeadlines[0] ? <>Upcoming: {upcomingDeadlines[0]?.name}-{upcomingDeadlines[0]?.date.toFormat('MMMM dd, yyyy')}</> : <></>}
            </Typography>
          </Box>
          <Box>
            <ListTags numOfDisplay={3} tags={story.tags} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {JSON.stringify(createMode)}
            <IconButton size='small' onClick={handleEditOpen}>
              <EditIcon />
            </IconButton>
            <IconButton size='small' onClick={handleDeleteOpen}>
              <DeleteIcon />
            </IconButton>
            <Button
              onClick={() => history.push(`/storydetails/${story.id}`)}
              size='small'
              color='inherit'
              endIcon={<ArrowForwardIcon />}>
              to story page
            </Button>
          </Box>
        </Box>
      </Collapse>

      {/* ------------------ modals -------------------- */}
      <Modal
        open={editOpen}
        onClose={handleEditClose}
      >
        <Box
          sx={largeModal}>
          <CreateStory createMode={createMode} setCreateMode={setCreateMode} />
        </Box>
      </Modal>
      <Modal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      >
        <Box
          sx={{ ...smallModal, top: mousePos.y, left: mousePos.x, boxShadow: 5, transform: getTransform(mousePos) }}>delete

          <Button onClick={handleDelete}>delete</Button>
          <Button onClick={() => setDeleteOpen(false)}>cancel</Button>
        </Box>
      </Modal>
    </Paper>
  )
}
