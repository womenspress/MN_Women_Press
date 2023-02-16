import React from 'react'

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

  return (
    <>
      {step === 'general' && <StoryModalGeneral createMode={createMode} setModalOpen={setModalOpen} setStep={setStep} setCreateMode={setCreateMode} />}
      {step === 'additional' && <StoryModalAdditional createMode={createMode} setModalOpen={setModalOpen} setStep={setStep} setCreateMode={setCreateMode} />}
    </>
  )
}

