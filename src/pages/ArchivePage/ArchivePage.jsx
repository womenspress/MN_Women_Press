import React, {useState} from 'react';

// libraries
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {DateTime} from 'luxon'

// components
import {Box, Typography, Paper, Tabs, Button} from '@mui/material';
import StoryArchive from '../../components/StoryArchive/StoryArchive'
import ThemeArchive from '../../components/ThemeArchive/ThemeArchive';

export default function ArchivePage(){

  const [tabValue, setTabValue] = useState('stories')

    return (
      <Box>
        <Typography variant = 'h3'>Archive</Typography>
        <Box>
          <Button onClick = {()=>setTabValue('stories')}>stories</Button>
          <Button onClick = {()=>setTabValue('themes')}>themes</Button>
        </Box>
        {tabValue === 'stories' && <StoryArchive/>}
        {tabValue === 'themes' && <ThemeArchive/>}

        <Box>

        </Box>
      </Box>
    )
}