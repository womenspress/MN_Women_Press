import React, { useEffect, useState, } from 'react';

// libraries
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';

// components
import { Box, Grid, Modal, Typography } from '@mui/material';
import StoryListItem from '../../components/StoryListItem/StoryListItem';
import ContactAvatar from '../../assets/ContactAvatar/ContactAvatar'
import EditContactModal from '../../components/EditContactModal/EditContactModal';
import StoryCreateEditModal from '../../components/StoryCreateEditModal/StoryCreateEditModal';
import SortFilterSearch from '../../assets/SortFilterSearch/SortFilterSearch'
import ListTags from '../../components/ListTags/ListTags';

import { largeModal, mainContentBox } from '../../__style'




export default function ContactDetailsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    setGeneralInfoHeight(document.getElementById("generalInfoSection").offsetHeight - 1)
  }, [document.getElementById("generalInfoSection")])

  useEffect(() => {
    dispatch({ type: 'GET_ALL_CONTACTS' });
    dispatch({ type: 'GET_ALL_STORIES' })
  }, [])

  const { id } = useParams();
  const allContacts = useSelector(store => store.contacts.allContacts);
  const allStories = useSelector(store => store.stories.allStories);

  const [modalOpen, setModalOpen] = useState(false);
  const [createMode, setCreateMode] = useState(true);
  const [contact, setContact] = useState({ name: '', });
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

  // remove tag from contact
  const removeTag = (tagID) => {
    const story_id = id;
    dispatch({ type: 'DELETE_CONTACT_TAG', payload: { tag_id: tagID, contact_id: id } })
  }

  //* ============================= SORT/FILTER/SEARCH STUFF ===============================

  const sortOptions = ['date added', 'date published', 'title',]
  const [sortMethod, setSortMethod] = useState('date added');
  const [sortDirection, setSortDirection] = useState('ascending')

  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('all');
  const searchByOptions = ['all', 'story info', 'theme', 'tag', 'contact']

  const ascDesc = (arr) => sortDirection === 'ascending' ? arr : arr.reverse()

  // const sortOptions = ['date added', 'date published', 'title',]
  const sortResults = (arr) => {
    switch (sortMethod) {
      case 'date published':
        return arr.sort((a, b) => {
          if (!a.publication_date) return 1
          if (!b.publication_date) return -1
          if (DateTime.fromISO(a.publication_date) > DateTime.fromISO(b.publication_date)) return 1
          if (DateTime.fromISO(a.publication_date) < DateTime.fromISO(b.publication_date)) return -1
          else return 0
        })
      case 'title':
        return arr.sort((a, b) => {
          if (a.title.toLowerCase() > b.title.toLowerCase()) return 1
          if (a.title.toLowerCase() < b.title.toLowerCase()) return -1
          else {
            return 0
          }
        })
      case 'date added':
        return arr.sort((a, b) => {
          if (DateTime.fromISO(a.date_added) > DateTime.fromISO(b.date_added)) return 1
          if (DateTime.fromISO(a.date_added) < DateTime.fromISO(b.date_added)) return -1
          else return 0
        })
      default:
        return arr
    }
  }

  // 'all', 'story info', 'theme', 'tag', 'contact'
  const searchResults = (arr) => {

    function getContactsString(story) {
      return story.contacts.map(contact => contact?.name.toLowerCase()).join('')
    }

    // story title and notes
    function getTagsString(story) {
      const tagsNameString = story.tags?.map(tag => tag?.name?.toLowerCase()).join('');
      const tagsDescString = story.tags?.map(tag => tag?.description?.toLowerCase()).join('')
      return tagsNameString + tagsDescString
    }

    function getThemesString(story) {
      const themesNameString = story.theme?.map(theme => theme?.title?.toLowerCase()).join('');
      const themesDescString = story.theme?.map(theme => theme?.description?.toLowerCase()).join('');
      return themesNameString + themesDescString
    }

    switch (searchBy) {
      case 'story info':
        return arr.filter(story => story.title?.toLowerCase().includes(searchTerm.toLowerCase()) || story.notes?.toLowerCase().includes(searchTerm.toLowerCase()))
      case 'theme':
        return arr.filter(story => getThemesString(story).includes(searchTerm.toLowerCase()))
      case 'tag':
        return arr.filter(story => getTagsString(story).includes(searchTerm.toLowerCase()))
      case 'contact':
        return arr.filter(story => getContactsString(story).includes(searchTerm.toLowerCase()))
      case 'all':
        return arr.filter(story => getTagsString(story).includes(searchTerm.toLowerCase()) || story.theme[0]?.name.toLowerCase().includes(searchTerm.toLowerCase()) || story.theme[0]?.description.toLowerCase().includes(searchTerm.toLowerCase()) || story.title.toLowerCase().includes(searchTerm.toLowerCase()) || story.notes.toLowerCase().includes(searchTerm.toLowerCase()) || getContactsString(story).includes(searchTerm.toLowerCase()))
    }
  }

  const storyResults = ascDesc(sortResults(searchResults(contactStories)))

  return (
    <Box>

      <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
        {/* <pre>{JSON.stringify(contactStories, null, 2)}</pre> */}
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

        <Box ml={2}>
          <ListTags numOfDisplay={contact[0]?.tags.length} tags={contact[0]?.tags} removeTag={removeTag} />
        </Box>
      </Box>

      <Grid container spacing={1}>
        {/* start of row that holds general info and contribution headers, as well as sort by an search field */}
        <Grid item xs={4} display='flex'>
          <Typography variant='h5' fontWeight='bold' sx={{ mr: 1 }}>General Info </Typography>
          {contact[0] ? <EditContactModal contact={contact[0]} /> : null}
        </Grid>
        <Grid item xs={2}>
          <Typography variant='h5' fontWeight='bold' sx={{ ml: 2 }}>Contributions</Typography>
        </Grid>

        {/* search item, need to finish functionality */}
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <SortFilterSearch
              sortOptions={sortOptions}
              sortMethod={sortMethod}
              setSortMethod={setSortMethod}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              searchByOptions={searchByOptions}
              searchBy={searchBy}
              setSearchBy={setSearchBy}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </Box>

        </Grid>
      </Grid>
      {/* this row contains the two large sections of information, general info and contributions */}
      <Grid container space={1}>


        {/* general info section */}
        <Grid item xs={4} id='generalInfoSection' sx={{ ...mainContentBox, m: 0, mt: 1 }}>
          <Typography variant='h6' sx={{ mt: 1 }}>Bio</Typography>
          <Typography variant='body1'>{contact[0]?.bio}</Typography>
          <Typography variant='h6' sx={{ mt: 1 }}>Role(s)</Typography>
          {contact[0]?.roles?.map((role, i) => {
            return <Typography key={role?.id} variant='body1'>{role?.name}</Typography>
          })}
          <Typography variant='h6' sx={{ mt: 1 }}>Mailing Address</Typography>
          <Typography variant='body1'>{contact[0]?.mailing_address}</Typography>
          <Typography variant='h6' sx={{ mt: 1 }}>Billing Address</Typography>
          <Typography variant='body1'>{contact[0]?.billing_address}</Typography>
          <Typography variant='h6' sx={{ mt: 1 }}>Email</Typography>
          <Typography variant='body1'>{contact[0]?.email}</Typography>
          <Typography variant='h6' sx={{ mt: 1 }}>Phone</Typography>
          <Typography variant='body1'>{contact[0]?.phone}</Typography>
          <Typography variant='h6' sx={{ mt: 1 }}>LinkedIn</Typography>
          <Typography variant='body1'>{contact[0]?.linkedin}</Typography>
          <Typography variant='h6' sx={{ mt: 1 }}>Twitter</Typography>
          <Typography variant='body1'>{contact[0]?.twitter}</Typography>
          <Typography variant='h6' sx={{ mt: 1 }}>Instagram</Typography>
          <Typography variant='body1'>{contact[0]?.instagram}</Typography>
          <Typography variant='h6' sx={{ mt: 1 }}>Facebook</Typography>
          <Typography variant='body1'>{contact[0]?.facebook}</Typography>
        </Grid>

        {/* contributions section */}
        <Grid item xs={8} sx={{ pl: 1, backgroundColor: 'white' }}>
          {/* container so there is margin between general info and contributions while maximizing screen space */}
          <Grid container space={1} sx={{ ...mainContentBox, m: 0, mt: 1, minHeight: generalInfoHeight + 'px' }}>
            <Grid item xs={12} sx={{ p: 1 }}>
              {storyResults[0] && storyResults.map((story) => {
                return <StoryListItem key={story?.id} story={story} createMode={createMode} setCreateMode={setCreateMode} setModalOpen={setModalOpen} />
              })}
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