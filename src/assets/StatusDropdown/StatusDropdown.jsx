import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Box, Collapse, Button, Menu, MenuItem, Grid, FormControlLabel, Checkbox } from '@mui/material';

export default function StatusDropdown({ story }) {

  const [statusOpen, setStatusOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = (event) => {
    setAnchorEl(null);
  }

  const handleCheck = (event) => {
    let statusToChange
    switch (event.target.id) {
      case 'copies sent':
        statusToChange = 'copies_sent';
        break;
      case 'upload photo':
        statusToChange = 'photo_uploaded';
        break;
      case 'fact-check story':
        statusToChange = 'fact_check_completed';
        break;
      case 'upload graphic':
        statusToChange = 'graphic_image_completed';
        break;
      case 'make payments':
        statusToChange = 'payment_completed';
        break;
    }
    dispatch({ type: 'UPDATE_STORY_STATUS', payload: statusToChange })
  }

  // get list of required elements to populate into the dropdown

  // returns boolean: true if any contact requires payment, false otherwise
  const payment_required = !!story.contacts.filter(contact => contact.invoice_amount > 0).length

  // const payment_required = story.contacts.filter(contact=>contact.invoice_amount>0).length > 0;

  // const piecesToTrack = [story.copies_required, story.photo_required, story.fact_check_required, story.graphic_image_required, payment_required]

  const piecesToTrack = [
    {
      name: 'copies sent',
      name_db: 'copies_sent',
      status: story.copies_required,
      complete: story.copies_sent,
    },
    {
      name: 'upload photo',
      name_db: 'photo_uploaded',
      status: story.photo_required,
      complete: story.photo_uploaded,
    },
    {
      name: 'fact-check story',
      name_db: 'fact_check_completed',
      status: story.fact_check_required,
      complete: story.fact_check_completed,
    },
    {
      name: 'upload graphic',
      name_db: 'graphic_image_completed',
      status: story.graphic_image_required,
      complete: story.graphic_image_completed,
    },
    {
      name: 'make payments',
      name_db: 'payment_completed',
      status: payment_required,
      complete: story.payment_completed,
    },
  ].filter(piece => piece.status)


  /* 
  eventually want something like
  [
    {
      name: copies_required
      status: false
    }
  ]
  */

  return (
    <Box>
      {/* {JSON.stringify(piecesToTrack)} */}
      <Box>
        <Button
          onClick={handleClick}>
          status
        </Button>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {piecesToTrack.map(piece => {
          return (
            <MenuItem
              key={piece.name}
            >
              <FormControlLabel
                label={piece.name}
                control={<Checkbox id={piece.name} />}
                onChange={handleCheck}
              />
            </MenuItem>
          )
        }
        )}
      </Menu>

    </Box>
  )
}
