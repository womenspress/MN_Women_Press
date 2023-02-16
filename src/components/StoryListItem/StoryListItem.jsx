import React from 'react';
import { useState } from 'react';


// libraries
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { DateTime } from 'luxon';

// components
import { Box, Collapse, Button, Grid, Typography, Paper, Modal, IconButton, Tooltip } from '@mui/material';
import StatusDropdown from '../../assets/StatusDropdown/StatusDropdown';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// internal
import { smallModal } from '../../__style';
import ListTags from '../ListTags/ListTags';


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
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // builds an array of deadlines on story for later use
  const deadlines = [{ name: 'Rough draft', date: DateTime.fromISO(story?.rough_draft_deadline) }, { name: 'Final draft', date: DateTime.fromISO(story?.final_draft_deadline) }, { name: 'Publication', date: DateTime.fromISO(story?.publication_date) }];

  const upcomingDeadlines = deadlines.filter((date) => date.date > DateTime.now())

  const statusStyle = {
    bgcolor: story.statusColor?.color || 'black',
    width: 16,
    height: 16,
    minWidth: 16,
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

  const author = story.contacts?.filter(contact => contact?.story_association === 'author');

  const handleDeleteOpen = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY })
    setDeleteOpen(true);
  }

  const handleEditOpen = () => {
    dispatch({ type: 'SET_TEMP_STORY', payload: story })
    setModalOpen(true);
    setCreateMode(false);
  }

  const handleDelete = () => {
    dispatch({ type: 'DELETE_STORY', payload: story.id })
    setDeleteOpen(false)
  }

  // remove tag from story
  const removeTag = (tagID) => {
    const story_id = story.id;
    dispatch({ type: 'DELETE_STORY_TAG', payload: { tag_id: tagID, story_id: story_id } })
  }

  return (
    <Paper sx={{ paddingX: 1, marginY: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Grid container space={1} display='flex' flexDirection='row' alignItems='center'>
          <Grid item xs={props.compactMode ? 10 : 6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title={story.statusColor.notes}>
                <Box sx={statusStyle}></Box>
              </Tooltip>

              <IconButton
                size='small'
                onClick={() => setCollapseOpen(!collapseOpen)}>
                {collapseOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}
              </IconButton>
              <Button
                sx={{ textTransform: 'none', color: 'inherit', textAlign: 'left' }}
                onClick={() => history.push(`/storydetails/${story.id}`)}
              >
                <Typography fontWeight='500'>{story.title}</Typography>

              </Button>
            </Box>
          </Grid>
          {props.compactMode ?
            null
            :
            <>
              <Grid item xs={2}>
                {story.theme ?
                  <Typography sx={{ fontWeight: '400', color: 'grey.800', fontSize: 14 }}> {story.theme[0] && `Theme: ${story.theme[0]?.name}`}</Typography>
                  :
                  <></>}
              </Grid>
              <Grid item xs={2}>
                <Typography sx={{ fontWeight: '400', color: 'grey.800', fontSize: 14 }}>{author?.length ? <>by: {author[0]?.name}</> : null}</Typography>
              </Grid>
            </>
          }

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
          {story.tags ?
            <Box>
              <ListTags numOfDisplay={3} tags={story.tags} removeTag={removeTag} />
            </Box>
            :
            <></>
          }
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size='small' onClick={handleEditOpen}>
              <EditIcon />
            </IconButton>
            {props.removeDelete ?
              null
              :
              <IconButton size='small' onClick={handleDeleteOpen}>
                <DeleteIcon />
              </IconButton>
            }
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
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      >
        <Box
          sx={{ ...smallModal, height: 70, top: mousePos.y, left: mousePos.x, boxShadow: 5, transform: getTransform(mousePos) }}>
          <Typography variant='h6' sx={{ fontSize: 16 }}>delete this story?</Typography>
          <Typography variant='body2' sx={{ fontSize: 13 }}>this action can't be undone</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleDelete}>delete</Button>
            <Button onClick={() => setDeleteOpen(false)}>cancel</Button>
          </Box>
        </Box>
      </Modal>
    </Paper>
  )
}
