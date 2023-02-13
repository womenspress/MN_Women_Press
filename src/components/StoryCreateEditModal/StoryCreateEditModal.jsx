import React, { useState } from 'react'

// libraries
import { useDispatch, useSelector } from 'react-redux'


// components
import StoryModalGeneral from '../StoryModalGeneral/StoryModalGeneral';
import StoryModalAdditional from '../StoryModalAdditional/StoryModalAdditional';


export default function (props) {

  const {
    setModalOpen,
    createMode,
    setCreateMode,
    step,
    setStep
  } = props



  const dispatch = useDispatch();

  // I am assuming that since this is a modal, the tags and contacts will already be in the store (no useEffect required)

  // const contacts = useSelector(store => store.contacts.allContacts)
  // const tags = useSelector(store => store.tags.allTags)

  const [inputValues, setInputValues] = useState({ title: '', contacts: [], notes: '', tags: [] })

 


  return (
    <>
      {step === 'general' && <StoryModalGeneral createMode={createMode} setModalOpen={setModalOpen} setStep={setStep} setCreateMode={setCreateMode} />}
      {step === 'additional' && <StoryModalAdditional createMode={createMode} setModalOpen={setModalOpen} setStep={setStep} setCreateMode={setCreateMode} />}
    </>
  )
}

