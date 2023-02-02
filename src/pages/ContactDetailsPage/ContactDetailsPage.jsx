import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Box, Grid, Typography, Paper, FormControlLabel, Checkbox, FormGroup, Link, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ListTags from '../../components/ListTags/ListTags';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


// sample data import
import { contact } from '../../sampleData';

export default function ContactDetailsPage() {

  // sort by select options
  const sortByOptions = [
    { value: 'newest', label: 'newest' },
    { value: 'publication_date', label: 'publication date' },
    { value: 'type', label: 'type' },
  ]

  return (
    <Box>
      <Grid container space={1}>
        <Grid item xs={2} display='flex' flexDirection='row-reverse'>
          {/* profile image */}
          <Box
            component='img'
            sx={{
              height: 150
            }}
            alt="Profile Picture"
            src={contact.photo}
          />
        </Grid>
        {/* holds name, pronouns, and expertise */}
        <Grid item xs={10}>
          <Box display='flex' flexDirection='column' justifyContent='center' height={150}>
            <Box display='flex' flexDirection='row' alignItems='center'>
              <Typography variant='h4'>{contact.name}</Typography>
              <Typography variant='h6' sx={{ ml: 1 }}>({contact.pronouns})</Typography>
            </Box>
            <Typography variant='h6' fontStyle='italic'>{contact.expertise}</Typography>
          </Box>
        </Grid>
        {/* start of row that holds general info and contribution headers, as well as sort by an search field */}
        <Grid item xs={4}>
          <Typography variant='h6' fontWeight='bold'>General Info</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant='h6' fontWeight='bold'>Contributions</Typography>
        </Grid>
        <Grid item xs={4}>
          <Box display='flex' flexDirection='row'>
            <Typography variant='h6'>Sort by:</Typography>
            <Select options={sortByOptions} sx={{ width: '100%'}}/>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}