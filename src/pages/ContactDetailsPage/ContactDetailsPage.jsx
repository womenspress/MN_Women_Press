import React, { useEffect, useState, useRef } from 'react';
import { Box, Grid, Modal, Typography, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import StoryListItem from '../../components/StoryListItem/StoryListItem';
import ContactAvatar from '../../assets/ContactAvatar/ContactAvatar'

import EditContactModal from '../../components/EditContactModal/EditContactModal';
import StoryCreateEditModal from '../../components/StoryCreateEditModal/StoryCreateEditModal';
import { largeModal, mainContentBox } from '../../__style'



export default function ContactDetailsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    setGeneralInfoHeight(document.getElementById("generalInfoSection").offsetHeight - 1)
  })

  useEffect(() => {
    dispatch({ type: 'GET_ALL_CONTACTS' });
    dispatch({ type: 'GET_ALL_STORIES' })
  }, [])

  const { id } = useParams();
  const allContacts = useSelector(store => store.contacts.allContacts)
  const allStories = useSelector(store => store.stories.allStories);

  const [modalOpen, setModalOpen] = useState(false);
  const [createMode, setCreateMode] = useState(true);
  const [contact, setContact] = useState({ name: 'asdf', });
  const [contactStories, setContactStories] = useState([]);

  const [generalInfoHeight, setGeneralInfoHeight] = useState(0);

  // createMode: will the big story modal be in create or edit mode?

  useEffect(() => {
    setContact(allContacts.filter((contact) => contact.id == id));
  }, [allContacts])

  useEffect(() => {
    let tempStories = [];

    allStories.map((story) => {
      story.contacts.filter(contact => contact.id == id).length > 0 ? tempStories.push(story) : null;
    })
    setContactStories(tempStories)
  }, [allStories])

  const avatarStyle = {
    height: 60,
    width: 60,
    margin: 1
  }

  const handleClose = () => {
    setModalOpen(false)
    dispatch({ type: 'CLEAR_TEMP_STORY' })
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* profile image */}
        {contact[0]?.id &&
          <ContactAvatar contact={contact[0]} avatarStyle={avatarStyle} />}
        {/* holds name, pronouns, and expertise */}
        <Box display='flex' flexDirection='column' justifyContent='center' height={150}>
          <Box display='flex' flexDirection='row' alignItems='flex-end'>
            <Typography variant='h3'>{contact[0]?.name}</Typography>
            <Typography variant='h6' sx={{ ml: 1 }}>{contact[0] ? <>({contact[0]?.pronouns})</> : null}</Typography>
          </Box>
          <Typography variant='h6' fontStyle='italic'>{contact[0]?.expertise}</Typography>
        </Box>
      </Box>
      <Grid container space={1}>

        {/* start of row that holds general info and contribution headers, as well as sort by an search field */}
        <Grid item xs={4} display='flex'>
          <Typography variant='h5' fontWeight='bold' sx={{ mr: 1 }}>General Info </Typography>
          {contact[0] ? <EditContactModal contact={contact[0]} /> : null}
        </Grid>
        <Grid item xs={4}>
          <Typography variant='h5' fontWeight='bold' sx={{ ml: 2 }}>Contributions</Typography>
        </Grid>

        {/* search item, need to finish functionality */}
        <Grid item xs={4}>
          <TextField
            variant='outlined'
            label='Search'
            fullWidth
            size='small'
          />

        </Grid>
        {/* this row contains the two large sections of information, general info and contributions */}
        <Grid container space={1}>


          {/* general info section */}
          <Grid item xs={4} id='generalInfoSection' sx={{ ...mainContentBox, m: 0, mt: 1 }}>
            <Typography variant='h6' fontWeight='bold' sx={{ mt: 1 }}>Bio</Typography>
            <Typography variant='body1'>{contact[0]?.bio}</Typography>
            <Typography variant='h6' fontWeight='bold' sx={{ mt: 1 }}>Role(s)</Typography>
            {contact[0]?.roles?.map((role, i) => {
              return <Typography key={role?.id} variant='body1'>{role?.name}</Typography>
            })}
            <Typography variant='h6' fontWeight='bold' sx={{ mt: 1 }}>Mailing Address</Typography>
            <Typography variant='body1'>{contact[0]?.mailing_address}</Typography>
            <Typography variant='h6' fontWeight='bold' sx={{ mt: 1 }}>Billing Address</Typography>
            <Typography variant='body1'>{contact[0]?.billing_address}</Typography>
            <Typography variant='h6' fontWeight='bold' sx={{ mt: 1 }}>Email</Typography>
            <Typography variant='body1'>{contact[0]?.email}</Typography>
            <Typography variant='h6' fontWeight='bold' sx={{ mt: 1 }}>Phone</Typography>
            <Typography variant='body1'>{contact[0]?.phone}</Typography>
            <Typography variant='h6' fontWeight='bold' sx={{ mt: 1 }}>LinkedIn</Typography>
            <Typography variant='body1'>{contact[0]?.linkedin}</Typography>
            <Typography variant='h6' fontWeight='bold' sx={{ mt: 1 }}>Twitter</Typography>
            <Typography variant='body1'>{contact[0]?.twitter}</Typography>
            <Typography variant='h6' fontWeight='bold' sx={{ mt: 1 }}>Instagram</Typography>
            <Typography variant='body1'>{contact[0]?.instagram}</Typography>
            <Typography variant='h6' fontWeight='bold' sx={{ mt: 1 }}>Facebook</Typography>
            <Typography variant='body1'>{contact[0]?.facebook}</Typography>
          </Grid>


          {/* contributions section */}
          <Grid item xs={8} sx={{ pl: 1, backgroundColor: 'white' }}>
            {/* container so there is margin between general info and contributions while maximizing screen space */}
            <Grid container space={1} sx={{ ...mainContentBox, m: 0, mt: 1, minHeight: generalInfoHeight + 'px' }}>
              <Grid item xs={12} sx={{ p: 1 }}>
                {contactStories[0] && contactStories.map((story) => {
                  return <StoryListItem key={story?.id} story={story} createMode={createMode} setCreateMode={setCreateMode} setModalOpen={setModalOpen} />
                })}
              </Grid>
            </Grid>
          </Grid>


        </Grid>
      </Grid>

      <Modal
        open={modalOpen}
        onClose={handleClose}>
        <Box sx={largeModal}>
          <StoryCreateEditModal setModalOpen={setModalOpen} createMode={createMode} setCreateMode={setCreateMode} />
        </Box>
      </Modal>

    </Box >
  )
}