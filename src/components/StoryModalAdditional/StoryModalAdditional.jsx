import React, { useState } from 'react';

// libraries
import { useDispatch, useSelector } from 'react-redux';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTime } from 'luxon';

// components
import { Box, Typography, Grid, Button, TextField, Checkbox, FormControlLabel, ToggleButtonGroup, ToggleButton, Divider } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function StoryModalAdditional(props) {
  const { setModalOpen, setStep, createMode, setCreateMode } = props;

  const dispatch = useDispatch();

  const currentStory = useSelector((store) => store.stories.tempStory);

  const [inputValues, setInputValues] = useState(currentStory);

  const handleRoughDraft = (value) => {
    setInputValues({ ...inputValues, rough_draft_deadline: value });
  };

  const handleFinalDraft = (value) => {
    setInputValues({ ...inputValues, final_draft_deadline: value });
  };

  const handlePublicationDate = (value) => {
    setInputValues({ ...inputValues, publication_date: value })
  }

  const handleToggleChange = (e, value) => {
    console.log('in handle toggle change, e: ', e)
    setInputValues({ ...inputValues, photo_submitted: value })
  }

  const handlePhotoComments = (e) => {
    setInputValues({ ...inputValues, photo_comments: e.target.value })
  }

  const handleGraphic = (e) => {
    console.log('in handleGraphic');
    if (e.target.checked) setInputValues({ ...inputValues, graphic_image_required: true });
    else setInputValues({ ...inputValues, graphic_image_required: false })
  }

  const handleFactCheck = (e) => {
    console.log('in handle fact check');
    if (e.target.checked)
      setInputValues({ ...inputValues, fact_check_required: true });
    else setInputValues({ ...inputValues, fact_check_required: false });
  };

  const handleCopies = (e) => {
    console.log('in handleCopies');
    if (e.target.checked)
      setInputValues({ ...inputValues, copies_required: true });
    else
      setInputValues({
        ...inputValues,
        copies_required: false,
        number_of_copies: 0,
      });
  };

  const handleCopyNumber = (e) => {
    console.log('handling copy number');
    const numCopies = Number(e.target.value);
    setInputValues({ ...inputValues, number_of_copies: numCopies });
  };

  const handleCopyDestination = (e) => {
    console.log('handling copy destination');
    setInputValues({ ...inputValues, copies_destination: e.target.value })
    console.log('inputValues', inputValues)
  }

  const handleSocials = (e) => {
    if (e.target.checked) setInputValues({ ...inputValues, socials_required: true })
    else setInputValues({ ...inputValues, socials_required: false })
  }

  const handleUnderwriter = (e) => {
    if (e.target.checked) setInputValues({ ...inputValues, underwriter_required: true })
    else setInputValues({ ...inputValues, underwriter_required: false })
  }

  // on submit: close modal. create mode true => POST data. create mode false => PUT data.
  const handleSubmit = () => {
    console.log('saved and submitted');
    setStep('general')
    dispatch({ type: 'CLEAR_TEMP_STORY' });
    setStep('general');
    if (createMode)
      dispatch({
        type: 'CREATE_NEW_STORY',
        payload: { ...currentStory, ...inputValues },
      });
    else {
      dispatch({
        type: 'EDIT_STORY',
        payload: { ...currentStory, ...inputValues },
      });
      dispatch({ type: 'GET_ALL_THEMES' });
      dispatch({ type: 'GET_ALL_CONTACTS' });
      dispatch({ type: 'GET_ALL_STORIES' });
    }
    setModalOpen(false);
  };

  const handleClose = () => {
    setModalOpen(false);
    setCreateMode(true);
    setStep('general')
    dispatch({ type: 'CLEAR_TEMP_STORY' });
  };

  // navigation: move to appropriate step, update temp story with the input values
  const navigateGeneral = () => {
    console.log('navigating to general');
    dispatch({
      type: 'SET_TEMP_STORY',
      payload: { ...currentStory, ...inputValues },
    });
    setStep('general');
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', height: '100%', }}>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }} >
          <Box></Box>
          <Typography variant='h4'>{createMode ? 'New Story - additional' : 'Edit story - additional'}</Typography>
          <CloseIcon
            onClick={handleClose}
            sx={{
              '&:hover': {
                cursor: 'pointer',
                backgroundColor: 'lightgrey'
              }
            }}
          />
        </Box>
        <Grid container rowSpacing={3} columnSpacing={1} sx={{ paddingX: '5%' }}>

          {/* subtitle */}
          <Grid item xs={2} >
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
                disableMaskedInput={true}
                value={DateTime.fromISO(inputValues.rough_draft_deadline)}
                onChange={handleRoughDraft}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={3}>
              <DesktopDatePicker
                size='small'
                label="final draft due"
                disableMaskedInput={true}
                value={DateTime.fromISO(inputValues.final_draft_deadline)}
                onChange={handleFinalDraft}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={3}>
              <DesktopDatePicker
                label="publication"
                disableMaskedInput={true}
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
          <Grid item xs={3}>
            <TextField
              fullWidth
              size='small'
              value={inputValues.article_link}
              onChange={(e) => setInputValues({ ...inputValues, article_link: e.target.value })}
            />
          </Grid>

          {/* word count */}
          <Grid item xs={3}>
            <Typography sx={{ textAlign: 'right', marginRight: 3 }}>word count</Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField
              size='small'
              type='number'
              value={inputValues.word_count}
              onChange={(e) => setInputValues({ ...inputValues, word_count: e.target.value })} />
          </Grid>

          {/* photo */}
          <Grid item xs={2}>
            <Typography sx={{ textAlign: 'right', marginRight: 3 }}>photo</Typography>


          </Grid>
          <Grid item xs={3}>
            <ToggleButtonGroup
              value={inputValues.photo_submitted}
              exclusive
              size='small'
              onChange={handleToggleChange}
            >
              <ToggleButton value={true}>submitted</ToggleButton>
              <ToggleButton value={false}>assigned</ToggleButton>
            </ToggleButtonGroup>

          </Grid>
          <Grid item xs={6}>
            <TextField
              size='small'
              placeholder='photo comments'
              value={inputValues.photo_comments}
              onChange={handlePhotoComments}
              sx={{ width: '100%' }}
            />

          </Grid>

          <Divider variant='middle' />
          {/* more options */}
          <Grid item xs={2}>
            <Typography sx={{ textAlign: 'right', marginRight: 3 }}>additional</Typography>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <FormControlLabel control={<Checkbox checked={inputValues.graphic_image_required} onChange={handleGraphic} />} label='graphic' />
              <FormControlLabel control={<Checkbox checked={inputValues.fact_check_required} onChange={handleFactCheck} />} label='fact check' />

              <Box>
                <FormControlLabel control={<Checkbox checked={inputValues.copies_required} onChange={handleCopies} />} label='copies sent' />
                {inputValues.copies_required ?
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

                  </> :
                  <></>
                }
              </Box>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <FormControlLabel control={<Checkbox checked={inputValues.socials_required} onChange={handleSocials} />} label='social media' />
              <FormControlLabel control={<Checkbox checked={inputValues.underwriter_required} onChange={handleUnderwriter} />} label='underwriter' />

            </Box>
          </Grid>

        </Grid>


      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button
          onClick={navigateGeneral}
          startIcon={<ArrowBackIcon />}
        >
          general info
        </Button>
        <Button
          onClick={handleSubmit}
        >save and submit</Button>
      </Box>
    </Box>
  )
}
