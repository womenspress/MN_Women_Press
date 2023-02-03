import React, { useState } from 'react'

// libraries

import { useDispatch, useSelector } from 'react-redux'

// components
import { Box, Typography, Grid, Button, TextField } from '@mui/material'


export default function StoryModalAdditional(props) {

  //! todo: make dropdown tag and contact search functionality

  const { setOpen, setStep } = props

  const dispatch = useDispatch()

  const currentStory = useSelector(store => store.stories.tempStory)
  const themes = useSelector(store => store.themes.allThemes)


  const [inputValues, setInputValues] = useState(currentStory);
  const [themeSearchTerm, setThemeSearchTerm] = useState('');

  // on submit, navigate to additional
  const handleSubmit = () => {
    console.log('saved and submitted');
    dispatch({ type: 'SET_TEMP_STORY', payload: { ...currentStory, ...inputValues } })
    setOpen(false);
  }

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
      <Typography variant='h4'>New Story - general</Typography>
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

        {/* themes */}
        <Grid item xs={3}>
          <Typography sx={{ textAlign: 'right', marginRight: 3 }}>
            themes
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

        {/* due dates */}
        <Grid item xs={3}>
          <Typography sx={{ textAlign: 'right', marginRight: 3 }}>
            due dates
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField />
          <TextField />
        </Grid>

        {/* publication date */}
        <Grid item xs={3}>
          <Typography sx={{ textAlign: 'right', marginRight: 3 }}>publication date</Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField />
        </Grid>

        {/* external link */}
        <Grid item xs={3}>
          <Typography sx={{ textAlign: 'right', marginRight: 3 }}>external link</Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField />
        </Grid>

        {/* word count */}
        <Grid item xs={3}>
          <Typography sx={{ textAlign: 'right', marginRight: 3 }}>word count</Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField />
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
