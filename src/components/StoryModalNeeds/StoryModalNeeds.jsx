import React, { useState } from 'react'

// libraries

import { useDispatch, useSelector } from 'react-redux'

// components
import { Box, Typography, Grid, Button, TextField } from '@mui/material'

export default function StoryModalNeeds(props) {

  //! todo: make dropdown tag and contact search functionality

  const { 
    setOpen, 
    setStep,
    createMode 
  } = props

  const dispatch = useDispatch()

  const currentStory = useSelector(store => store.stories.tempStory)

  const [inputValues, setInputValues] = useState(currentStory);
  const [contactSearchTerm, setContactSearchTerm] = useState('');
  const [tagSearchTerm, setTagSearchTerm] = useState('');

    // on submit: close modal. create mode true => POST data. create mode false => PUT data.
    const handleSubmit = () => {
      console.log('saved and submitted');
      if (createMode) dispatch({ type: 'CREATE_NEW_STORY', payload: { ...currentStory, ...inputValues } });
      else dispatch({type: 'EDIT_STORY', payload: {...currentStory, ...inputValues}});
      setOpen(false);
    }
  

  const navigateAdditional = () => {
    console.log('navigating to next page');
    dispatch({ type: 'SET_TEMP_STORY', payload: { ...currentStory, ...inputValues } })
    setStep('additional');
  }



  return (
    <Box>
      <Typography variant='h4'>New Story - story needs</Typography>
      <Grid container spacing={1}>

        {/* payment */}
        <Grid item xs={3}>
          <Typography sx={{ textAlign: 'right', marginRight: 3 }}>
            payment
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Box sx ={{bgcolor: 'grey.100'}}>contacts with checkboxes here</Box>
          {/* 
          {currentStory.contacts.map(contact=>{
            return(
              <ContactComponent contact={contact}/>
            )
          })}
          */}
          <TextField
            value={inputValues.title}
            onChange={(e) => setInputValues({ ...inputValues, title: e.target.value })}
          />
        </Grid>

        {/* graphic */}
        <Grid item xs={3}>
          <Typography sx={{ textAlign: 'right', marginRight: 3 }}>
            graphic
          </Typography>
        </Grid>
        <Grid item xs={9}>

          <TextField
            value={contactSearchTerm}
            onChange={(e) => setContactSearchTerm(e.target.value)}
          />
          <Box sx={{ bgcolor: 'grey.100' }}>
            contacts go here
            {/* {inputValues.contacts.map(contact=>{
              return (
                <ContactElement/>
              )
            })} */}
          </Box>

        </Grid>

        {/* photo */}
        <Grid item xs={3}>
          <Typography sx={{ textAlign: 'right', marginRight: 3 }}>
            photo
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            value={inputValues.notes}
            onChange={(e) => setInputValues({ ...inputValues, notes: e.target.value })}
          />
        </Grid>

        {/* copies sent */}
        <Grid item xs={3}>
          <Typography sx={{ textAlign: 'right', marginRight: 3 }}>copies sent</Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            value={tagSearchTerm}
            onChange={(e) => setTagSearchTerm(e.target.value)}
          />
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
          onClick={navigateAdditional}
        >additional info</Button>
      </Box>
      <Button
        onClick={handleSubmit}
      >save and submit</Button>

    </Box>
  )
}
