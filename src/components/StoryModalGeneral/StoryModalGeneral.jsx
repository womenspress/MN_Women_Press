import React, { useState } from 'react'

// libraries

import { useDispatch, useSelector } from 'react-redux'

// components
import { Box, Typography, Grid, Button, TextField } from '@mui/material'

export default function StoryModalGeneral(props) {

  //! todo: make dropdown tag and contact search functionality

  const { setOpen, setStep } = props

  const dispatch = useDispatch()

  const currentStory = useSelector(store => store.stories.tempStory)
  const contacts = useSelector(store => store.contacts.allContacts)
  const tags = useSelector(store => store.tags.allTags)


  const [inputValues, setInputValues] = useState(currentStory);
  const [contactSearchTerm, setContactSearchTerm] = useState('');
  const [tagSearchTerm, setTagSearchTerm] = useState('');

  // on submit, navigate to additional
  const handleSubmit = () => {
    console.log('saved and submitted');
    dispatch({ type: 'SET_TEMP_STORY', payload: { ...currentStory, ...inputValues } })
    setOpen(false);
  }

  const navigateAdditional = () => {
    console.log('navigating to next page');
    dispatch({ type: 'SET_TEMP_STORY', payload: { ...currentStory, ...inputValues } })
    setStep('additional');
  }



  return (
    <Box>
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
