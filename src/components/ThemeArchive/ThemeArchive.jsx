import React, { useState } from 'react'

// libraries
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';
import SortFilterSearch from '../../assets/SortFilterSearch/SortFilterSearch';

// components
import { Box, Typography } from '@mui/material';
import ThemeCard from '../ThemeCard/ThemeCard'

export default function ThemeArchive() {

  const [searchTerm, setSearchTerm] = useState('');
  const [sortMethod, setSortMethod] = useState('date');
  const [filterMethod, setFilterMethod] = useState('none');
  const sortOptions = ['date', 'title']
  const filterOptions = ['none', 'recent',]

  const allThemes = useSelector(store => store.themes.allThemes);

  const archiveThemes = allThemes.length ? allThemes.filter(theme => DateTime.fromObject({ month: theme.month, year: theme.year }) < DateTime.now().toISO()) : [];

  const filterResults = (arr) => {
    switch (filterMethod) {
      case 'none':
        return arr;
        break;
      // recent sets to the past three months
      case 'recent':
        return arr.filter(theme => DateTime.fromObject({month: theme.month, year: theme.year}) > DateTime.now().minus({ months: 3 }))
        break;
      default:
        return arr
    }
  }

  const sortResults = (arr) => {
    let outputArray
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

  const searchResults = (arr) => {
    // const arrTags = arr.map(story=>story.tags).map(tag=>tag.name)
    // const arrContacts = arr.map(story=>story.contacts).map(contact=>contact.name)
    // const arrTitles = arr.map(story=>story.title)
    // const arrThemes = arr.map(story=>story.theme.name)

    return arr.filter(theme => theme.name.toLowerCase().includes(searchTerm) || theme.description.toLowerCase().includes(searchTerm))
  }

const themeResults = filterResults(sortResults(searchResults(archiveThemes)))

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant='h4'>Themes</Typography>
        <SortFilterSearch
          sortOptions={sortOptions}
          filterOptions={filterOptions}
          sortMethod={sortMethod}
          setSortMethod={setSortMethod}
          filterMethod={filterMethod}
          setFilterMethod={setFilterMethod}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

      </Box>
      {themeResults?.map(theme => {
        return (
          <ThemeCard theme={theme} />
        )
      })}
    </Box>
  )
}
