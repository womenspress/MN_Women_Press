import React, { useState } from 'react';

// libraries

// components
import { Box, Typography, Paper, Button, Menu, MenuItem, Checkbox, FormControlLabel} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// internal
import { smallCard } from '../../__style'

export default function ContactSearchCard(props) {

  const {
    contact,
    inputValues,
    setInputValues
  } = props

  const roles = ['author', 'photographer', 'fact-checker']

  const [rolesAnchor, setRolesAnchor] = useState(null)
  const rolesOpen = Boolean(rolesAnchor)

  const handleRolesClick = (e) => {
    setRolesAnchor(e.currentTarget);

  }

  const handleRolesClose = () => {
    setRolesAnchor(null)
  }

  return (
    <Paper sx={{ ...smallCard, width: 300 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between'}} >
        <Typography>{contact.name}</Typography>
        <Button
          sx={{ textTransform: 'none', p: 0, color: 'inherit' }}
          endIcon={rolesOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          onClick={handleRolesClick}
        >
          {contact.story_association ? contact.story_association : 'role'}
        </Button>
        <Menu
          anchorEl={rolesAnchor}
          open={rolesOpen}
          onClose={handleRolesClose}
        >
          {roles.map(role => {
            const handleClick = () => {
              console.log('in role handleClick. contact to add: ', { ...contact, story_association: role })
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
        <Typography fontSize={14}>payment?</Typography>
        <Typography fontSize={14}>amount: $</Typography>
      </Box>
    </Paper>
  )
}
