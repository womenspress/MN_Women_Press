import React, { useState } from 'react'

// libraries
import { useDispatch, useSelector } from 'react-redux'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { DateTime } from 'luxon'

// components
import { Box, Typography, Grid, Button, TextField, FormGroup, Checkbox, FormControlLabel } from '@mui/material'
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers'



export default function StoryModalAdditional(props) {


  const {
    setModalOpen,
    setStep,
    createMode
  } = props

  const dispatch = useDispatch()

  const currentStory = useSelector(store => store.stories.tempStory)
  const themes = useSelector(store => store.themes.allThemes)

  const [inputValues, setInputValues] = useState(currentStory);

  const [photographerSearchTerm, setPhotographerSearchTerm] = useState('')

  const handleRoughDraft = (value) => {
    setInputValues({ ...inputValues, rough_draft_deadline: value })
  }

  const handleFinalDraft = (value) => {
    setInputValues({ ...inputValues, final_draft_deadline: value })
  }

  const handlePublicationDate = (value) => {
    setInputValues({ ...inputValues, publication_date: value })
  }

  const handleGraphic = (e) => {
    console.log('in handleGraphic');
    if (e.target.checked) setInputValues({ ...inputValues, graphic_image_required: true });
    else setInputValues({ ...inputValues, graphic_image_required: false })
  }

  const handlePhoto = (e) => {
    console.log('in handlePhoto');
    if (e.target.checked) setInputValues({ ...inputValues, photo_required: true });
    else setInputValues({ ...inputValues, photo_required: false })
  }

  const handleFactCheck = (e) => {
    console.log('in handle fact check')
    if (e.target.checked) setInputValues({ ...inputValues, fact_check_required: true });
    else setInputValues({ ...inputValues, fact_check_required: false })
  }

  const handleCopies = (e) => {
    console.log('in handleCopies');
    if (e.target.checked) setInputValues({ ...inputValues, copies_required: true })
    else setInputValues({ ...inputValues, copies_required: false, number_of_copies: 0 })
  }

  const handleCopyNumber = (e) => {
    console.log('handling copy number');
    const numCopies = Number(e.target.value);
    setInputValues({ ...inputValues, number_of_copies: numCopies })
  }

  const handleCopyDestination = (e) => {
    console.log('handling copy destination');
    setInputValues({ ...inputValues, copies_destination: e.target.value })
    console.log('inputValues', inputValues)
  }



  // on submit: close modal. create mode true => POST data. create mode false => PUT data.
  const handleSubmit = () => {
    console.log('saved and submitted');
    dispatch({ type: 'CLEAR_TEMP_STORY' })
    if (createMode) dispatch({ type: 'CREATE_NEW_STORY', payload: { ...currentStory, ...inputValues } });
    else dispatch({ type: 'EDIT_STORY', payload: { ...currentStory, ...inputValues } });
    setModalOpen(false);
  }

  // navigation: move to appropriate step, update temp story with the input values
  const navigateGeneral = () => {
    console.log('navigating to general');
    dispatch({ type: 'SET_TEMP_STORY', payload: { ...currentStory, ...inputValues } })
    setStep('general');
  }

  // const navigateNeeds = () => {
  //   console.log('navigating to needs');
  //   dispatch({ type: 'SET_TEMP_STORY', payload: { ...currentStory, ...inputValues } })
  //   setStep('needs')
  // }



  return (
    <Box>
      {/* {JSON.stringify(inputValues)} */}
      <Typography variant='h4'>{createMode ? 'New Story - additional' : 'Edit story - additional'}</Typography>
      <Grid container spacing={1}>

        {/* subtitle */}
        <Grid item xs={2}>
          <Typography sx={{ textAlign: 'right', marginRight: 3 }}>
            subtitle
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            fullWidth
            size='small'
            value={inputValues.subtitle}
            onChange={(e) => setInputValues({ ...inputValues, subtitle: e.target.value })}
          />
        </Grid>

        <LocalizationProvider dateAdapter={AdapterLuxon}>
          {/* due dates */}
          <Grid item xs={2}>
            <Typography sx={{ textAlign: 'right', marginRight: 3 }}>
              dates
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <DesktopDatePicker
              size='small'
              label="rough draft due"
              // inputFormat = "MM/DD/YYYY"
              value={DateTime.fromISO(inputValues.rough_draft_deadline)}
              onChange={handleRoughDraft}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={3}>
            <DesktopDatePicker
              size='small'
              label="final draft due"
              // inputFormat = "MM/DD/YYYY"
              value={DateTime.fromISO(inputValues.final_draft_deadline)}
              onChange={handleFinalDraft}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={4}>
            <DesktopDatePicker
              // inputFormat = "MM/DD/YYYY"
              label="publication"
              value={DateTime.fromISO(inputValues.publication_date)}
              onChange={handlePublicationDate}
              renderInput={(params) => <TextField {...params} />}
            />

          </Grid>
        </LocalizationProvider>
        {/* external link */}
        <Grid item xs={2}>
          <Typography sx={{ textAlign: 'right', marginRight: 3 }}>external link</Typography>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            size='small'
            value={inputValues.article_link}
            onChange={(e) => setInputValues({ ...inputValues, article_link: e.target.value })}
          />
        </Grid>

        {/* word count */}
        <Grid item xs={2}>
          <Typography sx={{ textAlign: 'right', marginRight: 3 }}>word count</Typography>
        </Grid>
        <Grid item xs={4}>
          <TextField
            size='small'
            type='number'
            value={inputValues.word_count}
            onChange={(e) => setInputValues({ ...inputValues, word_count: e.target.value })} />
        </Grid>

        {/* more options */}
        <Grid item xs={2}>
          <Typography>additional needs</Typography>
        </Grid>
        <Grid item xs={10}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormControlLabel control={<Checkbox checked={inputValues.graphic_image_required} onChange={handleGraphic} />} label='graphic' />
            <FormControlLabel control={<Checkbox checked={inputValues.fact_check_required} onChange={handleFactCheck} />} label='fact check' />
            <FormControlLabel control={<Checkbox checked={inputValues.photo_required} onChange={handlePhoto} />} label='photo' />

            <Box>
              <FormControlLabel control={<Checkbox checked={inputValues.copies_required} onChange={handleCopies} />} label='copies sent' />
              {inputValues.copies_required &&
                <>
                  <TextField
                    sx={{ display: 'inline-block', width: 60 }}
                    type='number'
                    size='small'
                    placeholder='#'
                    value={inputValues.number_of_copies}
                    onChange={handleCopyNumber}
                  />
                  <Typography sx={{ display: 'inline-block' }}>&nbsp; to &nbsp;</Typography>
                  <TextField
                    sx={{ display: 'inline-block', width: 500 }}
                    size='small'
                    placeholder='destination'
                    value={inputValues.copies_destination}
                    onChange={handleCopyDestination}
                  />
                </>
              }
            </Box>
          </Box>
        </Grid>

      </Grid >

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button
          onClick={navigateGeneral}
        >
          general info
        </Button>
        <Button
          onClick={handleSubmit}
        >save and submit</Button>
        {/* <Button
          onClick={navigateNeeds}
        >story needs</Button> */}
      </Box>
    </Box >

  )
}
