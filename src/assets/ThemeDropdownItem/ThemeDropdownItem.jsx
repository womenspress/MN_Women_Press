import React from 'react';

import { MenuItem, Typography } from '@mui/material'

export default function ThemeDropdownItem({ handleClose, theme, setInputValues, inputValues }) {

  const handleClick = () => {
    console.log('clicked contact no.', theme.id);
    setInputValues({...inputValues, themes: [...inputValues.themes, theme]})
    handleClose()
  }

  return (
    <MenuItem onClick={handleClick}>{theme.name}</MenuItem>
  )
}
