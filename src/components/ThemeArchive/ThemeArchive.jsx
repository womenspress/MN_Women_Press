import React, { useState } from 'react'

// libraries
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';
import SortFilterSearch from '../../assets/SortFilterSearch/SortFilterSearch';

// components
import { Box, Typography, Grid } from '@mui/material';
import ThemeCard from '../ThemeCard/ThemeCard';
import ArchiveThemeCard from '../../assets/ArchiveThemeCard/ArchiveThemeCard';
import StoryListItem from '../StoryListItem/StoryListItem';
import ContactListItem from '../ThemeContactListItem/ThemeContactListItem';

export default function ThemeArchive() {

  const [selectedTheme, setSelectedTheme] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortMethod, setSortMethod] = useState('date');
  const [filterMethod, setFilterMethod] = useState('none');
  const [sortDirection, setSortDirection] = useState('descending')
  const sortOptions = ['date', 'title']
  const filterOptions = ['none', 'recent',]

  const allThemes = useSelector(store => store.themes.allThemes);
  const archiveThemes = Array.isArray(allThemes) && allThemes.length ? allThemes.filter(theme => Date.parse(theme.month_year) < DateTime.now()) : [];


  const sortResults = (arr) => {
    let outputArray = arr
    if (sortDirection === 'descending') outputArray = arr.reverse();

    switch (sortMethod) {
      case 'date':
        return outputArray.sort((a, b) => {
          if (DateTime.fromObject({ month: a.month, year: a.year }) > DateTime.fromObject({ month: b.month, year: b.year })) return -1
          if (DateTime.fromObject({ month: a.month, year: a.year }) < DateTime.fromObject({ month: b.month, year: b.year })) return 1
          else return 0
        })
        break;
      case 'title':
        return outputArray.sort((a, b) => {
          if (a.name > b.name) return -1
          if (a.name < b.name) return 1
          else return 0
        })
        break;
      default:
        return outputArray;
    }
  }


  const filterResults = (arr) => {
    switch (filterMethod) {
      case 'none':
        return arr;
        break;
      // recent sets to the past three months
      case 'recent':
        return arr.filter(theme => DateTime.fromISO(theme.month_year) > DateTime.now().minus({ months: 3 }))
        break;
      default:
        return arr
    }
  }


  const searchResults = (arr) => {
    return arr.filter(theme => theme.name.toLowerCase().includes(searchTerm.toLowerCase()) || theme.description.toLowerCase().includes(searchTerm))
  }

  const themeResults = filterResults(sortResults(searchResults(archiveThemes)))

  return (
    <Box>
      {/* <p>{JSON.stringify(archiveThemes)}</p>
      <p>{Date.now()}</p>
      <p>{Date.parse(allThemes[0].month_year)}</p> */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant='h4'>Themes</Typography>
        <SortFilterSearch
          sortOptions={sortOptions}
          filterOptions={filterOptions}
          sortMethod={sortMethod}
          sortDirection = {sortDirection}
          setSortDirection= {setSortDirection}
          setSortMethod={setSortMethod}
          filterMethod={filterMethod}
          setFilterMethod={setFilterMethod}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          
        />

      </Box>
      <Grid container spacing={1}>
        <Grid item xs={2} sx = {{height: 600, overflow: 'hidden', overflowY: 'scroll'}}>
          {themeResults?.map(theme => {
            return (
              <ArchiveThemeCard key={theme.name} theme={theme} setSelectedTheme={setSelectedTheme} />
            )
          })}
        </Grid>
        <Grid item xs={5} sx = {{height: 600, overflow: 'hidden', overflowY: 'scroll'}}>
          {selectedTheme &&
            <Box>
              <Typography variant='h6'>stories</Typography>
              {selectedTheme.stories?.map(story => {
                return (
                  <StoryListItem key={story.title} story={story} />
                )
              })}
            </Box>
          }
        </Grid>
        <Grid item xs={5} sx = {{height: 600, overflow: 'hidden', overflowY: 'scroll'}}>
          {selectedTheme &&
            <Box>
              <Typography variant='h6'>contacts</Typography>

              {selectedTheme.contacts?.map(contact => {

                return (
                  contact && <ContactListItem key={contact.name} contact={contact} />
                )
              })}
            </Box>
          }
        </Grid>
      </Grid>
    </Box>
  )
}
