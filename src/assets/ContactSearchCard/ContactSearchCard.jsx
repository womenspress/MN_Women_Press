import React, { useState } from 'react';

// libraries

// components
import { Box, Typography, Paper, Button, Menu, MenuItem, Checkbox, FormControlLabel, TextField, InputAdornment, IconButton } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';

// internal
import { smallCard } from '../../__style'

export default function ContactSearchCard(props) {

  const {
    contact,
    inputValues,
    setInputValues
  } = props

  const roles = ['author', 'editor', 'source', 'photographer', 'underwriter', 'photo subject']
  const [paymentRequired, setPaymentRequired] = useState(Boolean(contact.invoice_amount))

  const [rolesAnchor, setRolesAnchor] = useState(null)
  const rolesOpen = Boolean(rolesAnchor)

  const handleRolesClick = (e) => {
    setRolesAnchor(e.currentTarget);
  }

  const handleRolesClose = () => {
    setRolesAnchor(null)
  }

  const handleRemoveContact = () => {
    setInputValues({
      ...inputValues,
      contacts: inputValues.contacts.filter((el) => el.id !== contact.id),
    });
  };

  return (
    <Paper sx={{ ...smallCard, width: 300, height: 80 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

        <Typography>{contact?.name}</Typography>
        <Button
          sx={{ textTransform: 'none', p: 0, color: 'inherit' }}
          endIcon={rolesOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          onClick={handleRolesClick}
        >
          {contact.story_association ? contact.story_association : 'role'}
        </Button>
        <IconButton
          sx={{ height: 24, width: 24 }}
          onClick={handleRemoveContact}
        >
          <CloseIcon sx={{ heigh: 20, width: 20 }} />
        </IconButton>

        <Menu
          anchorEl={rolesAnchor}
          open={rolesOpen}
          onClose={handleRolesClose}
        >
          {roles.map(role => {
            const handleClick = () => {
              // remove the current contact from the contacts array, then replace it with the new contact
              setInputValues({ ...inputValues, contacts: [...inputValues.contacts?.filter(el => el.id !== contact.id), { ...contact, story_association: role }] })
              handleRolesClose()
            }
            return (
              <MenuItem key={role} onClick={handleClick} >{role}</MenuItem>
            )
          })}
        </Menu>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FormControlLabel
          sx={{ margin: 0 }}
          control={<Checkbox
            checked={paymentRequired}
            onChange={() => {
              if (paymentRequired) setInputValues({ ...inputValues, contacts: [...inputValues.contacts.filter(el => el.id !== contact.id), { ...contact, invoice_amount: 0 }] })
              setPaymentRequired(!paymentRequired)

            }
            }
            size='small' />}
          fontSize={14}
          label={<Typography
            fontSize={14}>
            payment required?
          </Typography>}
        />
        {paymentRequired &&
          <TextField
            sx={{ width: 90, fontSize: 12 }}
            type='tel'
            size='small'
            value={inputValues.contacts.filter(el => el.id === contact.id)[0].invoice_amount}
            onChange={(e) => setInputValues({ ...inputValues, contacts: [...inputValues.contacts.filter(el => el.id !== contact.id), { ...contact, invoice_amount: e.target.value }] })}
            InputProps={{
              startAdornment: <InputAdornment position='start'>$</InputAdornment>
            }}
          />}
      </Box>
    </Paper>
  )
}
