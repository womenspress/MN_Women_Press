import React, { useState } from "react";

// libraries
import { DateTime } from 'luxon';
import { useSelector } from 'react-redux'

// components
import ThemeCard from '../../components/ThemeCard/ThemeCard';
import { Grid, Box, Typography, IconButton } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


export default function ThemeCalendar(props) {
  const [year, setYear] = useState(DateTime.now().toFormat('yyyy'));
  const allThemes = useSelector(store => store.themes.allThemes)

  const themesInYear = allThemes?.filter(theme => DateTime.fromISO(theme.month_year).toFormat('yyyy') == year)

  return (

    <Box sx={{ display: 'flex', flexDirection: 'column' }} id="theme-calender-body">
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton
          onClick={() => setYear(Number(year) - 1)}
        >
          <ArrowLeftIcon />
        </IconButton>
        <Typography variant='h4'>
          {year}
        </Typography>
        <IconButton
        onClick = {() => setYear(Number(year)+1)}>
          <ArrowRightIcon/>
        </IconButton>
      </Box>
      <Box>
        {/* theme calender will be a grid display 4 across 3 down (12 cards total) */}
        <Grid sx={{ justifyContent: 'center' }} container id="theme-calendar-cards" spacing={1}>
          {
            // filters by current year displayed and maps remaining theme cards
            themesInYear?.map((theme, index) => {
              return (
                // <div>{theme.name}: Card #{index}</div>
                <Grid item xs={3} key = {index} sx = {{width: '100%'}}>
                  <ThemeCard
                    theme={theme}/>
                </Grid>
              )
            })
          }
        </Grid>
      </Box>
    </Box>
  )
}