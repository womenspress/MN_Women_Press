import React, { useEffect } from 'react';

import ThemeCalendar from '../../components/ThemeCalendar/ThemeCalendar';
import { Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

export default function ThemesPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_ALL_THEMES' });
    dispatch({ type: 'GET_ALL_CONTACTS' });
    dispatch({ type: 'GET_ALL_STORIES' });
  }, [])


  return (
    <div>
      <Typography variant="h3" component="h1">
        Themes
      </Typography>
      <div>
        <ThemeCalendar />
      </div>
    </div>
  )
}