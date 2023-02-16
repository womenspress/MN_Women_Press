import React from 'react';

import { MenuItem,  } from '@mui/material'

export default function TagDropdownItem({ handleClose, tag, setInputValues, inputValues }) {

  const handleClick = () => {
    console.log('clicked tag no.', tag.id);
    setInputValues({...inputValues, tags: [...inputValues.tags, tag]})
    handleClose()
  }

  return (
    <MenuItem onClick={handleClick}>{tag.name}</MenuItem>
  )
}
