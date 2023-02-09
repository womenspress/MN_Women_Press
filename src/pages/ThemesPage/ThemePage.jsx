import React, { useEffect } from 'react';

import ThemeCalendar from '../../components/ThemeCalendar/ThemeCalendar';
import { Typography, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

export default function ThemesPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_ALL_THEMES' });
    dispatch({ type: 'GET_ALL_CONTACTS' });
    dispatch({ type: 'GET_ALL_STORIES' });
  }, [])

  const mainContentBox = {
    bgcolor: 'grey.100',
    padding: 1,
    margin: 1,
    borderRadius: 2
  }


  return (
    <div>
      <Typography variant="h3" component="h1">
        Themes
      </Typography>
      <Box sx={{bgcolor: 'grey.100',padding: 1,margin: 1,borderRadius: 2 }}>
        <ThemeCalendar />
      </Box>
    </div>
  )
}