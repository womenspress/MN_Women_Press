import React, {useState, useEffect} from 'react';

// style

import {mainContentBox} from '../../__style'

// libraries
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {DateTime} from 'luxon'

// components
import {Box, Typography, Paper, Tabs, Button} from '@mui/material';
import StoryArchive from '../../components/StoryArchive/StoryArchive';
import ThemeArchive from '../../components/ThemeArchive/ThemeArchive';

export default function ArchivePage(){

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch({type: 'GET_ALL_STORIES'});
    dispatch({type: 'GET_ALL_THEMES'})
  },[])

  const [tabValue, setTabValue] = useState('stories')

    return (
      <Box>
        <Typography variant = 'h3' sx = {{ml: 3}}>{tabValue === 'stories' ? 'Archive - stories' : 'Archive - themes'}</Typography>
        <Box>
          <Button onClick = {()=>setTabValue('stories')}>stories</Button>
          <Button onClick = {()=>setTabValue('themes')}>themes</Button>
        </Box>

        <Box sx = {{...mainContentBox, height: 600, overflow:'hidden', overflowY: 'scroll'}}>

        {tabValue === 'stories' && <StoryArchive/>}
        {tabValue === 'themes' && <ThemeArchive/>}
        </Box>
      </Box>
    )
}