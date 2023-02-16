import React from 'react';

import { MenuItem} from '@mui/material'

export default function ContactDropdownItem({ handleClose, contact, setInputValues, inputValues }) {

  const handleClick = () => {
    setInputValues({...inputValues, contacts: [...inputValues.contacts, contact]})
    handleClose()
  }

  return (
    <MenuItem onClick={handleClick}>{contact.name}</MenuItem>
  )
}
