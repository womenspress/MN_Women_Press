import React from 'react';

import { MenuItem, Typography } from '@mui/material'

export default function ContactDropdownItem({ handleClose, contact, setInputValues, inputValues }) {

  const handleClick = () => {
    console.log('clicked contact no.', contact.id);
    setInputValues({...inputValues, contacts: [...inputValues.contacts, contact]})
    handleClose()
  }

  return (
    <MenuItem onClick={handleClick}>{contact.name}</MenuItem>
  )
}
