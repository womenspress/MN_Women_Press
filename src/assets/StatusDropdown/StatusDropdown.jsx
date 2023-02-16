import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Box, Button, Menu, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function StatusDropdown({ story }) {

  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleCheck = (event) => {
    let statusToChange;
    switch (event.target.id) {
      case 'upload photo':
        statusToChange = 'photo_uploaded';
        break;
      case 'upload graphic':
        statusToChange = 'graphic_image_completed';
        break;
      case 'fact-check story':
        statusToChange = 'fact_check_completed';
        break;
      case 'underwriting complete':
        statusToChange = 'underwriter_completed';
        break;
      case 'socials posted':
        statusToChange = 'socials_completed';
        break;
      case 'copies sent':
        statusToChange = 'copies_sent';
        break;
      case 'make payments':
        statusToChange = 'payment_completed';
        break;
    }
    dispatch({ type: 'UPDATE_STORY_STATUS', payload: { statusToChange: statusToChange, story_id: story.id } })
  }

  // get list of required elements to populate into the dropdown

  // returns boolean: true if any contact requires payment, false otherwise

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
      status: true,
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
      status: story.payment_required,
      complete: story.payment_completed,
    },
    {
      name: 'socials posted',
      name_db: 'socials_completed',
      status: story.socials_required,
      complete: story.socials_completed,
    },
    {
      name: 'underwriting complete',
      name_db: 'underwriter_required',
      status: story.underwriter_required,
      complete: story.underwriter_completed,
    },
  ].filter(piece => piece.status);



  return (
    <Box>
      <Box>
        <Button
          onClick={handleClick}
          sx={{ color: 'grey.700', textTransform: 'none' }}
          startIcon={<CheckCircleOutlineIcon />}

        >
          update
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
              sx={{ marginY: 0, paddingY: 0 }}
            >
              <FormControlLabel
                label={piece.name}
                control={<Checkbox id={piece.name} checked={piece.complete} />}
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
