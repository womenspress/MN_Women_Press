import React, { useEffect, useState } from 'react';
import { story } from '../../sampleStoryData';
import { Box, Grid, Typography, Paper, FormControlLabel, Checkbox, FormGroup, FormControl, Link, styled, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ListTags from '../../components/ListTags/ListTags';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function StoriesPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentStory = useSelector(store => store.stories.currentStory);
  const [photoStatus, setPhotoStatus] = useState(currentStory?.photo_uploaded);
  const [graphicPhotoStatus, setGraphicPhotoStatus] = useState(currentStory?.graphic_image_completed);
  const [copiesSentStatus, setCopiesSentStatus] = useState(currentStory?.copies_sent);
  const [paymentStatus, setPaymentStatus] = useState(currentStory?.payment_completed);
  const [notes, setNotes] = useState(currentStory?.notes);
  const [editNotesMode, setEditNotesMode] = useState(false);

  useEffect(()=>{
    dispatch({ type: 'GET_CURRENT_STORY', payload: id})
  }, [])


  const handleCheck = (event) => {
    // console.log(event.target.id)
    let statusToChange
    switch (event.target.id) {
      case 'copies sent':
        statusToChange = 'copies_sent';
        setCopiesSentStatus(!copiesSentStatus)
        break;
      case 'upload photo':
        statusToChange = 'photo_uploaded';
        setPhotoStatus(!photoStatus);
        break;
      case 'fact-check story':
        statusToChange = 'fact_check_completed';
        break;
      case 'upload graphic':
        statusToChange = 'graphic_image_completed';
        setGraphicPhotoStatus(!graphicPhotoStatus)
        break;
      case 'make payments':
        statusToChange = 'payment_completed';
        setPaymentStatus(!paymentStatus)
        break;
    }
    dispatch({ type: 'UPDATE_STORY_STATUS', payload: { statusToChange: statusToChange, story_id: currentStory.id } })
  }

  return (
    <Box>
      {/* {JSON.stringify(currentStory)} */}
      <Grid container space={1}>
        {/* This grid row contains story header and tags */}
        <Grid item xs={8}>
          <Typography variant='h4'>{currentStory.title}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <ListTags numOfDisplay={currentStory.tags?.length} tags={currentStory.tags} />
          </Box>
        </Grid>
        {/* This grid row contains 2 sections, 1 for general info and 1 that holds to-do + comments */}
        <Grid item xs={6} sx={{ backgroundColor: 'lightgrey', mr: 2 }}>
          <Grid container space={1}>
            <Grid item xs={11}>
              <Typography variant='h6'>General Info</Typography>
            </Grid>
            {/* Need to link edit icon to story edit modal */}
            <Grid item xs={1}>
              <EditIcon />
            </Grid>
            {/* Map of contacts, author first */}
            <Grid item xs={3}>
              <Typography variant='body1' sx={{ textAlign: 'right', mt: 1, p: 1 }}>
                Author
              </Typography>
            </Grid>
            <Grid item xs={9}>
              {currentStory.contacts?.filter(e => e.role === 'author').map((contact) => {
                return (
                  <Grid container spacing={1} key={contact.id}>
                    {/* The below portion can be swapped out with a contact card component once created */}
                    <Grid item xs={12}>
                      <Box component={Paper} p={1} m={1}>
                        <Typography fontWeight='bold'>{contact.name}</Typography>
                        <Typography>{contact.email}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                )
              })}
            </Grid>
            {/* Maps other contacts conditionally if they are required when story is created, starting with photographer */}
            {currentStory.photo_required ?
              <>
                <Grid item xs={3}>
                  <Typography variant='body1' sx={{ textAlign: 'right', mt: 1, p: 1 }}>
                    Photographer
                  </Typography>
                </Grid>
                {currentStory.contacts.filter(e => e.role === 'photographer').length > 0 ?
                  <Grid item xs={9}>
                    {currentStory.contacts.filter(e => e.role === 'photographer').map((contact) => {
                      return (
                        <Grid container spacing={1} key={contact.id}>
                          {/* The below portion can be swapped out with a contact card component once created */}
                          <Grid item xs={12}>
                            <Box component={Paper} p={1} m={1}>
                              <Typography fontWeight='bold'>{contact.name}</Typography>
                              <Typography>{contact.email}</Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      )
                    })}
                  </Grid>
                  :
                  <Grid item xs={9}>
                    <Typography variant='body1' fontStyle='italic' sx={{ mt: 1, ml: 1, p: 1 }}>none assigned</Typography>
                  </Grid>}
              </>
              :
              null
            }
            {currentStory.fact_check_required ?
              <>
                <Grid item xs={3}>
                  <Typography variant='body1' sx={{ textAlign: 'right', mt: 1, p: 1 }}>
                    Fact Checker
                  </Typography>
                </Grid>
                {currentStory.contacts?.filter(e => e.role === 'fact checker').length > 0 ?
                  <Grid item xs={9}>
                    {currentStory.contacts.filter(e => e.role === 'fact checker').map((contact) => {
                      return (
                        <Grid container spacing={1} key={contact.id}>
                          {/* The below portion can be swapped out with a contact card component once created */}
                          <Grid item xs={12}>
                            <Box component={Paper} p={1} m={1}>
                              <Typography fontWeight='bold'>{contact.name}</Typography>
                              <Typography>{contact.email}</Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      )
                    })}
                  </Grid>
                  :
                  <Grid item xs={9}>
                    <Typography variant='body1' fontStyle='italic' sx={{ mt: 1, ml: 1, p: 1 }}>none assigned</Typography>
                  </Grid>}
              </>
              :
              null
            }
            {/* Other contacts that are not fact checker, author, photographer go here */}
            {currentStory.contacts?.filter(e => e.role !== 'fact checker' && e.role !== 'author' && e.role !== 'photographer').length > 0 ?
              <>
                <Grid item xs={3}>
                  <Typography variant='body1' sx={{ textAlign: 'right', mt: 1, p: 1 }}>
                    Other
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  {currentStory.contacts.filter(e => e.role !== 'fact checker' && e.role !== 'author' && e.role !== 'photographer').map((contact) => {
                    return (
                      <Grid container spacing={1} key={contact.id}>
                        {/* The below portion can be swapped out with a contact card component once created */}
                        <Grid item xs={12}>
                          <Box component={Paper} p={1} m={1}>
                            <Typography fontWeight='bold'>{contact.name}</Typography>
                            <Typography>{contact.email}</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    )
                  })}
                </Grid>
              </>
              :
              null
            }
            {/* Theme */}
            <Grid item xs={3}>
              <Typography variant='body1' sx={{ textAlign: 'right', mt: 1, p: 1 }}>
                Theme
              </Typography>
            </Grid>
            <Grid item xs={9}>
              {currentStory.theme?.name}
            </Grid>
            {/* Publication date */}
            <Grid item xs={3}>
              <Typography variant='body1' sx={{ textAlign: 'right', mt: 1, p: 1 }}>
                Publication Date
              </Typography>
            </Grid>
            <Grid item xs={9}>
              {currentStory?.publication_date}
            </Grid>
            {/* link to story */}
            <Grid item xs={3}>
              <Typography variant='body1' sx={{ textAlign: 'right', mt: 1, p: 1 }}>
                link to story
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Link href={currentStory?.article_link}>{currentStory?.article_link}</Link>
            </Grid>
          </Grid>
        </Grid>
        {/* End general info section, next is the section that holds to-do and comments */}
        <Grid item xs={5}>
          <Grid container spacing={1} sx={{ backgroundColor: 'lightgrey', mt: "1px" }}>
            {/* Below is the to-do section */}
            <Grid item xs={12}>
              <Typography variant='h6'>To-Do Items</Typography>
            </Grid>
            {/* using the below grid to space the to-do list one item over */}
            <Grid item xs={1}><></></Grid>
            <Grid item xs={11}>
              {/* photo required? */}
              {currentStory.photo_required ?
                <FormGroup>
                  <FormControlLabel
                    label={'Photo Uploaded'}
                    control={<Checkbox id={'upload photo'} checked={photoStatus} />}
                    onChange={handleCheck}
                  />
                </FormGroup>
                :
                null
              }
            </Grid>
            <Grid item xs={1}><></></Grid>
            <Grid item xs={11}>
              {/* graphic image required? */}
              {currentStory.graphic_image_required ?
                <FormGroup>
                  <FormControlLabel
                    label={'Graphic Image Uploaded'}
                    control={<Checkbox id={'upload graphic'} checked={graphicPhotoStatus} />}
                    onChange={handleCheck}
                  />
                </FormGroup>
                :
                null
              }
            </Grid>
            <Grid item xs={1}><></></Grid>
            <Grid item xs={11}>
              {/* copies sent? */}
              {currentStory.copies_required > 0 ?
                <FormGroup>
                  <FormControlLabel
                    label={'Copies sent, required amount:' + currentStory.copies_required}
                    control={<Checkbox id={'make payments'} checked={copiesSentStatus} />}
                    onChange={handleCheck}
                  />
                </FormGroup>
                :
                null
              }
            </Grid>
            <Grid item xs={1}><></></Grid>
            <Grid item xs={11}>
              {/* payment sent? */}
              {currentStory.payment_required ?
                <FormGroup>
                  <FormControlLabel
                    label={'Payment Sent'}
                    control={<Checkbox id={'make payments'} checked={paymentStatus} />}
                    onChange={handleCheck}
                  />
                </FormGroup>
                :
                null
              }
            </Grid>
            {/* end to-do items */}
            {/* start comments section */}
            <Grid item xs={9}>
              <Typography variant='h6'>Comments</Typography>
            </Grid>
            <Grid item xs={3} onClick={() => setEditNotesMode(!editNotesMode)}>
              {editNotesMode ?
                <Typography>Save <SaveIcon /></Typography>
                :
                <Typography>Edit <EditIcon /></Typography>
              }
            </Grid>
            <Grid item xs={12} mr={1}>
              {editNotesMode ?
                <TextField
                  id='notesEditField'
                  variant='filled'
                  multiline
                  fullWidth
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  sx={{ backgroundColor: 'white' }}
                />
                :
                <TextField
                  id='notesEditField'
                  variant='filled'
                  multiline
                  fullWidth
                  disabled
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  sx={{
                    backgroundColor: 'white',
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "black",
                    },
                  }}
                />
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}