import React, { useState } from 'react'

//libraries
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//components
import { Box, Button, Paper, Typography, Collapse, IconButton, Modal, Grid } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditContactModal from '../EditContactModal/EditContactModal'
import StoryCard from '../StoryCard/StoryCard'
import ContactAvatar from '../../assets/ContactAvatar/ContactAvatar';
import ListTags from '../ListTags/ListTags';
import { smallModal } from '../../__style';


export default function ContactListItem(props) {

  const {
    contact,
    compact
  } = props

  const history = useHistory()
  const dispatch = useDispatch();

  const numOfTagsDisplay = 2;

  const [detailsOpen, setDetailsOpen] = useState(false);

  // delete 
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleDelete = () => {
    dispatch({ type: "DELETE_CONTACT", payload: contact.id });
    dispatch({ type: 'GET_ALL_THEMES' });
    dispatch({ type: 'GET_ALL_CONTACTS' });
    dispatch({ type: 'GET_ALL_STORIES' });
    handleDeleteClose();
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

  const avatarStyle = {
    height: 60,
    width: 60,
    margin: 1,
    fontSize: 24
  }

  const avatarStyleCompact = {
    height: 50,
    width: 50,
    margin: 1,
    fontSize: 14
  }

  const handleDeleteOpen = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY })
    setDeleteOpen(true);
  }

  // remove tag from contact
  const removeTag = (tagID) => {
    dispatch({ type: 'DELETE_CONTACT_TAG', payload: { tag_id: tagID, contact_id: contact.id } })
  }

  return (
    <Paper sx={{ paddingX: 1, marginY: .5, height: "fit-content" }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: compact ? .8 : .35 }}>
          <IconButton
            size='small'
            onClick={() => setDetailsOpen(!detailsOpen)}>
            {detailsOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </IconButton>
          <Button sx={{ textTransform: 'none' }} onClick={() => history.push(`/ContactDetails/${contact.id}`)}>
            <Typography sx={{ marginRight: 1, fontWeight: '500' }}>{contact.name}</Typography>
          </Button>
          <Typography sx={{ fontSize: 14, color: 'grey.800' }}>{contact.pronouns}</Typography>

        </Box>
        {
          compact ? null :
            <>
              <Box sx={{ width: .3, height: .50 }}>
                <ListTags numOfDisplay={numOfTagsDisplay} tags={contact?.tags} removeTag={removeTag} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', width: '30%' }}>
                <Typography sx={{ ml: 1, fontSize: 14, color: 'grey.800' }}>
                  {contact.roles[0]?.name}
                </Typography>

                {contact.roles[1] &&
                  <>
                    <Typography sx={{ fontSize: 14, color: 'grey.800' }}>•</Typography>
                    <Typography sx={{ mr: 1, fontSize: 14, color: 'grey.800' }}>
                      {contact.roles[1].name}
                    </Typography>
                  </>}
              </Box>
            </>
        }
      </Box>

      <Collapse
        in={detailsOpen}

      >
        <Grid container spacing={1} sx={{ borderTop: '1px solid lightgrey', m: 1 }}>
          <Grid item xs={compact ? 2 : 1} sx={{ textAlign: 'right' }}>
            <Button onClick={() => history.push(`/ContactDetails/${contact.id}`)} >
              <ContactAvatar avatarStyle={compact ? avatarStyleCompact : avatarStyle} contact={contact} />
            </Button>
          </Grid>
          <Grid item xs={compact ? 9 : 5}>
            <Typography variant='body2' fontSize={compact ? 16 : 18}>Bio:</Typography>
            <Typography variant='body2' sx={{ maxHeight: '60px', overflow: 'auto' }} fontSize={compact ? 13 : 14}>
              {contact.bio}
            </Typography>
          </Grid>{compact ? null : <>
            <Grid item xs={3}>
              <Typography fontSize={18}>Recent contribution:</Typography>
              <StoryCard story={contact.stories[0]} />
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <Box sx={{ display: 'flex', alignItems: 'end', width: .25, minWidth: 'fit-content', mr: 3 }}>
                {contact !== undefined && <EditContactModal contact={contact} />}
                <IconButton size='small' onClick={handleDeleteOpen}>
                  <DeleteIcon />
                </IconButton>
                <Button
                  onClick={() => history.push(`/ContactDetails/${contact.id}`)}
                  size='small'
                  color='inherit'
                  endIcon={<ArrowForwardIcon />}>
                  to contact page
                </Button>
              </Box>
            </Grid>
          </>}
        </Grid>
      </Collapse>
      <Modal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      >
        <Box
          sx={{ ...smallModal, height: 70, top: mousePos.y, left: mousePos.x, boxShadow: 5, transform: getTransform(mousePos) }}>
          <Typography variant='h6' sx={{ fontSize: 16 }}>delete this contact?</Typography>
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
