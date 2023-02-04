import React, { useState } from 'react'

// libraries
import { useDispatch, useSelector } from 'react-redux'
import {AdapterLuxon} from '@mui/x-date-pickers/AdapterLuxon'
import {DateTime} from 'luxon'

// components
import { Box, Typography, Grid, Button, TextField } from '@mui/material'
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers'



export default function StoryModalAdditional(props) {

  //! todo: make dropdown tag and contact search functionality

  const {
    setModalOpen,
    setStep,
    createMode
  } = props

  const dispatch = useDispatch()

  const currentStory = useSelector(store => store.stories.tempStory)
  const themes = useSelector(store => store.themes.allThemes)


  const [inputValues, setInputValues] = useState(currentStory);
  const [themeSearchTerm, setThemeSearchTerm] = useState('');

  const handleRoughDraft = (value) =>{
    setInputValues({...inputValues, rough_draft_deadline: value})
  }

  const handleFinalDraft = (value) =>{
    setInputValues({...inputValues, final_draft_deadline: value})
  }

  const handlePublicationDate = (value) =>{
    setInputValues({...inputValues, publication_date: value})
  }




  // on submit: close modal. create mode true => POST data. create mode false => PUT data.
  const handleSubmit = () => {
    console.log('saved and submitted');
    if (createMode) {
      dispatch({type: 'CLEAR_TEMP_STORY'})
      dispatch({ type: 'CREATE_NEW_STORY', payload: { ...currentStory, ...inputValues } });}
    else dispatch({ type: 'EDIT_STORY', payload: { ...currentStory, ...inputValues } });
    setModalOpen(false);
  }

  // navigation: move to appropriate step, update temp story with the input values
  const navigateGeneral = () => {
    console.log('navigating to general');
    dispatch({ type: 'SET_TEMP_STORY', payload: { ...currentStory, ...inputValues } })
    setStep('general');
  }

  const navigateNeeds = () => {
    console.log('navigating to needs');
    dispatch({ type: 'SET_TEMP_STORY', payload: { ...currentStory, ...inputValues } })
    setStep('needs')
  }



  return (
    <Box>
      {JSON.stringify(inputValues)}
      <Typography variant='h4'>{createMode ? 'New Story - additional' : 'Edit story - additional'}</Typography>
      <Grid container spacing={1}>

        {/* subtitle */}
        <Grid item xs={3}>
          <Typography sx={{ textAlign: 'right', marginRight: 3 }}>
            subtitle
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            value={inputValues.subtitle}
            onChange={(e) => setInputValues({ ...inputValues, subtitle: e.target.value })}
          />
        </Grid>

        {/* theme */}
        <Grid item xs={3}>
          <Typography sx={{ textAlign: 'right', marginRight: 3 }}>
            theme
          </Typography>
        </Grid>
        <Grid item xs={9}>

          <TextField
            value={themeSearchTerm}
            onChange={(e) => setThemeSearchTerm(e.target.value)}
          />
          <Box sx={{ bgcolor: 'grey.100' }}>
            themes go here
            {/* {inputValues.contacts.map(contact=>{
              return (
                <ContactElement/>
              )
            })} */}
          </Box>

        </Grid>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          {/* due dates */}
          <Grid item xs={3}>
            <Typography sx={{ textAlign: 'right', marginRight: 3 }}>
              due dates
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <DesktopDatePicker
              label = "rough draft"
              // inputFormat = "MM/DD/YYYY"
              value = {DateTime.fromISO(inputValues.rough_draft_deadline)}
              onChange={handleRoughDraft}
              renderInput = {(params)=><TextField {...params}/>}
            />
            <DesktopDatePicker
              label = "final draft"
              // inputFormat = "MM/DD/YYYY"
              value = {DateTime.fromISO(inputValues.final_draft_deadline)}
              onChange={handleFinalDraft}
              renderInput = {(params)=><TextField {...params}/>}
            />
          </Grid>

          {/* publication date */}
          <Grid item xs={3}>
            <Typography sx={{ textAlign: 'right', marginRight: 3 }}>publication date</Typography>
          </Grid>
          <Grid item xs={9}>
          <DesktopDatePicker
              // inputFormat = "MM/DD/YYYY"
              value = {DateTime.fromISO(inputValues.publication_date)}
              onChange={handlePublicationDate}
              renderInput = {(params)=><TextField {...params}/>}
            />
          </Grid>
        </LocalizationProvider>
        {/* external link */}
        <Grid item xs={3}>
          <Typography sx={{ textAlign: 'right', marginRight: 3 }}>external link</Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
          value={inputValues.article_link}
          onChange={(e) => setInputValues({ ...inputValues, article_link: e.target.value })}
          />
        </Grid>

        {/* word count */}
        <Grid item xs={3}>
          <Typography sx={{ textAlign: 'right', marginRight: 3 }}>word count</Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            type = 'number'
            value={inputValues.word_count}
            onChange={(e) => setInputValues({ ...inputValues, word_count: e.target.value })} />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button
          onClick={navigateGeneral}
        >
          general info
        </Button>
        <Button
          onClick={handleSubmit}
        >save and submit</Button>
        <Button
          onClick={navigateNeeds}
        >story needs</Button>
      </Box>
    </Box>

  )
}
