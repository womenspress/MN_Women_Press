import React, { useState, useEffect } from 'react'

// libraries
import { useDispatch, useSelector } from 'react-redux'

// components
import { Box, Typography, Grid, Button, TextField, Menu } from '@mui/material';
import ContactDropdownItem from '../../assets/ContactDropdownItem/ContactDropdownItem';
import TagDropdownItem from '../../assets/TagDropdownItem/TagDropdownItem';

//internal
import { contacts, tags } from '../../sampleData'

export default function StoryModalGeneral(props) {


  //! todo: make dropdown tag and contact search functionality

  const {
    setModalOpen,
    setStep,
    createMode
  } = props

  const dispatch = useDispatch()

  const currentStory = useSelector(store => store.stories.tempStory)
  //! const contacts = useSelector(store => store.contacts.allContacts)
  // const tags = useSelector(store => store.tags.allTags)


  const [inputValues, setInputValues] = useState(currentStory);
  const [contactSearchTerm, setContactSearchTerm] = useState('');
  const [tagSearchTerm, setTagSearchTerm] = useState('');

  // useEffect(() => {
  //   setInputValues(currentStory)
  // }, [currentStory])

  const [contactAnchor, setContactAnchor] = useState(null);
  const contactOpen = Boolean(contactAnchor);

  const handleSearchContacts = (event) => {
    setContactAnchor(event.currentTarget)
  }

  const handleContactsClose = () => {
    setContactAnchor(null)
  }

  const [tagAnchor, setTagAnchor] = useState(null);
  const tagOpen = Boolean(tagAnchor);

  const handleSearchTags = (event) => {
    setTagAnchor(event.currentTarget)
  }

  const handleTagsClose = () => {
    setTagAnchor(null)
  }
  // if contact search term exists, open the menu
  // const handleContactSearch = (e) => {
  //   console.log(e)
  //   setContactSearchTerm(e.target.value);
  //   if (contactSearchTerm) setContactAnchor(e.target)
  // }


  // need ids of contacts on the story. results to populate into map are contacts who are not in the ids list
  const contactIds = inputValues.contacts ? inputValues.contacts.map(contact => contact.id) : [];
  const contactResults = contacts.filter(contact => { !contactIds.includes(contact.id) })


  // on submit: close modal. create mode true => POST data, clear temp story. create mode false => PUT data.
  const handleSubmit = () => {
    console.log('saved and submitted');
    if (createMode) {
      dispatch({ type: 'CLEAR_TEMP_STORY' })
      dispatch({ type: 'CREATE_NEW_STORY', payload: { ...currentStory, ...inputValues } });
    }
    else dispatch({ type: 'EDIT_STORY', payload: { ...currentStory, ...inputValues } })
    setModalOpen(false);
  }

  // navigation: update temp story with input values, move to next step
  const navigateAdditional = () => {
    console.log('navigating to next page');
    dispatch({ type: 'SET_TEMP_STORY', payload: { ...currentStory, ...inputValues } });
    setStep('additional');
  }



  return (
    <Box>
      input values: {JSON.stringify(inputValues)}
      contactId: {JSON.stringify(contactIds)}
      contactResults: {JSON.stringify(contactResults)}
      tags: {JSON.stringify(tags)}
      <Typography variant='h4'>New Story - general</Typography>
      <Grid container spacing={1}>

        {/* title */}
        <Grid item xs={3}>
          <Typography sx={{ textAlign: 'right', marginRight: 3 }}>
            title *
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            value={inputValues.title}
            onChange={(e) => setInputValues({ ...inputValues, title: e.target.value })}
          />
        </Grid>

        {/* contact(s) */}
        <Grid item xs={3}>
          <Typography sx={{ textAlign: 'right', marginRight: 3 }}>
            contacts
          </Typography>
        </Grid>
        <Grid item xs={9}>

          <TextField
            value={contactSearchTerm}
            onChange={(e) => setContactSearchTerm(e.target.value)}
          />
          <Button
            onClick={handleSearchContacts}
          >search</Button>
          <Menu
            anchorEl={contactAnchor}
            open={contactOpen}
            onClose={handleContactsClose}
          >
            {contacts.map(contact => {
              return (
                <ContactDropdownItem key={contact.id} handleClose={handleContactsClose} contact={contact} setInputValues={setInputValues} inputValues={inputValues} />
              )
            })}
          </Menu>
          <Box sx={{ bgcolor: 'grey.100' }}>
            contacts go here
            {/* {inputValues.contacts.map(contact=>{
              return (
                <ContactElement/>
              )
            })} */}
          </Box>

        </Grid>

        {/* notes */}
        <Grid item xs={3}>
          <Typography sx={{ textAlign: 'right', marginRight: 3 }}>
            notes
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            value={inputValues.notes}
            onChange={(e) => setInputValues({ ...inputValues, notes: e.target.value })}
          />
        </Grid>

        {/* tags */}
        <Grid item xs={3}>
          <Typography sx={{ textAlign: 'right', marginRight: 3 }}>tags</Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            value={tagSearchTerm}
            onChange={(e) => setTagSearchTerm(e.target.value)}
          />
          <Button
            onClick={handleSearchTags}
          >search</Button>
          <Menu
            anchorEl={tagAnchor}
            open={tagOpen}
            onClose={handleTagsClose}
          >
            {tags.map(tag => {
              return (
                <TagDropdownItem key={tag.id} handleClose={handleTagsClose} tag={tag} setInputValues={setInputValues} inputValues={inputValues} />
              )
            })}
          </Menu>
          <Box sx={{ bgcolor: 'grey.100' }}>
            tags go here
            {/* {inputValues.tags.map(tag=>{
              return (
                <TagElement/>
              )
            })} */}
          </Box>
        </Grid>

      </Grid>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button
          onClick={handleSubmit}
        >save and submit</Button>
        <Button
          onClick={navigateAdditional}
        >additional info</Button>
      </Box>
    </Box>
  )
}
