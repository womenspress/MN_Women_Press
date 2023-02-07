import React, { useState } from 'react'

// libraries

import { useDispatch, useSelector } from 'react-redux'

// components
import { Box, Typography, Grid, Button, TextField, Checkbox, FormGroup, FormControlLabel } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

export default function StoryModalNeeds(props) {

  //! todo: make dropdown tag and contact search functionality

  const {
    setModalOpen,
    setStep,
    createMode
  } = props



  const dispatch = useDispatch()

  const currentStory = useSelector(store => store.stories.tempStory)

  const [inputValues, setInputValues] = useState(currentStory);
  const [photographerSearch, setPhotographerSearch] = useState('');

  const [checkboxStatus, setCheckboxStatus] = useState({
    payment: [],
    graphic: false,
    photo: false,
    copies_sent: false,
  });

  const inputValuesSample = {
    id: 1,
    title: 'blah blah',
    contacts: [{
      id: 1,
      name: '',
      payment_required: true,
      story_association: 'author',
      payment_amount: 124
    }],
    tags: [],
  }

  /* add once data is flowing
    const contacts = inputValues.contacts
   */

  const handleCheck = (e) => {
    console.log('in handleCheck for element with id: ', e.target.id);

    const contactToChange = inputValues.contacts.filter(contact => contact.id === e.target.id)[0];
    contactToChange.payment_required = !contactToChange.payment_required;

    // if (e.target.checked) 
    /* 
    setInputValues({...inputValues, contacts: [...contacts, ]})
    */
  }

  // contactsOnStory.map(contact=><ContactDisplay contact = {contact}
  //   onClick = {()=>setInputValues({...inputValues, contacts: [...inputValues.contacts, ???]})}/>)



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

  const handleCopies = (e) => {
    console.log('in handleCopies');
    if (e.target.checked) setInputValues({ ...inputValues, copies_required: true })
    else setInputValues({ ...inputValues, copies_required: false, number_of_copies: 0 })
  }

  const handleCopyNumber = (e) => {
    console.log('handling copy number');
    setInputValues({ ...inputValues, number_of_copies: e.target.value })
  }


  // on submit: close modal. create mode true => POST data. create mode false => PUT data.
  const handleSubmit = () => {
    console.log('saved and submitted');
    if (createMode) {
      dispatch({ type: 'CLEAR_TEMP_STORY' })
      dispatch({ type: 'CREATE_NEW_STORY', payload: { ...currentStory, ...inputValues } });
    }
    else dispatch({ type: 'EDIT_STORY', payload: { ...currentStory, ...inputValues } });
    setModalOpen(false);
  }

  const handleClose = () => {
    setModalOpen(false);
    setCreateMode(true);
    dispatch({ type: 'CLEAR_TEMP_STORY' })
  }

  const navigateAdditional = () => {
    console.log('navigating to next page');
    dispatch({ type: 'SET_TEMP_STORY', payload: { ...currentStory, ...inputValues } })
    setStep('additional');
  }



  return (
    <Box>
      input values: {JSON.stringify(inputValues)}

      <Typography variant='h4'>New Story - story needs</Typography>
      <Grid container spacing={1}>

        {/* payment */}
        <Grid item xs={3}>
          <Typography sx={{ textAlign: 'right', marginRight: 3 }}>
            payment
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Box sx={{ bgcolor: 'grey.100' }}>contacts with checkboxes here</Box>
          <FormGroup>
            {/* 
          {contacts.map(contact=>{
            setCheckboxStatus({...checkboxStatus, payment: [...payment, {[contact.name]: 0}]})
            return(
              <FormControlLabel key = contact.name label = {contact.name} control = {<Checkbox id = {contact.id} onChange={handleCheck}/>}/>
            )
          })}
          */}
          </FormGroup>
          <TextField
            size='small'
            value={inputValues.title}
            onChange={(e) => setInputValues({ ...inputValues, title: e.target.value })}
          />
        </Grid>

        {/* graphic */}
        <Grid item xs={3}>
          <FormControlLabel control={<Checkbox onChange={handleGraphic} />} label='graphic' />
        </Grid>
        <Grid item xs={9}>

        </Grid>

        {/* photo */}
        <Grid item xs={3}>
          <FormControlLabel control={<Checkbox onChange={handlePhoto} />} label='photo' />

        </Grid>
        <Grid item xs={9}>
          {inputValues.photo_required && <TextField
            value={photographerSearch}
            onChange={(e) => setPhotographerSearch(e.target.value)}
          />}

        </Grid>

        {/* copies sent */}
        <Grid item xs={3}>
          <FormControlLabel control={<Checkbox onChange={handleCopies} />} label='copies sent' />
        </Grid>
        <Grid item xs={9}>
          {inputValues.copies_required && <TextField
            type='number'
            placeholder='number of copies'
            value={inputValues.number_of_copies}
            onChange={handleCopyNumber}
          />}
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
