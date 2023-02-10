import React, { useState } from 'react'

//libraries
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//components
import { Box, Button, Paper, Typography, Avatar, Collapse, IconButton, DialogActions, DialogContent, Dialog, DialogContentText, DialogTitle, Modal } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditContactModal from '../EditContactModal/EditContactModal'
import StoryCard from '../StoryCard/StoryCard'
import SortFilterSearch from '../../assets/SortFilterSearch/SortFilterSearch'
import ContactAvatar from '../../assets/ContactAvatar/ContactAvatar';
import ListTags from '../ListTags/ListTags';

export default function ContactListItem({ contact }) {
  const history = useHistory()
  const dispatch = useDispatch();

  const [detailsOpen, setDetailsOpen] = useState(false);

  // delete 
  const [openDelete, setDeleteOpen] = React.useState(false);

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const openDeleteDialog = () => {
    handleDeleteOpen();
  }

  const deleteContact = (id) => {
    console.log('delete contact id:', id);
    dispatch({ type: "DELETE_CONTACT", payload: id })
    handleDeleteClose();
  }

  // edit
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    height: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    padding: 2,
  };

  const avatarStyle = {
    height: 30,
    width: 30,
    margin: 1,
    fontSize: 14
  }

  const [openEdit, setEditOpen] = React.useState(false);

  const handleEditOpen = () => {
    setEditOpen(true);
  }

  const handleEditClose = () => {
    setEditOpen(false);
  }

  const openEditModal = () => {
    handleEditOpen()
  }

  const editContact = (contact) => {
    console.log('edit contact:', contact.id);
    // dispatch({type: "", payload: contact});
    //handleEditClose();
  }

  // remove tag from contact
  const removeTag = (tagID) => {
    // console.log('remove tag', tagID, 'from story: ', id);
    dispatch({ type: 'DELETE_CONTACT_TAG', payload: { tag_id: tagID, contact_id: contact.id } })
  }

  return (
    <Paper sx={{ paddingX: 1, marginY: .5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: .35 }}>
          <IconButton
            size='small'
            onClick={() => setDetailsOpen(!detailsOpen)}>
            {detailsOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </IconButton>
          <Typography sx={{ marginRight: 1 }}>{contact.name}</Typography>
          <Typography>{contact.pronouns}</Typography>
        </Box>
        <Box sx={{ width: .3 }}>
          <ListTags numOfDisplay={contact?.tags.length} tags={contact?.tags} removeTag={removeTag} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', width: '30%' }}>
          <Typography sx={{ ml: 1 }}>
            {contact.roles[0]?.name}
          </Typography>
          {contact.roles[1] &&
            <>
              <Typography>•</Typography>
              <Typography sx={{ mr: 1 }}>
                {contact.roles[1].name}
              </Typography>
            </>}
        </Box>
      </Box>


      <Collapse
        in={detailsOpen}
      >
        <Box display='flex' flexDirection='row' justifyContent='space-between' sx={{ borderTop: '1px solid lightgrey', m: 1 }}>
          <Box sx={{ display: 'flex', mb: 2 }}>
            <ContactAvatar avatarStyle={avatarStyle} contact={contact} />
            <Box sx={{ width: .40, mr: 5, ml: 5 }}>
              <Typography variant='body2' fontSize={18}>Bio:</Typography>
              <Typography variant = 'body2' sx={{ maxHeight: '60px', overflow: 'auto' }} fontSize = {14}>
                {contact.bio}
              </Typography>
            </Box>
            <Box sx={{ width: .45 }} >
              <Typography fontSize={18}>Recent contribution:</Typography>
              <StoryCard story={contact.stories[0]} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'end', width: .25, minWidth: 'fit-content' }}>
            {contact !== undefined && <EditContactModal contact={contact} />}
            <IconButton size='small' onClick={() => openDeleteDialog(contact.id)}>
              <DeleteIcon />
            </IconButton>
            <Dialog
              open={openDelete}
              onClose={handleDeleteClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Delete contact of " + contact.name}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Delete this contact will permanently remove this contact from the database.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDeleteClose}>Cancel</Button>
                <Button onClick={() => deleteContact(contact.id)} autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>

            <Button
              onClick={() => history.push(`/ContactDetails/${contact.id}`)}
              size='small'
              color='inherit'
              endIcon={<ArrowForwardIcon />}>
              to contact page
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  )
}
