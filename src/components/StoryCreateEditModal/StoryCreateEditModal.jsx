import React, { useState } from 'react'

// libraries
import { useDispatch, useSelector } from 'react-redux'


// components
import { Box, Typography, Grid, Button } from '@mui/material'
import StoryModalGeneral from '../StoryModalGeneral/StoryModalGeneral';
import StoryModalAdditional from '../StoryModalAdditional/StoryModalAdditional';
import StoryModalNeeds from '../StoryModalNeeds/StoryModalNeeds';


export default function StoryCreateEditModal(props) {

  const {
    setModalOpen,
    createMode,

  } = props


  const dispatch = useDispatch();

  // I am assuming that since this is a modal, the tags and contacts will already be in the store (no useEffect required)

  // const contacts = useSelector(store => store.contacts.allContacts)
  // const tags = useSelector(store => store.tags.allTags)

  const [step, setStep] = useState('general')
  const [inputValues, setInputValues] = useState({ title: '', contacts: [], notes: '', tags: [] })



  return (
    <Box>
      {step === 'general' && <StoryModalGeneral createMode={createMode} setModalOpen={setModalOpen} setStep={setStep} />}
      {step === 'additional' && <StoryModalAdditional createMode={createMode} setModalOpen={setModalOpen} setStep={setStep} />}
      {step === 'needs' && <StoryModalNeeds createMode={createMode} setModalOpen={setModalOpen} setStep={setStep} />}
    </Box>
  )
}

