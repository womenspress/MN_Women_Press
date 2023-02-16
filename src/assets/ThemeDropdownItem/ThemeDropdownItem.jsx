import React from 'react';

import { MenuItem } from '@mui/material'

export default function ThemeDropdownItem({ handleClose, theme, setInputValues, inputValues }) {

  const handleClick = () => {
    console.log('clicked theme no.', theme.id);
    setInputValues({ ...inputValues, theme: [theme] })
    handleClose()
  }

  return (
    <MenuItem onClick={handleClick}>{theme.name}</MenuItem>
  )
}
