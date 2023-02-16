import React, { useEffect, useState, useRef } from 'react';
import { DateTime } from 'luxon';
import { Box, Grid, Typography, Paper, FormControlLabel, Checkbox, FormGroup, Link, Modal, TextField, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ListTags from '../../components/ListTags/ListTags';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// internal
import { largeModal, mainContentBox } from '../../__style'
import StoryCreateEditModal from '../../components/StoryCreateEditModal/StoryCreateEditModal';

export default function StoriesPage() {
  // hooks
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  // redux variables
  // const allStories = useSelector(store => store.stories.allStories)
  const currentStory = useSelector(store => store.stories.currentStory);


  const [notes, setNotes] = useState(currentStory?.notes);
  const [editNotesMode, setEditNotesMode] = useState(false);
  // const [statusColor, setStatusColor] = useState({});
  const [generalInfoHeight, setGeneralInfoHeight] = useState(0);

  // createMode: will the big story modal be in create or edit mode?
  const [createMode, setCreateMode] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // passed into modal; used to determine dimensions
  const [step, setStep] = useState('general')
  const modalDimensions = step === 'general' ? { height: 600, width: 700 } : { height: 600, width: 900 }

  const [showTodo, setShowTodo] = useState(false);


  // gets current story on page load (page persists on refresh)
  useEffect(() => {
    dispatch({ type: 'GET_CURRENT_STORY', payload: id })
    // dispatch({ type: 'GET_ALL_STORIES' })
  }, [])

  // updates notes on DOM, checks status color, and refreshes task item states when current story changes
  useEffect(() => {
    // setStatusColor(makeStatusColor(currentStory))
    setNotes(currentStory.notes);

    dispatch({ type: 'SET_TEMP_STORY', payload: currentStory });
    setGeneralInfoHeight(document.getElementById("storiesGeneralSection").offsetHeight)
    setShowTodo(true);
  }, [currentStory])




  const statusStyle = {
    bgcolor: currentStory?.statusColor?.color,
    width: 20,
    height: 20,
    borderRadius: '50%'
  }


  const handleCommentEdit = () => {
    //updates story notes if there are changes
    if (notes !== currentStory.notes) {
      dispatch({ type: 'UPDATE_STORY_NOTES', payload: { storyId: id, notes: notes } });
    }
    setEditNotesMode(!editNotesMode);
  };

  const handleClickPlus = () => {
    setModalOpen(true);
  }

  const handleClose = () => {
    setModalOpen(false);
    setCreateMode(true);
    dispatch({ type: 'GET_CURRENT_STORY', payload: id });
    dispatch({ type: 'CLEAR_TEMP_STORY' });
  }

  //------- handle the check/uncheck of todo list items --------------//
  const handleCheck = (event) => {
    let statusToChange;
    switch (event.target.id) {
      case 'copies sent':
        statusToChange = 'copies_sent';
        break;
      case 'upload photo':
        statusToChange = 'photo_uploaded';
        break;
      case 'fact-check story':
        statusToChange = 'fact_check_completed';
        break;
      case 'upload graphic':
        statusToChange = 'graphic_image_completed';
        break;
      case 'make payments':
        statusToChange = 'payment_completed';
        break;
      case 'underwriting complete':
        statusToChange = 'underwriter_completed';
        break;
      case 'socials posted':
        statusToChange = 'socials_completed';
        break;
    }
    dispatch({ type: 'UPDATE_STORY_STATUS', payload: { statusToChange: statusToChange, story_id: currentStory.id } })
  }

  const displayFlex = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }

  // remove tag from story
  const removeTag = (tagID) => {
    const story_id = id;
    dispatch({ type: 'DELETE_STORY_TAG', payload: { tag_id: tagID, story_id: story_id } })
  }

  const contactCard = (contact) => {
    return (
      <Grid container spacing={1} key={contact.id} onClick={() => history.push(`/contactdetails/${contact.id}`)}>
        {/* The below portion can be swapped out with a contact card component once created */}
        <Grid item xs={12}>
          <Box component={Paper} p={1} m={1} sx={{ '&:hover': { cursor: 'pointer', backgroundColor: 'grey.200' } }}>
            <Typography fontWeight='bold'>{contact.name}</Typography>
            <Typography>{contact.email}</Typography>
            <Typography>{contact.invoice_amount ? <>Payment Required: ${contact.invoice_amount}</> : <Typography variant='body2'>payment not required</Typography>}</Typography>
          </Box>
        </Grid>
      </Grid>
    )
  }




  return (
    <Box>
      <Modal
        open={modalOpen}
        onClose={handleClose}>
        <Box sx={largeModal}>
          <StoryCreateEditModal setModalOpen={setModalOpen} createMode={false} setCreateMode={setCreateMode} step={step} setStep={setStep} />
        </Box>
      </Modal>



      <Grid container space={1}>
        {/*------- This grid row contains story header and tags---------- */}
        <Grid item xs={8}>
          <Box display='flex' flexDirection='row' alignItems='center'>
            <Tooltip title={currentStory.statusColor?.notes}>
              <Box sx={statusStyle}></Box>
            </Tooltip>
            <Typography variant='h4' sx={{ ml: 1 }}>{currentStory?.title}</Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <ListTags numOfDisplay={currentStory?.tags?.length} tags={currentStory?.tags} removeTag={removeTag} />
          </Box>
        </Grid>


        {/* This grid row contains 2 sections, 1 for general info and 1 that holds to-do + comments */}
        <Grid item xs={6} id='storiesGeneralSection' sx={mainContentBox}>
          <Grid container space={1} >
            <Grid item xs={11}>
              <Typography variant='h6'>General Info</Typography>
            </Grid>
            <Grid item xs={1}>
              <EditIcon onClick={handleClickPlus} sx={{ '&:hover': { cursor: 'pointer' } }} />
            </Grid>

            {/*--------- Maps contacts, order: author, photographer, fact checker, other ----------- */}
            <Grid item xs={3}>
              <Typography variant='body1' sx={{ ...displayFlex, flexDirection: 'row-reverse', mt: 1, p: 1 }}>
                Author
              </Typography>
            </Grid>
            <Grid item xs={9}>
              {currentStory?.contacts?.filter(e => e?.story_association === 'author').map((contact) => {
                return (
                  contactCard(contact)
                )
              })}
            </Grid>


            {/* Maps photographer and fact checker conditionally, if they 
            are required for the story and none are assigned it will indicate accordingly*/}
            {currentStory?.contacts?.filter(e => e?.story_association === 'photographer').length > 0 ?
              <>
                <Grid item xs={3}>
                  <Typography variant='body1' sx={{ ...displayFlex, flexDirection: 'row-reverse', mt: 1, p: 1 }}>
                    Photographer
                  </Typography>
                </Grid>
                {currentStory?.contacts.filter(e => e?.story_association === 'photographer').length > 0 ?
                  <Grid item xs={9}>
                    {currentStory?.contacts.filter(e => e?.story_association === 'photographer').map((contact) => {
                      return (
                        contactCard(contact)
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
            {currentStory?.fact_check_required || currentStory?.contacts?.filter(e => e?.story_association === 'fact checker').length > 0 ?
              <>
                <Grid item xs={3}>
                  <Typography variant='body1' sx={{ ...displayFlex, flexDirection: 'row-reverse', mt: 1, p: 1 }}>
                    Fact Checker
                  </Typography>
                </Grid>
                {currentStory?.contacts?.filter(e => e?.story_association === 'fact checker').length > 0 ?
                  <Grid item xs={9}>
                    {currentStory?.contacts.filter(e => e?.story_association === 'fact checker').map((contact) => {
                      return (
                        contactCard(contact)
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
            {currentStory?.contacts?.filter(e => e?.story_association !== 'fact checker' && e?.story_association !== 'author' && e?.story_association !== 'photographer').length > 0 ?
              <>
                <Grid item xs={3}>
                  <Typography variant='body1' sx={{ ...displayFlex, flexDirection: 'row-reverse', mt: 1, p: 1 }}>
                    Other
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  {currentStory?.contacts?.filter(e => e?.story_association !== 'fact checker' && e?.story_association !== 'author' && e?.story_association !== 'photographer').map((contact) => {
                    return (
                      contactCard(contact)
                    )
                  })}
                </Grid>
              </>
              :
              null
            }

            {/* Theme */}
            <Grid item xs={3} sx={{ ...displayFlex, flexDirection: 'row-reverse' }}>
              <Typography variant='body1' sx={{ textAlign: 'right', p: 1 }}>
                Theme
              </Typography>
            </Grid>
            <Grid item xs={9} sx={displayFlex}>
              {currentStory?.theme ? currentStory.theme[0]?.name : null}
            </Grid>

            {/* Publication date */}
            <Grid item xs={3} sx={{ ...displayFlex, flexDirection: 'row-reverse' }}>
              <Typography variant='body1' sx={{ textAlign: 'right', p: 1 }}>
                Publication Date
              </Typography>
            </Grid>
            <Grid item xs={9} sx={displayFlex}>
              {DateTime.fromISO(currentStory?.publication_date).toFormat('MMMM dd, yyyy')}
            </Grid>

            {/* link to story */}
            <Grid item xs={3} sx={{ ...displayFlex, flexDirection: 'row-reverse' }}>
              <Typography variant='body1' sx={{ textAlign: 'right', p: 1 }}>
                link to story
              </Typography>
            </Grid>
            <Grid item xs={9} sx={displayFlex}>
              <Link href={currentStory?.article_link}>{currentStory?.article_link}</Link>
            </Grid>
          </Grid>
        </Grid>



        {/* End general info section, next is the section that holds to-do and comments */}
        <Grid item xs={5}>
          <Grid container spacing={1} sx={mainContentBox}>
            {/* Below is the to-do section */}
            <Grid item xs={12}>
              <Typography variant='h6'>To-Do Items</Typography>
            </Grid>
            {/* using the below grid to space the to-do list one item over */}
            <Grid item xs={1}><></></Grid>


            <Grid item xs={11}>

              <FormGroup>
                <FormControlLabel
                  label={`Photo Uploaded (${currentStory?.photo_submitted ? 'Submitted' : 'Assigned'})`}
                  control={<Checkbox id={'upload photo'} checked={currentStory?.photo_uploaded} />}
                  onChange={handleCheck}
                />
              </FormGroup>
            </Grid>
            {/* graphic image required? */}
            {currentStory?.graphic_image_required ?
              <>
                <Grid item xs={1}><></></Grid>
                <Grid item xs={11}>

                  <FormGroup>
                    <FormControlLabel
                      label={'Graphic Image Uploaded'}
                      control={<Checkbox id={'upload graphic'} checked={currentStory?.graphic_image_completed} />}
                      onChange={handleCheck}
                    />
                  </FormGroup>
                </Grid>
              </>
              :
              null
            }
            {/* fact check required? */}
            {currentStory?.fact_check_required ?
              <>
                <Grid item xs={1}><></></Grid>
                <Grid item xs={11}>
                  <FormGroup>
                    <FormControlLabel
                      label={'Fact Checked'}
                      control={<Checkbox id={'fact-check story'} checked={currentStory?.fact_check_completed} />}
                      onChange={handleCheck}
                    />
                  </FormGroup>
                </Grid>
              </>
              :
              null
            }
            {/* underwriter required? */}
            {currentStory?.underwriter_required ?
              <>
                <Grid item xs={1}><></></Grid>
                <Grid item xs={11}>

                  <FormGroup>
                    <FormControlLabel
                      label={'Underwritten'}
                      control={<Checkbox id={'underwriting complete'} checked={currentStory?.underwriter_completed} />}
                      onChange={handleCheck}
                    />
                  </FormGroup>
                </Grid>
              </>
              :
              null
            }
            {/* socials required? */}
            {currentStory?.socials_required ?
              <>
                <Grid item xs={1}><></></Grid>
                <Grid item xs={11}>

                  <FormGroup>
                    <FormControlLabel
                      label={'Socials Posted'}
                      control={<Checkbox id={'socials posted'} checked={currentStory?.socials_completed} />}
                      onChange={handleCheck}
                    />
                  </FormGroup>
                </Grid>
              </>
              :
              null
            }
            {/* payments required? */}
            {currentStory?.payment_required ?
              <>
                <Grid item xs={1}><></></Grid>
                <Grid item xs={11}>

                  <FormGroup>
                    <FormControlLabel
                      label={'Payment(s) Sent'}
                      control={<Checkbox id={'make payments'} checked={currentStory?.payment_completed} />}
                      onChange={handleCheck}
                    />
                  </FormGroup>
                </Grid>
              </>
              :
              null
            }
            {/* copies sent? */}
            {currentStory?.copies_required > 0 ?
              <>
                <Grid item xs={1}><></></Grid>
                <Grid item xs={11}>

                  <FormGroup>
                    <FormControlLabel
                      label={'Copies sent, required: ' + (currentStory?.number_of_copies !== null ? currentStory?.number_of_copies : '')}
                      control={<Checkbox id={'copies sent'} checked={currentStory?.copies_sent === undefined ? false : currentStory.copies_sent} />}
                      onChange={handleCheck}
                    />
                  </FormGroup>
                </Grid>
              </>
              :
              null
            }


            {/* end to-do items */}

            <Grid item xs={12}></Grid>


            {/* start comments section */}
            <Grid item xs={9}>
              <Typography variant='h6'>Comments</Typography>
            </Grid>
            <Grid item xs={3} onClick={() => handleCommentEdit()}>
              {editNotesMode ?
                <Typography sx={{ '&:hover': { cursor: 'pointer' } }} >Save <SaveIcon /></Typography>
                :
                <Typography sx={{ '&:hover': { cursor: 'pointer' } }} >Edit <EditIcon /></Typography>
              }
            </Grid>
            <Grid item xs={12} mr={1} height={generalInfoHeight + 'px'} maxHeight={'100vh'}>
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
                <Typography component={TextField} value={notes} variant='filled' multiline fullWidth>{notes}</Typography>
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}