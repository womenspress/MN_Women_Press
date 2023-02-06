import React, { useState, useEffect } from 'react'

// libraries
import { useDispatch, useSelector } from 'react-redux'

// components
import { Box, Typography, Grid, Button, TextField, Menu, Autocomplete } from '@mui/material';
import ContactDropdownItem from '../../assets/ContactDropdownItem/ContactDropdownItem';
import TagDropdownItem from '../../assets/TagDropdownItem/TagDropdownItem';
import ThemeDropdownItem from '../../assets/ThemeDropdownItem/ThemeDropdownItem';
import ContactSearchCard from '../../assets/ContactSearchCard/ContactSearchCard';
import TagSearchCard from '../../assets/TagSearchCard/TagSearchCard';
import ThemeSearchCard from '../../assets/ThemeSearchCard/ThemeSearchCard';

//internal
// import { tags } from '../../sampleData'

export default function StoryModalGeneral(props) {


  //! todo: make dropdown tag and contact search functionality

  const {
    setModalOpen,
    setStep,
    createMode
  } = props

  const dispatch = useDispatch()

  const currentStory = useSelector(store => store.stories.tempStory)
  const contacts = useSelector(store => store.contacts.allContacts)
  const tags = useSelector(store => store.tags.allTags)
  const themes = useSelector(store => store.themes.allThemes)


  const [inputValues, setInputValues] = useState(currentStory);

  // useEffect(() => {
  //   setInputValues(currentStory)
  // }, [currentStory])

  //* -------- CONTACT search variables and functions ---------

  const [contactSearchTerm, setContactSearchTerm] = useState('');
  const [contactAnchor, setContactAnchor] = useState(null);
  const contactOpen = Boolean(contactAnchor);

  const handleSearchContacts = (event) => {
    setContactAnchor(event.currentTarget)
  }

  const handleContactsClose = () => {
    setContactAnchor(null)
  }

  const contactIds = inputValues.contacts?.map(contact => contact.id);

  // these will populate upon search
  const contactSearchResults =
    contacts?.filter(contact => !(contactIds.includes(contact.id)))
      .filter(contact => contact.name.toLowerCase().includes(contactSearchTerm.toLowerCase()));


  //* -------- TAG search variables and functions ---------

  const [tagSearchTerm, setTagSearchTerm] = useState('');
  const [tagAnchor, setTagAnchor] = useState(null);
  const tagOpen = Boolean(tagAnchor);

  const handleSearchTags = (event) => {
    setTagAnchor(event.currentTarget)
  }

  const handleTagsClose = () => {
    setTagAnchor(null)
  }

  const tagIds = inputValues.tags?.map(tag => tag.id);

  const tagSearchResults =
    tags?.filter(tag => !(tagIds.includes(tag.id)))
      .filter(tag => tag.name.toLowerCase().includes(tagSearchTerm.toLowerCase()))

  //* -------- THEME search variables and functions ---------

  const [themeSearchTerm, setThemeSearchTerm] = useState('');
  const [themeAnchor, setThemeAnchor] = useState(null);
  const themeOpen = Boolean(themeAnchor);

  const handleSearchThemes = (event) => {
    setThemeAnchor(event.currentTarget)
  }

  const handleThemesClose = () => {
    setThemeAnchor(null)
  }

  const themeIds = inputValues.themes?.map(theme => theme.id);

  // these will populate upon search
  const themeSearchResults =
    themes?.filter(theme => !(themeIds.includes(theme.id)))
      .filter(theme => theme.name.toLowerCase().includes(themeSearchTerm.toLowerCase()));

  // if contact search term exists, open the menu
  // const handleContactSearch = (e) => {
  //   console.log(e)
  //   setContactSearchTerm(e.target.value);
  //   if (contactSearchTerm) setContactAnchor(e.target)
  // }



  // need ids of contacts on the story. results to populate into map are contacts who are not in the ids list

  // const contactResults = contacts.filter(contact => { !contactIds.includes(contact.id) })


  // on submit: close modal. create mode true => POST data, clear temp story. create mode false => PUT data.
  const handleSubmit = () => {
    console.log('saved and submitted');
      dispatch({ type: 'CLEAR_TEMP_STORY' })
    if (createMode) dispatch({ type: 'CREATE_NEW_STORY', payload: { ...currentStory, ...inputValues } });
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
      {/* input values: {JSON.stringify(inputValues)}
      contactId: {JSON.stringify(contactIds)}
      
      tags: {JSON.stringify(tags)} */}
      {/* contactResults: {JSON.stringify(contactSearchResults)} */}
      {/* tags: {JSON.stringify(inputValues.tags?.map(tag => tag.name))}
      contacts: {JSON.stringify(inputValues.contacts?.map(contact => contact.name))} */}
      {/* contact ids: {JSON.stringify(inputValues.contacts?.map(contact => contact.id))} */}
      {/* contact payment: {JSON.stringify(inputValues.contacts.map(contact=> {return {payment_required: contact.payment_required, "name": contact.name}}))} */}
      <Typography variant='h4'>{createMode? 'New Story - general': 'Edit Story - general'}</Typography>
      <Grid container spacing={1}>

        {/* title */}
        <Grid item xs={3}>
          <Typography sx={{ textAlign: 'right', marginRight: 3 }}>
            title *
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            size='small'
            value={inputValues.title}
            onChange={(e) => setInputValues({ ...inputValues, title: e.target.value })}
          />
        </Grid>


        {/* notes */}
        <Grid item xs={3}>
          <Typography sx={{ textAlign: 'right', marginRight: 3 }}>
            notes
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            size='small'
            value={inputValues.notes}
            onChange={(e) => setInputValues({ ...inputValues, notes: e.target.value })}
          />
        </Grid>


        {/* contact(s) */}
        <Grid item xs={3}>
          <Typography sx={{ textAlign: 'right', marginRight: 3 }}>contacts</Typography>
        </Grid>
        <Grid item xs={9}>
          {/* <Autocomplete
          disablePortal
          options = {['hello world']}
          /> */}


          <TextField
            size='small'
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
            {contactSearchResults?.map(contact => {
              return (
                <ContactDropdownItem
                  key={contact.id}
                  handleClose={handleContactsClose}
                  contact={contact}
                  setInputValues={setInputValues}
                  inputValues={inputValues} />
              )
            })}
          </Menu>
          <Box sx={{ bgcolor: 'grey.100', padding: .5, display: 'flex', flexWrap: 'wrap' }}>
            {inputValues.contacts?.sort((a, b) => a.id - b.id).map(contact => {
              return (
                <ContactSearchCard key={contact.id} contact={contact} inputValues={inputValues} setInputValues={setInputValues} />
              )
            })}
          </Box>

        </Grid>

        {/* tags */}
        <Grid item xs={3}>
          <Typography sx={{ textAlign: 'right', marginRight: 3 }}>tags</Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            size='small'
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
            {tagSearchResults?.map(tag => {
              return (
                <TagDropdownItem
                  key={tag.id}
                  handleClose={handleTagsClose}
                  tag={tag}
                  setInputValues={setInputValues}
                  inputValues={inputValues}
                />
              )
            })}
          </Menu>
          <Box sx={{ bgcolor: 'grey.100', padding: .5 }}>
            {inputValues.tags?.map(tag => {
              return (
                <TagSearchCard key={tag.id} tag={tag} />
              )
            })}
          </Box>
        </Grid>

        {/* theme */}
        <Grid item xs={3}>
          <Typography sx={{ textAlign: 'right', marginRight: 3 }}>
            theme
          </Typography>
        </Grid>
        <Grid item xs={9}>

          <TextField
            size='small'
            value={themeSearchTerm}
            onChange={(e) => setThemeSearchTerm(e.target.value)}
          />
          <Button
            onClick={handleSearchThemes}
          >search</Button>
          <Menu
            anchorEl={themeAnchor}
            open={themeOpen}
            onClose={handleThemesClose}
          >
            {themeSearchResults?.map(theme => {
              return (
                <ThemeDropdownItem
                  key={theme.id}
                  handleClose={handleThemesClose}
                  theme={theme}
                  setInputValues={setInputValues}
                  inputValues={inputValues}
                />
              )
            })}
          </Menu>
          <Box sx={{ bgcolor: 'grey.100', padding: .5 }}>
            {inputValues.themes?.map(theme => {
              return (
                <ThemeSearchCard key={theme.id} theme={theme} />
              )
            })}
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
