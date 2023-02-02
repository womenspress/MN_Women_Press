import React from 'react'

// libraries
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';

// components
import { Box, Typography } from '@mui/material';
import ThemeCard from '../ThemeCard/ThemeCard'

export default function ThemeArchive() {

  const allThemes = useSelector(store => store.themes.allThemes);
  
  const archiveThemes = allThemes.length ? allThemes.filter(theme => DateTime.fromObject({ month: theme.month, year: theme.year }) < DateTime.now().toISO()) : [];

  return (
    <Box>
      <Typography variant='body1'>themes archive</Typography>
      {archiveThemes.map(theme => {
        return (
          <ThemeCard theme={theme} />
        )
      })}
    </Box>
  )
}
